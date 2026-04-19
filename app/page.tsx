'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AppHeader } from '@/components/app-header';
import { GitHubButton } from '@/components/github-button';

export default function HomePage() {
  const [player, setPlayer] = useState('');

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <AppHeader />

        <section className="rounded-[32px] border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.95fr] lg:items-center">
            <div>
              <div className="text-sm uppercase tracking-[0.35em] text-zinc-400">SkyBlock Hub</div>
              <h1 className="mt-3 max-w-3xl text-5xl font-black tracking-tight text-white md:text-6xl">
                Clean Hypixel SkyBlock profiles, planning, and progression.
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400">
                Search a player to open a profile-first dashboard with 3D skin preview, collections, inventory-style pages, upgrade suggestions, and polished leaderboards.
              </p>

              <div className="mt-6 flex flex-col gap-3 md:flex-row">
                <input
                  value={player}
                  onChange={(e) => setPlayer(e.target.value)}
                  className="h-14 flex-1 rounded-2xl border border-zinc-700 bg-zinc-900 px-4 text-base outline-none placeholder:text-zinc-500"
                  placeholder="Enter Minecraft username"
                />
                <Link
                  href={player.trim() ? `/stats/${encodeURIComponent(player.trim())}` : '#'}
                  className="inline-flex items-center justify-center rounded-full bg-zinc-100 px-5 py-3 font-semibold text-zinc-950 transition hover:bg-white"
                >
                  Search Profile
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {['3D Skin Viewer', 'Inventory Preview', 'Cheapest Upgrades', 'Collections', 'Leaderboards'].map((tag) => (
                  <div key={tag} className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="relative flex w-full animate-pulse gap-3 rounded-[24px] border border-zinc-800 bg-zinc-900 p-4">
                  <div className="h-12 w-12 rounded-full bg-zinc-700" />
                  <div className="flex-1">
                    <div className="mb-2 h-5 w-3/5 rounded-lg bg-zinc-700" />
                    <div className="h-5 w-[90%] rounded-lg bg-zinc-700" />
                  </div>
                  <div className="absolute bottom-5 right-4 h-4 w-4 rounded-full bg-zinc-700" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-8 rounded-[28px] border border-zinc-800 bg-zinc-900/90 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">SkyBlock Hub</div>
              <div className="mt-1 text-lg font-bold text-white">Open source prototype for a Hypixel SkyBlock profile site</div>
            </div>
            <GitHubButton />
          </div>
        </footer>
      </div>
    </main>
  );
}