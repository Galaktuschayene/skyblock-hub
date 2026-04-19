'use client';

import { useState } from 'react';

type Props = {
  onSearch: (name: string) => void;
};

export function SiteHeader({ onSearch }: Props) {
  const [input, setInput] = useState('');

  function handleSearch() {
    if (!input.trim()) return;
    onSearch(input.trim());
  }

  return (
    <header className="mb-6 rounded-2xl border border-white/10 bg-zinc-900/80 p-4 backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <img
            src="https://mc-heads.net/avatar/Technoblade/64"
            className="h-10 w-10 rounded"
          />
          <div>
            <div className="text-xs uppercase tracking-widest text-zinc-400">
              SkyBlock Hub
            </div>
            <div className="text-xl font-bold text-white">
              Main Website
            </div>
          </div>
        </div>

        {/* Right: Search */}
        <div className="flex w-full max-w-md gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search Minecraft player..."
            className="flex-1 rounded-xl border border-white/10 bg-zinc-800 px-4 py-2 text-white outline-none placeholder:text-zinc-500"
          />

          <button
            onClick={handleSearch}
            className="rounded-xl bg-white px-4 py-2 text-black font-semibold hover:bg-zinc-200 transition"
          >
            Search
          </button>
        </div>
      </div>
    </header>
  );
}