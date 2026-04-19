type Props = {
  title: string;
  items: string[];
  columns?: number;
};

export function InventoryGrid({
  title,
  items,
  columns = 9,
}: Props) {
  const minCells = columns === 9 ? 27 : columns;
  const cells = Array.from(
    { length: Math.max(items.length, minCells) },
    (_, i) => items[i] ?? null
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-widest text-zinc-500">
            Inventory
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <div className="text-xs text-zinc-500">Minecraft-style grid</div>
      </div>

      <div className="rounded-xl border border-white/10 bg-zinc-800 p-3">
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          }}
        >
          {cells.map((src, index) => (
            <div
              key={`${title}-${index}`}
              className={`aspect-square rounded-md border p-1 ${
                src
                  ? 'border-zinc-600 bg-zinc-900 shadow-inner'
                  : 'border-zinc-700 bg-zinc-950/70'
              }`}
            >
              {src ? (
                <img
                  src={src}
                  alt={`${title} slot ${index + 1}`}
                  className="h-full w-full object-contain [image-rendering:pixelated]"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}