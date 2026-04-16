import { useCallback, useEffect, useReducer } from 'react';
import {
  Direction,
  GameState,
  addRandomTile,
  applyMove,
  hasWon,
  initialState,
  isGameOver,
} from './gameLogic';

// --- Reducer actions ---
type Action =
  | { type: 'MOVE'; direction: Direction }
  | { type: 'RESTART' };

const BEST_KEY = '2048_best';

function loadBest(): number {
  try {
    return parseInt(localStorage.getItem(BEST_KEY) ?? '0', 10) || 0;
  } catch {
    return 0;
  }
}

function saveBest(score: number): void {
  try {
    localStorage.setItem(BEST_KEY, String(score));
  } catch {
    // localStorage unavailable — silently ignore
  }
}

// --- Reducer ---
function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'RESTART':
      return initialState(state.best);

    case 'MOVE': {
      // Ignore moves after the game ends (unless restarted)
      if (state.status === 'over') return state;
      // Once the user hits 2048, they can keep playing but we don't re-trigger 'won'
      // (we keep status as 'won' so the overlay shows, moves still apply)

      const { board: movedBoard, earned, moved } = applyMove(
        state.board,
        action.direction
      );

      // No tiles moved — ignore (would unfairly spawn a new tile)
      if (!moved) return state;

      // Spawn a new random tile after every valid move
      const nextBoard = addRandomTile(movedBoard);

      const nextScore = state.score + earned;
      const nextBest = Math.max(state.best, nextScore);
      if (nextBest > state.best) saveBest(nextBest);

      // Determine new game status (explicit type so TS doesn't narrow away 'over')
      let nextStatus: GameState['status'] = state.status;
      if (nextStatus === 'playing' && hasWon(nextBoard)) {
        nextStatus = 'won';
      } else if (isGameOver(nextBoard)) {
        nextStatus = 'over';
      }

      return {
        board: nextBoard,
        score: nextScore,
        best: nextBest,
        status: nextStatus,
      };
    }

    default:
      return state;
  }
}

// --- Hook ---
export function useGame() {
  const [state, dispatch] = useReducer(reducer, undefined, () =>
    initialState(loadBest())
  );

  const move = useCallback((direction: Direction) => {
    dispatch({ type: 'MOVE', direction });
  }, []);

  const restart = useCallback(() => {
    dispatch({ type: 'RESTART' });
  }, []);

  // Keyboard arrow key support
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const map: Record<string, Direction> = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
      };
      const dir = map[e.key];
      if (dir) {
        e.preventDefault(); // stop the page from scrolling
        move(dir);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [move]);

  // Touch/swipe support for mobile
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    function onTouchStart(e: TouchEvent) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }

    function onTouchEnd(e: TouchEvent) {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      const minSwipe = 30; // pixels

      if (Math.abs(dx) < minSwipe && Math.abs(dy) < minSwipe) return;

      if (Math.abs(dx) > Math.abs(dy)) {
        move(dx > 0 ? 'right' : 'left');
      } else {
        move(dy > 0 ? 'down' : 'up');
      }
    }

    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [move]);

  return { state, move, restart };
}
