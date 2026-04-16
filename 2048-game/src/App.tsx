// The root component. Renders the header, scoreboard, board, and overlays.
import { useGame } from './useGame';
import { Tile } from './Tile';

export default function App() {
  const { state, restart } = useGame();
  const { board, score, best, status } = state;

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#faf8ef',
        fontFamily: "'Clear Sans', 'Helvetica Neue', Arial, sans-serif",
        padding: '1rem',
      }}
    >
      {/* ---- Header ---- */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '440px',
          marginBottom: '1rem',
        }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#776e65', margin: 0 }}>
          2048
        </h1>

        {/* Score boxes */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <ScoreBox label="SCORE" value={score} />
          <ScoreBox label="BEST" value={best} />
        </div>
      </div>

      {/* ---- Subtitle + New Game button ---- */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '440px',
          marginBottom: '1rem',
        }}
      >
        <p style={{ color: '#776e65', margin: 0, fontSize: '0.95rem' }}>
          Join tiles to reach <strong>2048!</strong>
        </p>
        <button
          onClick={restart}
          style={{
            background: '#8f7a66',
            color: '#f9f6f2',
            border: 'none',
            borderRadius: '6px',
            padding: '0.5rem 1rem',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          New Game
        </button>
      </div>

      {/* ---- Board ---- */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '440px' }}>
        {/* Background grid (the grey cell slots) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.75rem',
            background: '#bbada0',
            borderRadius: '8px',
            padding: '0.75rem',
          }}
        >
          {board.flat().map((cell, i) => (
            <Tile key={i} value={cell} />
          ))}
        </div>

        {/* ---- Overlay: Won ---- */}
        {status === 'won' && (
          <Overlay
            title="You won! 🎉"
            subtitle="Keep going or start fresh"
            onRestart={restart}
          />
        )}

        {/* ---- Overlay: Game Over ---- */}
        {status === 'over' && (
          <Overlay
            title="Game over!"
            subtitle={`Your score: ${score}`}
            onRestart={restart}
          />
        )}
      </div>

      {/* ---- How to play ---- */}
      <p
        style={{
          color: '#776e65',
          fontSize: '0.85rem',
          marginTop: '1.25rem',
          textAlign: 'center',
          maxWidth: '440px',
        }}
      >
        Use arrow keys (or swipe on mobile) to slide tiles. Tiles with the same
        number merge when they collide. Reach <strong>2048</strong> to win!
      </p>
    </div>
  );
}

// --- Small sub-components ---

function ScoreBox({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        background: '#bbada0',
        borderRadius: '6px',
        padding: '0.4rem 0.75rem',
        textAlign: 'center',
        minWidth: '72px',
      }}
    >
      <div style={{ color: '#eee4da', fontSize: '0.7rem', fontWeight: 'bold' }}>
        {label}
      </div>
      <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}>
        {value}
      </div>
    </div>
  );
}

function Overlay({
  title,
  subtitle,
  onRestart,
}: {
  title: string;
  subtitle: string;
  onRestart: () => void;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '8px',
        background: 'rgba(238,228,218,0.80)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
      }}
    >
      <h2 style={{ fontSize: '2rem', color: '#776e65', margin: 0 }}>{title}</h2>
      <p style={{ color: '#776e65', margin: 0 }}>{subtitle}</p>
      <button
        onClick={onRestart}
        style={{
          background: '#8f7a66',
          color: '#f9f6f2',
          border: 'none',
          borderRadius: '6px',
          padding: '0.6rem 1.5rem',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        Try Again
      </button>
    </div>
  );
}
