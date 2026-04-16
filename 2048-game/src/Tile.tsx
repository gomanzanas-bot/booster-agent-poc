// A single tile on the board. Color changes based on the tile's value.

interface TileProps {
  value: number | null;
}

// Map each tile value to a background color and text color
const TILE_STYLES: Record<number, { bg: string; color: string; fontSize: string }> = {
  2:    { bg: '#eee4da', color: '#776e65', fontSize: '2rem' },
  4:    { bg: '#ede0c8', color: '#776e65', fontSize: '2rem' },
  8:    { bg: '#f2b179', color: '#f9f6f2', fontSize: '2rem' },
  16:   { bg: '#f59563', color: '#f9f6f2', fontSize: '2rem' },
  32:   { bg: '#f67c5f', color: '#f9f6f2', fontSize: '2rem' },
  64:   { bg: '#f65e3b', color: '#f9f6f2', fontSize: '2rem' },
  128:  { bg: '#edcf72', color: '#f9f6f2', fontSize: '1.75rem' },
  256:  { bg: '#edcc61', color: '#f9f6f2', fontSize: '1.75rem' },
  512:  { bg: '#edc850', color: '#f9f6f2', fontSize: '1.75rem' },
  1024: { bg: '#edc53f', color: '#f9f6f2', fontSize: '1.5rem' },
  2048: { bg: '#edc22e', color: '#f9f6f2', fontSize: '1.5rem' },
};

const EMPTY_STYLE = { bg: '#cdc1b4', color: 'transparent', fontSize: '2rem' };

export function Tile({ value }: TileProps) {
  const style = value ? (TILE_STYLES[value] ?? { bg: '#3c3a32', color: '#f9f6f2', fontSize: '1.25rem' }) : EMPTY_STYLE;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '6px',
        background: style.bg,
        color: style.color,
        fontSize: style.fontSize,
        fontWeight: 'bold',
        transition: 'background 0.1s',
        userSelect: 'none',
        aspectRatio: '1',
      }}
    >
      {value ?? ''}
    </div>
  );
}
