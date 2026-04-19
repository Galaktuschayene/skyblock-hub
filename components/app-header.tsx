'use client';

import Link from 'next/link';

export function AppHeader() {
  return (
    <header className="mb-6 rounded-[28px] border border-zinc-800 bg-zinc-900/90 p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-2xl border border-zinc-700 bg-zinc-950 p-2">
            <img
              src="https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.20.4/assets/minecraft/textures/item/nether_star.png"
              alt="SkyBlock Hub"
              className="h-10 w-10 object-contain [image-rendering:pixelated]"
            />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-zinc-400">SkyBlock Hub</div>
            <div className="text-2xl font-black text-white">Profile Viewer</div>
          </div>
        </Link>

        <nav className="flex items-center gap-3">
          <Link
            href="/"
            className="rounded-full border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:bg-zinc-700"
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}