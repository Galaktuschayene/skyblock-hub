'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { GitHubButton } from '@/components/github-button';

export default function HomePage() {
  const [player, setPlayer] = useState('');

  return (
    <main className="min-h-screen bg-[#07090d] text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <SiteHeader />

        <section className="overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.10),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]">
          <div className="grid gap-10 px-6 py-8 md:px-8 md:py-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.38em] text-sky-300/80">SkyBlock Hub</div>
              <h1 className="mt-3 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
                Cleaner SkyBlock profiles,
                <br />
                better progression views.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
                Search a player to open a polished profile page with a 3D skin viewer,
                collections, inventory panels, upgrade suggestions, and leaderboard sections.
              </p>

              <div className="mt-8 flex flex-col gap-3 md:flex-row">
                <input
                  value={player}
                  onChange={(e) => setPlayer(e.target.value)}
                  className="h-14 flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 text-base text-white outline-none placeholder:text-zinc-500"
                  placeholder="Enter Minecraft username"
                />
                <Link
                  href={player.trim() ? `/stats/${encodeURIComponent(player.trim())}` : '#'}
                  className="inline-flex h-14 items-center justify-center rounded-2xl bg-white px-6 font-semibold text-zinc-950 transition hover:scale-[1.01]"
                >
                  Search Profile
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  '3D Skin Viewer',
                  'Inventory Preview',
                  'Collections',
                  'Upgrades',
                  'Leaderboards',
                ].map((tag) => (
                  <div
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[28px] border border-white/10 bg-black/25 p-5">
                <div className="mb-4 text-sm uppercase tracking-[0.25em] text-zinc-500">
                  Profile Preview
                </div>
                <div className="grid gap-3">
                  {[
                    ['Net Worth', '12.4B'],
                    ['Skill Average', '48.7'],
                    ['Garden', '15'],
                    ['HOTM', '10'],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
                    >
                      <span className="text-sm text-zinc-400">{label}</span>
                      <span className="font-semibold text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-black/25 p-5">
                <div className="mb-4 text-sm uppercase tracking-[0.25em] text-zinc-500">
                  Why this version
                </div>
                <div className="space-y-3 text-sm text-zinc-400">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    No fake loading skeleton on the homepage
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    Dark-only style instead of light mode
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    Cleaner profile-first flow after search
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">SkyBlock Hub</div>
              <div className="mt-1 text-lg font-bold text-white">
                Open source Hypixel SkyBlock profile redesign
              </div>
            </div>
            <GitHubButton />
          </div>
        </footer>
      </div>
    </main>
  );
}