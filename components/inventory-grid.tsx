export function InventoryGrid({
  title,
  items,
  columns = 9,
}: {
  title: string;
  items: string[];
  columns?: number;
}) {
  const minCells = columns === 9 ? 27 : columns;
  const cells = Array.from({ length: Math.max(items.length, minCells) }, (_, i) => items[i] ?? null);

  return (
    <div className="rounded-[28px] border border-zinc-800 bg-zinc-900/90 p-5">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">Inventory Preview</div>
          <h3 className="mt-2 text-2xl font-bold text-white">{title}</h3>
        </div>
        <div className="text-sm text-zinc-500">Minecraft-style grid</div>
      </div>

      <div className="rounded-[24px] border border-zinc-800 bg-zinc-950 p-4">
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          {cells.map((src, index) => (
            <div
              key={`${title}-${index}`}
              className={`aspect-square rounded-md border p-1 shadow-inner ${
                src ? 'border-zinc-700 bg-zinc-900' : 'border-zinc-800 bg-zinc-950'
              }`}
            >
              {src ? (
                <img
                  src={src}
                  alt={`${title} slot ${index + 1}`}
                  className="mx-auto h-full w-full object-contain [image-rendering:pixelated]"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}