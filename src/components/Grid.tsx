interface GridProps {
  size: number;
  gridKey: number;
  handleDraw: (click?: boolean) => (e: React.MouseEvent) => void;
}

export function Grid({ size, gridKey, handleDraw }: GridProps) {
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gridTemplateRows: `repeat(${size}, 1fr)`
      }}
      className='sketchpad'
      key={gridKey}
    >
      {[...Array(size ** 2)].map((_, i) => {
        return (<div
          className='cell-pad'
          onMouseOver={handleDraw()}
          key={i}
          data-att={i}
        />
        )}
      )}
    </div>
  );
}
