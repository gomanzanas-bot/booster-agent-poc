// --- Types ---

// Each cell is either empty (null) or a number (2, 4, 8, … 2048)
export type Cell = number | null;

// The board is a 4×4 grid
export type Board = Cell[][];

// The four directions the player can swipe/arrow-key
export type Direction = 'up' | 'down' | 'left' | 'right';

export interface GameState {
  board: Board;
  score: number;
  best: number;
  status: 'playing' | 'won' | 'over';
}

// --- Helpers ---

/** Create a blank 4×4 board filled with nulls. */
export function emptyBoard(): Board {
  return Array.from({ length: 4 }, () => Array(4).fill(null));
}

/** Return a deep copy of the board so we never mutate in place. */
function cloneBoard(board: Board): Board {
  return board.map(row => [...row]);
}

/** Pick a random empty cell and place a 2 (90% chance) or 4 (10% chance). */
export function addRandomTile(board: Board): Board {
  const next = cloneBoard(board);
  const empties: [number, number][] = [];

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (next[r][c] === null) empties.push([r, c]);
    }
  }

  if (empties.length === 0) return next;

  const [r, c] = empties[Math.floor(Math.random() * empties.length)];
  next[r][c] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

/** Create the initial game state: blank board + two random tiles. */
export function initialState(savedBest = 0): GameState {
  let board = emptyBoard();
  board = addRandomTile(board);
  board = addRandomTile(board);
  return { board, score: 0, best: savedBest, status: 'playing' };
}

// --- Core slide logic ---

/**
 * Slide and merge a single row to the LEFT.
 * Returns the new row and the points earned from merges.
 *
 * Example: [2, null, 2, 4] → [4, 4, null, null], earned 4
 */
function slideRowLeft(row: Cell[]): { row: Cell[]; earned: number } {
  // 1. Remove nulls: squeeze tiles together (number[] so arithmetic is safe)
  const tiles: number[] = row.filter((v): v is number => v !== null);

  let earned = 0;

  // 2. Merge adjacent equal tiles (left to right, one merge per tile)
  for (let i = 0; i < tiles.length - 1; i++) {
    if (tiles[i] === tiles[i + 1]) {
      tiles[i] = tiles[i] * 2;   // double the left tile
      earned += tiles[i];          // add to score
      tiles.splice(i + 1, 1);     // remove the right tile
    }
  }

  // 3. Pad the right side with nulls to keep length 4
  const padded: Cell[] = [...tiles];
  while (padded.length < 4) padded.push(null);

  return { row: padded, earned };
}

// --- Move the whole board in a direction ---

/**
 * Apply a move in any direction.
 * Internally we always rotate the board so we can reuse slideRowLeft,
 * then rotate it back.
 */
export function applyMove(
  board: Board,
  direction: Direction
): { board: Board; earned: number; moved: boolean } {
  // Rotate helpers so LEFT slide covers all 4 directions
  const rotated = rotate(board, direction);

  let totalEarned = 0;
  let moved = false;

  const nextRotated = rotated.map(row => {
    const before = JSON.stringify(row);
    const { row: newRow, earned } = slideRowLeft(row);
    if (JSON.stringify(newRow) !== before) moved = true;
    totalEarned += earned;
    return newRow;
  });

  const next = unrotate(nextRotated, direction);
  return { board: next, earned: totalEarned, moved };
}

/**
 * Rotate the board so that the target direction becomes "left".
 * left  → no change
 * right → flip each row
 * up    → transpose (rows become columns)
 * down  → transpose + flip
 */
function rotate(board: Board, direction: Direction): Board {
  switch (direction) {
    case 'left':
      return cloneBoard(board);
    case 'right':
      return board.map(row => [...row].reverse());
    case 'up':
      return transpose(board);
    case 'down':
      return transpose(board).map(row => [...row].reverse());
  }
}

/** Reverse the rotation applied above. */
function unrotate(board: Board, direction: Direction): Board {
  switch (direction) {
    case 'left':
      return board;
    case 'right':
      return board.map(row => [...row].reverse());
    case 'up':
      return transpose(board);
    case 'down':
      return board.map(row => [...row].reverse()).map((_, i, arr) =>
        arr.map(row => row[i])
      );
  }
}

/** Flip rows and columns (rows become columns and vice versa). */
function transpose(board: Board): Board {
  return board[0].map((_, c) => board.map(row => row[c]));
}

// --- Win / game-over checks ---

/** True if any cell holds 2048. */
export function hasWon(board: Board): boolean {
  return board.some(row => row.some(cell => cell === 2048));
}

/** True if there are no valid moves left (board is full and no merges possible). */
export function isGameOver(board: Board): boolean {
  // Any empty cell means the game is not over
  if (board.some(row => row.some(cell => cell === null))) return false;

  // Check if any adjacent pair (horizontal or vertical) can merge
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (c < 3 && board[r][c] === board[r][c + 1]) return false;
      if (r < 3 && board[r][c] === board[r + 1][c]) return false;
    }
  }

  return true;
}
