'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

import { SiteHeader } from '@/components/site-header';
import { SkinViewerPanel } from '@/components/skin-viewer-panel';
import { InventoryGrid } from '@/components/inventory-grid';
import { GitHubButton } from '@/components/github-button';

import {
  getMockPlayer,
  inventoryViews,
  collections,
  upgrades,
  leaderboard,
  type NavKey,
} from '@/lib/site-data';

export default function PlayerPage() {
  const params = useParams();
  const playerName = decodeURIComponent(params.player as string);

  const player = getMockPlayer(playerName);

  const [tab, setTab] = useState<NavKey>('overview');

  return (
    <main className="min-h-screen bg-[#07090d] text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">

        {/* HEADER */}
        <SiteHeader
          onSearch={(name) => {
            window.location.href = `/stats/${encodeURIComponent(name)}`;
          }}
        />

        {/* PLAYER HERO */}
        <section className="mb-8 grid gap-6 lg:grid-cols-[1fr_1fr]">

          <SkinViewerPanel username={player.username} />

          <div className="rounded-2xl border border-white/10 bg-zinc-900 p-5">
            <div className="text-xs uppercase tracking-widest text-zinc-500">
              Player
            </div>

            <h1 className="mt-2 text-4xl font-black">
              {player.username}
            </h1>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                ['Net Worth', player.netWorth],
                ['Skill Avg', player.skillAverage],
                ['Garden', player.gardenLevel],
                ['HOTM', player.hotm],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/10 bg-zinc-800 px-4 py-3"
                >
                  <div className="text-xs text-zinc-400">{label}</div>
                  <div className="font-semibold">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TABS */}
        <div className="mb-6 flex flex-wrap gap-2">
          {[
            'overview',
            'player',
            'collections',
            'upgrades',
            'leaderboards',
            'inventory',
          ].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as NavKey)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === t
                  ? 'bg-white text-black'
                  : 'bg-zinc-800 text-zinc-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {tab === 'overview' && (
          <div className="grid gap-4 lg:grid-cols-2">
            <InventoryGrid
              title="Inventory"
              items={inventoryViews.Inventory}
            />

            <div className="rounded-2xl border border-white/10 bg-zinc-900 p-5">
              <h3 className="mb-4 text-xl font-bold">Features</h3>
              <div className="space-y-2 text-sm text-zinc-400">
                <div>✔ 3D Skin Viewer</div>
                <div>✔ Inventory Preview</div>
                <div>✔ Upgrade Suggestions</div>
                <div>✔ Collections Tracking</div>
              </div>
            </div>
          </div>
        )}

        {tab === 'inventory' && (
          <InventoryGrid
            title="Inventory"
            items={inventoryViews.Inventory}
          />
        )}

        {tab === 'collections' && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {collections.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl border border-white/10 bg-zinc-900 p-4"
              >
                <div className="flex items-center gap-3">
                  <img src={c.item} className="h-10 w-10" />
                  <div>
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-sm text-zinc-400">
                      Tier {c.tier}
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-sm text-zinc-400">
                  {c.next}
                </div>

                <div className="mt-3 h-2 bg-zinc-800 rounded-full">
                  <div
                    className="h-full bg-white rounded-full"
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'upgrades' && (
          <div className="grid gap-4 xl:grid-cols-3">
            {Object.entries(upgrades).map(([cat, list]) => (
              <div
                key={cat}
                className="rounded-2xl border border-white/10 bg-zinc-900 p-5"
              >
                <h3 className="mb-4 font-bold capitalize">{cat}</h3>

                <div className="space-y-3">
                  {list.map((u) => (
                    <div
                      key={u.name}
                      className="rounded-xl border border-white/10 bg-zinc-800 p-3"
                    >
                      <div className="flex justify-between">
                        <div>{u.name}</div>
                        <div className="text-sm text-zinc-400">
                          {u.cost}
                        </div>
                      </div>
                      <div className="text-sm text-zinc-500">
                        {u.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'leaderboards' && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {leaderboard.map((l) => (
              <div
                key={l.label}
                className="rounded-2xl border border-white/10 bg-zinc-900 p-5"
              >
                <div className="text-sm text-zinc-400">
                  {l.label}
                </div>
                <div className="text-3xl font-bold">
                  {l.rank}
                </div>
                <div className="text-sm text-zinc-500">
                  {l.detail}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'player' && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Object.entries(player).map(([k, v]) => (
              <div
                key={k}
                className="rounded-2xl border border-white/10 bg-zinc-900 p-4"
              >
                <div className="text-sm text-zinc-400">{k}</div>
                <div className="font-semibold">{String(v)}</div>
              </div>
            ))}
          </div>
        )}

        {/* FOOTER */}
        <footer className="mt-8 rounded-2xl border border-white/10 bg-zinc-900 p-5">
          <GitHubButton />
        </footer>

      </div>
    </main>
  );
}