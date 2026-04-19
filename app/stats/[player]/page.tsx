'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SiteHeader } from '@/components/site-header';
import { SkinViewerPanel } from '@/components/skin-viewer-panel';
import { InventoryGrid } from '@/components/inventory-grid';
import { GitHubButton } from '@/components/github-button';
import {
  collections,
  getMockPlayer,
  inventoryViews,
  leaderboard,
  textures,
  upgrades,
  type InventoryTab,
  type NavKey,
} from '@/lib/site-data';

export default function PlayerPage({
  params,
}: {
  params: { player: string };
}) {
  const playerName = decodeURIComponent(params.player);
  const player = getMockPlayer(playerName);

  const [selectedMenu, setSelectedMenu] = useState<NavKey>('overview');
  const [inventoryTab, setInventoryTab] = useState<InventoryTab>('Inventory');

  const tabs: { key: NavKey; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'player', label: 'Player' },
    { key: 'collections', label: 'Collections' },
    { key: 'upgrades', label: 'Upgrades' },
    { key: 'leaderboards', label: 'Leaderboards' },
    { key: 'inventory', label: 'Inventory' },
  ];

  function renderPage() {
    switch (selectedMenu) {
      case 'player':
        return (
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ['Purse', player.purse, textures.gold],
              ['Bank', player.bank, textures.enderChest],
              ['Garden Level', player.gardenLevel, textures.melon],
              ['HOTM', player.hotm, textures.diamondPickaxe],
              ['Pets', player.pets, textures.emerald],
              ['Accessories', player.accessories, textures.book],
              ['Catacombs', player.catacombs, textures.diamondSword],
              ['Slayer XP', player.slayerXP, textures.netherStar],
            ].map(([label, value, img]) => (
              <div
                key={String(label)}
                className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">{label}</div>
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-2">
                    <img
                      src={String(img)}
                      alt={String(label)}
                      className="h-10 w-10 object-contain [image-rendering:pixelated]"
                    />
                  </div>
                </div>
                <div className="mt-3 text-3xl font-black text-white">{value}</div>
              </div>
            ))}
          </section>
        );

      case 'collections':
        return (
          <section className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">Collections</div>
                <h3 className="mt-2 text-2xl font-bold text-white">Recipes, unlocks, and progress</h3>
              </div>
              <div className="text-sm text-zinc-500">Crop · Mining · Fishing</div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {collections.map((entry) => (
                <div
                  key={entry.name}
                  className="rounded-2xl border border-white/10 bg-black/25 p-4 transition hover:-translate-y-1"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-2">
                      <img
                        src={entry.item}
                        alt={entry.name}
                        className="h-16 w-16 object-contain [image-rendering:pixelated]"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{entry.name}</div>
                      <div className="text-sm text-zinc-500">Tier {entry.tier}</div>
                    </div>
                  </div>

                  <div className="text-sm text-zinc-400">{entry.next}</div>

                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className="h-full rounded-full bg-sky-300"
                      style={{ width: `${entry.progress}%` }}
                    />
                  </div>
                  <div className="mt-2 text-sm text-zinc-500">{entry.progress}% completed</div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'upgrades':
        return (
          <div className="grid gap-4 xl:grid-cols-3">
            {Object.entries(upgrades).map(([category, rows]) => (
              <div
                key={category}
                className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="mb-5">
                  <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">{category}</div>
                  <h3 className="mt-2 text-2xl font-bold text-white">Smart next upgrades</h3>
                </div>

                <div className="space-y-4">
                  {rows.map((upgrade) => (
                    <div
                      key={upgrade.name}
                      className="rounded-2xl border border-white/10 bg-black/25 p-4 transition hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-3">
                        <div className="rounded-2xl border border-white/10 bg-black/30 p-2">
                          <img
                            src={upgrade.item}
                            alt={upgrade.name}
                            className="h-10 w-10 object-contain [image-rendering:pixelated]"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="font-semibold text-white">{upgrade.name}</div>
                              <div className="mt-1 text-sm text-zinc-500">{upgrade.reason}</div>
                            </div>
                            <div className="rounded-xl bg-white px-3 py-1 text-sm text-zinc-950">
                              {upgrade.cost}
                            </div>
                          </div>

                          <div className="mt-3 text-sm text-zinc-300">{upgrade.impact}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'leaderboards':
        return (
          <section>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">Leaderboards</div>
                <h3 className="mt-2 text-2xl font-bold text-white">Profile rankings</h3>
              </div>
              <div className="text-sm text-zinc-500">Net Worth · Skills · Farming · Mining · Fishing · Museum</div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {leaderboard.map((entry) => (
                <div
                  key={entry.label}
                  className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">{entry.label}</div>
                      <div className="mt-3 text-4xl font-black text-white">{entry.rank}</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-2">
                      <img
                        src={entry.item}
                        alt={entry.label}
                        className="h-10 w-10 object-contain [image-rendering:pixelated]"
                      />
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-zinc-400">{entry.detail}</div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'inventory':
        return (
          <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-4">
              <div className="mb-2 flex flex-wrap gap-2">
                {(['Inventory', 'Armor', 'Backpacks', 'Ender Chest'] as InventoryTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setInventoryTab(tab)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      inventoryTab === tab
                        ? 'border-sky-300/50 bg-sky-300/10 text-sky-200'
                        : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/[0.06]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <InventoryGrid
                title={inventoryTab}
                items={inventoryViews[inventoryTab]}
                columns={inventoryTab === 'Armor' ? 4 : 9}
              />
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
              <div className="mb-5">
                <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">Equipment</div>
                <h3 className="mt-2 text-2xl font-bold text-white">Armor and storage view</h3>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                {[
                  ['Helmet', textures.helmet],
                  ['Chestplate', textures.chestplate],
                  ['Leggings', textures.leggings],
                  ['Boots', textures.boots],
                  ['Backpack 1', textures.chest],
                  ['Ender Chest', textures.enderChest],
                ].map(([label, src]) => (
                  <div
                    key={String(label)}
                    className="rounded-2xl border border-white/10 bg-black/25 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl border border-white/10 bg-black/30 p-2">
                        <img
                          src={String(src)}
                          alt={String(label)}
                          className="h-12 w-12 object-contain [image-rendering:pixelated]"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{label}</div>
                        <div className="text-sm text-zinc-500">Inventory data preview</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <>
            <section className="mb-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <InventoryGrid title="Main Inventory" items={inventoryViews.Inventory} columns={9} />

              <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
                <div className="mb-5">
                  <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">Main Features</div>
                  <h3 className="mt-2 text-2xl font-bold text-white">What this site will do</h3>
                </div>

                <div className="space-y-3">
                  {[
                    '3D player skin viewer directly at the top of the profile.',
                    'Minecraft-style inventory, armor, backpack, and ender chest previews.',
                    'Collections page with progress, tiers, and next unlock targets.',
                    'Upgrade planner for farming, mining, and fishing.',
                    'Leaderboards with cleaner, darker cards.',
                  ].map((line) => (
                    <div
                      key={line}
                      className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-zinc-300"
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                ['Net Worth', player.netWorth, textures.gold],
                ['SkyBlock Level', player.skyblockLevel, textures.netherStar],
                ['Skill Average', player.skillAverage, textures.book],
                ['Museum Value', player.museumValue, textures.chest],
              ].map(([label, value, img]) => (
                <div
                  key={String(label)}
                  className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">{label}</div>
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-2">
                      <img
                        src={String(img)}
                        alt={String(label)}
                        className="h-10 w-10 object-contain [image-rendering:pixelated]"
                      />
                    </div>
                  </div>
                  <div className="mt-3 text-3xl font-black text-white">{value}</div>
                </div>
              ))}
            </section>
          </>
        );
    }
  }

  return (
    <main className="min-h-screen bg-[#07090d] text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <SiteHeader />

        <section className="mb-8 rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.10),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-6">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_1.1fr]">
            <SkinViewerPanel skinUrl={textures.playerSkin(player.username)} />

            <div>
              <div className="text-sm uppercase tracking-[0.3em] text-sky-300/80">Player Profile</div>
              <h1 className="mt-2 text-4xl font-black tracking-tight text-white">{player.username}</h1>
              <p className="mt-3 max-w-2xl text-zinc-400">
                Cleaner dark profile layout with the most important sections directly underneath the searched account.
              </p>

              <div className="mt-6 flex flex-col gap-3 md:flex-row">
                <input
                  defaultValue={player.username}
                  className="h-14 flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 text-base text-white outline-none placeholder:text-zinc-500"
                  placeholder="Search another username"
                />
                <Link
                  href="/"
                  className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] px-6 font-semibold text-white transition hover:bg-white/[0.08]"
                >
                  Back Home
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  ['Net Worth', player.netWorth, textures.gold],
                  ['Garden', player.gardenLevel, textures.melon],
                  ['HOTM', player.hotm, textures.diamondPickaxe],
                  ['Museum', player.museumValue, textures.chest],
                ].map(([label, value, img]) => (
                  <div
                    key={String(label)}
                    className="rounded-2xl border border-white/10 bg-black/20 p-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">{label}</div>
                      <div className="rounded-2xl border border-white/10 bg-black/30 p-2">
                        <img
                          src={String(img)}
                          alt={String(label)}
                          className="h-8 w-8 object-contain [image-rendering:pixelated]"
                        />
                      </div>
                    </div>
                    <div className="mt-2 text-lg font-bold text-white">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[24px] border border-white/10 bg-black/20 p-3">
            <div className="flex flex-wrap gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedMenu(tab.key)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                    selectedMenu === tab.key
                      ? 'border-sky-300/40 bg-sky-300/10 text-sky-200'
                      : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/[0.06]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {renderPage()}

        <footer className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-zinc-500">SkyBlock Hub</div>
              <div className="mt-1 text-lg font-bold text-white">
                Open source prototype for a Hypixel SkyBlock profile site
              </div>
            </div>
            <GitHubButton />
          </div>
        </footer>
      </div>
    </main>
  );
}