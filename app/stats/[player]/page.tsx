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
  type InventoryTab,
  textures,
} from '@/lib/site-data';

export default function PlayerPage() {
  const params = useParams();
  const playerName = decodeURIComponent(params.player as string);
  const player = getMockPlayer(playerName);

  const [tab, setTab] = useState<NavKey>('overview');
  const [inventoryTab, setInventoryTab] = useState<InventoryTab>('Inventory');

  const tabs: { key: NavKey; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'player', label: 'Player' },
    { key: 'collections', label: 'Collections' },
    { key: 'upgrades', label: 'Upgrades' },
    { key: 'leaderboards', label: 'Leaderboards' },
    { key: 'inventory', label: 'Inventory' },
  ];

  return (
    <main className="min-h-screen bg-[#07090d] text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <SiteHeader
          onSearch={(name) => {
            window.location.href = `/stats/${encodeURIComponent(name)}`;
          }}
        />

        <section className="mb-8 overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.10),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <SkinViewerPanel username={player.username} />

            <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-5">
              <div className="text-xs uppercase tracking-widest text-zinc-500">
                Player
              </div>

              <h1 className="mt-2 text-4xl font-black text-white">
                {player.username}
              </h1>

              <p className="mt-3 text-zinc-400">
                Clean profile-first layout with quick access to inventory,
                collections, upgrades, and leaderboard sections.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  ['Net Worth', player.netWorth],
                  ['Skill Avg', player.skillAverage],
                  ['Garden', player.gardenLevel],
                  ['HOTM', player.hotm],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/10 bg-zinc-800/80 px-4 py-3"
                  >
                    <div className="text-xs text-zinc-400">{label}</div>
                    <div className="font-semibold text-white">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  tab === t.key
                    ? 'bg-white text-black'
                    : 'border border-white/10 bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </section>

        {tab === 'overview' && (
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <InventoryGrid
              title="Inventory"
              items={inventoryViews.Inventory}
            />

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-zinc-900 p-5">
                <h3 className="mb-4 text-xl font-bold text-white">Profile Highlights</h3>
                <div className="grid gap-3">
                  {[
                    ['Bank', player.bank],
                    ['Museum Value', player.museumValue],
                    ['Catacombs', player.catacombs],
                    ['Slayer XP', player.slayerXP],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-zinc-800 px-4 py-3"
                    >
                      <span className="text-sm text-zinc-400">{label}</span>
                      <span className="font-semibold text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-900 p-5">
                <h3 className="mb-4 text-xl font-bold text-white">Features</h3>
                <div className="space-y-2 text-sm text-zinc-400">
                  <div>✔ 3D Skin Viewer</div>
                  <div>✔ Inventory Preview</div>
                  <div>✔ Upgrade Suggestions</div>
                  <div>✔ Collections Tracking</div>
                  <div>✔ Leaderboard Sections</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'inventory' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {(['Inventory', 'Armor', 'Backpacks', 'Ender Chest'] as InventoryTab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setInventoryTab(t)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    inventoryTab === t
                      ? 'bg-white text-black'
                      : 'border border-white/10 bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <InventoryGrid
              title={inventoryTab}
              items={inventoryViews[inventoryTab]}
              columns={inventoryTab === 'Armor' ? 4 : 9}
            />
          </div>
        )}

        {tab === 'collections' && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {collections.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl border border-white/10 bg-zinc-900 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-white/10 bg-zinc-800 p-2">
                    <img
                      src={c.item}
                      alt={c.name}
                      className="h-10 w-10 object-contain [image-rendering:pixelated]"
                    />
                  </div>

                  <div>
                    <div className="font-semibold text-white">{c.name}</div>
                    <div className="text-sm text-zinc-400">Tier {c.tier}</div>
                  </div>
                </div>

                <div className="mt-3 text-sm text-zinc-400">{c.next}</div>

                <div className="mt-3 h-2 rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-white"
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
                <h3 className="mb-4 text-xl font-bold capitalize text-white">{cat}</h3>

                <div className="space-y-3">
                  {list.map((u) => (
                    <div
                      key={u.name}
                      className="rounded-xl border border-white/10 bg-zinc-800 p-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-medium text-white">{u.name}</div>
                        <div className="text-sm text-zinc-400">{u.cost}</div>
                      </div>

                      <div className="mt-1 text-sm text-zinc-500">{u.reason}</div>
                      <div className="mt-2 text-sm text-zinc-300">{u.impact}</div>
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
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm text-zinc-400">{l.label}</div>
                    <div className="text-3xl font-bold text-white">{l.rank}</div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-zinc-800 p-2">
                    <img
                      src={l.item}
                      alt={l.label}
                      className="h-10 w-10 object-contain [image-rendering:pixelated]"
                    />
                  </div>
                </div>

                <div className="mt-3 text-sm text-zinc-500">{l.detail}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'player' && (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ['Profile', player.profile],
              ['Purse', player.purse],
              ['Bank', player.bank],
              ['SkyBlock Level', player.skyblockLevel],
              ['Skill Average', player.skillAverage],
              ['Fishing', player.fishing],
              ['Mining', player.mining],
              ['Farming', player.farming],
              ['Slayer XP', player.slayerXP],
              ['Catacombs', player.catacombs],
              ['Museum', player.museumValue],
              ['Accessories', player.accessories],
            ].map(([k, v]) => (
              <div
                key={String(k)}
                className="rounded-2xl border border-white/10 bg-zinc-900 p-4"
              >
                <div className="text-sm text-zinc-400">{k}</div>
                <div className="mt-1 font-semibold text-white">{String(v)}</div>
              </div>
            ))}
          </div>
        )}

        <footer className="mt-8 rounded-2xl border border-white/10 bg-zinc-900 p-5">
          <div className="flex items-center justify-between">
            <div className="text-sm text-zinc-500">
              SkyBlock Hub
            </div>
            <GitHubButton />
          </div>
        </footer>
      </div>
    </main>
  );
}