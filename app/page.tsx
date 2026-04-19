'use client';

import { useMemo, useState } from 'react';

type Theme = {
  name: string;
  shell: string;
  panel: string;
  soft: string;
  hero: string;
  accent: string;
  accentSoft: string;
  accentText: string;
  subText: string;
  faint: string;
  progress: string;
  imageFrame: string;
  bodyPattern: string;
  buttonVar: string;
};

type CollectionItem = {
  name: string;
  progress: number;
  sprite: string;
};

const themes: Theme[] = [
  {
    name: 'Void',
    shell: 'bg-zinc-950 text-zinc-100',
    panel: 'border-white/10 bg-white/5',
    soft: 'bg-black/20 border-white/10',
    hero: 'from-lime-500/15 via-emerald-500/10 to-cyan-500/10',
    accent: 'bg-lime-400 text-zinc-950',
    accentSoft: 'bg-lime-400/15 text-lime-300',
    accentText: 'text-lime-300',
    subText: 'text-zinc-300',
    faint: 'text-zinc-400',
    progress: 'bg-lime-400',
    imageFrame: 'bg-zinc-900 border-lime-400/30',
    bodyPattern:
      'bg-[radial-gradient(circle_at_top_right,rgba(132,204,22,0.12),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.1),transparent_30%)]',
    buttonVar: '#a3e635',
  },
  {
    name: 'Sky',
    shell: 'bg-sky-950 text-sky-50',
    panel: 'border-sky-200/10 bg-sky-400/10',
    soft: 'bg-sky-950/40 border-sky-200/10',
    hero: 'from-sky-400/20 via-cyan-400/10 to-indigo-400/20',
    accent: 'bg-cyan-300 text-sky-950',
    accentSoft: 'bg-cyan-300/15 text-cyan-200',
    accentText: 'text-cyan-200',
    subText: 'text-sky-100/80',
    faint: 'text-sky-200/55',
    progress: 'bg-cyan-300',
    imageFrame: 'bg-sky-950/60 border-cyan-300/30',
    bodyPattern:
      'bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_34%)]',
    buttonVar: '#67e8f9',
  },
  {
    name: 'Ruby',
    shell: 'bg-neutral-950 text-rose-50',
    panel: 'border-rose-200/10 bg-rose-500/10',
    soft: 'bg-black/25 border-rose-200/10',
    hero: 'from-rose-500/20 via-red-500/10 to-orange-400/15',
    accent: 'bg-rose-300 text-rose-950',
    accentSoft: 'bg-rose-300/15 text-rose-200',
    accentText: 'text-rose-200',
    subText: 'text-rose-50/80',
    faint: 'text-rose-200/50',
    progress: 'bg-rose-300',
    imageFrame: 'bg-neutral-950 border-rose-300/30',
    bodyPattern:
      'bg-[radial-gradient(circle_at_top_right,rgba(251,113,133,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(251,146,60,0.12),transparent_34%)]',
    buttonVar: '#fda4af',
  },
];

function makePixelSvg(cells: string[], palette: Record<string, string>) {
  const size = 16;
  const pixel = 8;
  let rects = '';

  cells.forEach((row, y) => {
    [...row].forEach((cell, x) => {
      if (cell !== '.') {
        rects += `<rect x="${x * pixel}" y="${y * pixel}" width="${pixel}" height="${pixel}" fill="${palette[cell]}"/>`;
      }
    });
  });

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size * pixel}" height="${size * pixel}" shape-rendering="crispEdges" viewBox="0 0 ${size * pixel} ${size * pixel}"><rect width="100%" height="100%" fill="transparent"/>${rects}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const sprites = {
  melon: makePixelSvg(
    [
      '................',
      '................',
      '....GGGGGGGG....',
      '...GLLLLLLLLG...',
      '..GLRLRLRLRLGG..',
      '..GLLLLLLLLLLG..',
      '..GLRLRLRLRLLG..',
      '..GLLLLLLLLLLG..',
      '..GLRLRLRLRLLG..',
      '..GLLLLLLLLLLG..',
      '..GLLRLRLRLRLG..',
      '..GGLLLLLLLLGG..',
      '...GGGGGGGGGG...',
      '................',
      '................',
      '................',
    ],
    { G: '#5a8f2b', L: '#8fd14f', R: '#ff6b81' }
  ),
  cobblestone: makePixelSvg(
    [
      '................',
      '................',
      '...SSSSSSSSSS...',
      '..SMMMMDSMMDDS..',
      '..SMDDMSMMSMDS..',
      '..SMDSSMDDMSMS..',
      '..SDSMMSMDDSMS..',
      '..SMMDSMSMDSMS..',
      '..SMDSMMDDMSMS..',
      '..SMMDSMMSMDDS..',
      '..SMSDMDSMMSMS..',
      '..SDMSMMSDDMDS..',
      '...SSSSSSSSSS...',
      '................',
      '................',
      '................',
    ],
    { S: '#7a7a7a', M: '#9a9a9a', D: '#5f5f5f' }
  ),
  diamond: makePixelSvg(
    [
      '................',
      '................',
      '.......CC.......',
      '......CCCC......',
      '.....CBAABC.....',
      '....CBAAAABC....',
      '...CBAAAAAABC...',
      '....BAAAAAAB....',
      '.....AAAAAA.....',
      '......AAAA......',
      '.......AA.......',
      '........A.......',
      '................',
      '................',
      '................',
      '................',
    ],
    { A: '#62f6ea', B: '#2fd8cc', C: '#b9fffa' }
  ),
  fish: makePixelSvg(
    [
      '................',
      '................',
      '................',
      '.....OO.........',
      '...OOOOOOB......',
      '..OOOOOOOOBBB...',
      '.OOOOWOOOOOBB...',
      '..OOOOOOOOBBB...',
      '...OOOOOOB......',
      '.....OO.........',
      '................',
      '................',
      '................',
      '................',
      '................',
      '................',
    ],
    { O: '#ffb347', B: '#ff8f1f', W: '#1f2937' }
  ),
  pumpkin: makePixelSvg(
    [
      '................',
      '.......GG.......',
      '....OOOOOOOO....',
      '...OYYOYYOYYO...',
      '..OYYYYYYYYYYO..',
      '..OYYOYYOYYYYO..',
      '..OYYYYYYYYYYO..',
      '..OYYOYYOYYYYO..',
      '..OYYYYYYYYYYO..',
      '...OYYOYYOYYO...',
      '....OOOOOOOO....',
      '................',
      '................',
      '................',
      '................',
      '................',
    ],
    { G: '#4d7c0f', O: '#fb923c', Y: '#fdba74' }
  ),
  wheat: makePixelSvg(
    [
      '................',
      '.......N........',
      '......NYY.......',
      '.....NYYYY......',
      '....NYYYYYY.....',
      '.....NYYYY......',
      '....NYYYYYY.....',
      '.....NYYYY......',
      '....NYYYYYY.....',
      '.....NYYYY......',
      '......NYY.......',
      '.......N........',
      '.......N........',
      '.......N........',
      '................',
      '................',
    ],
    { N: '#7c5d2f', Y: '#facc15' }
  ),
};

function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

export default function SkyBlockHubPrototype() {
  const [selectedTheme, setSelectedTheme] = useState('Void');
  const [selectedMenu, setSelectedMenu] = useState('Overview');

  const activeTheme = useMemo(
    () => themes.find((theme) => theme.name === selectedTheme) ?? themes[0],
    [selectedTheme]
  );

  const player = {
    username: 'Technoblade',
    profile: 'Coconut',
    netWorth: '12.4B',
    purse: '128.5M',
    bank: '2.1B',
    skyblockLevel: 432,
    skillAverage: 48.7,
    farming: 60,
    mining: 60,
    fishing: 45,
    slayerXP: '9.4M',
    catacombs: 50,
    museumValue: '3.8B',
  };

  const collections: CollectionItem[] = [
    { name: 'Melon', progress: 96, sprite: sprites.melon },
    { name: 'Cobblestone', progress: 88, sprite: sprites.cobblestone },
    { name: 'Diamond', progress: 84, sprite: sprites.diamond },
    { name: 'Raw Fish', progress: 61, sprite: sprites.fish },
    { name: 'Pumpkin', progress: 97, sprite: sprites.pumpkin },
    { name: 'Wheat', progress: 94, sprite: sprites.wheat },
  ];

  const cheapUpgrades = {
    farming: [
      { name: 'Lotus Equipment Upgrade', cost: '8.5M', impact: '+Farming Fortune', reason: 'Best low-cost fortune gain' },
      { name: 'Crop Tool Reforge', cost: '3.2M', impact: '+Contest Power', reason: 'Cheap boost for crop contests' },
      { name: 'Pet Item Upgrade', cost: '14M', impact: '+Pet Performance', reason: 'Good value before bigger gear swaps' },
    ],
    mining: [
      { name: 'Artifact Tuning', cost: '6.8M', impact: '+Mining Stats', reason: 'Low cost stat improvement' },
      { name: 'Gemstone Slot Unlock', cost: '18M', impact: '+Pristine / Fortune', reason: 'Efficient step before a new drill' },
      { name: 'HotM Utility Upgrade', cost: '2.9M', impact: '+Progression', reason: 'Very cheap improvement' },
    ],
    fishing: [
      { name: 'Rod Enchant Package', cost: '4.4M', impact: '+Fishing Speed', reason: 'Cheap and immediate' },
      { name: 'Pet Level Upgrade', cost: '11M', impact: '+Sea Creature Chance', reason: 'Strong value per coin' },
      { name: 'Armor Piece Swap', cost: '16M', impact: '+Fishing Stats', reason: 'Good midgame upgrade' },
    ],
  };

  const leaderboard = [
    { label: 'Net Worth', rank: '#1,284', detail: 'Top 0.8% of tracked players', back: 'Coins are spread between purse, bank, inventory value, and museum assets.' },
    { label: 'Skill Average', rank: '#2,019', detail: 'Strong all-round progression', back: 'Average skill level 48.7 with farming and mining already capped at 60.' },
    { label: 'Farming', rank: '#742', detail: 'Contest-ready setup', back: 'Best next cheap gains are crop tool tuning and lotus equipment upgrades.' },
    { label: 'Mining', rank: '#1,106', detail: 'Gemstone path active', back: 'Next efficient path is utility unlocks before a full drill replacement.' },
    { label: 'Fishing', rank: '#3,488', detail: 'Mid-high tier fishing profile', back: 'Low-cost enchants and pet levels are still better than big-ticket swaps.' },
    { label: 'Museum', rank: '#912', detail: 'High collection value', back: 'Museum value is already strong and can become a flex leaderboard category.' },
  ];

  const statCards = [
    { label: 'Net Worth', value: player.netWorth },
    { label: 'SkyBlock Level', value: player.skyblockLevel },
    { label: 'Skill Average', value: player.skillAverage },
    { label: 'Museum Value', value: player.museumValue },
  ];

  const menuOptions = ['Overview', 'Collections', 'Upgrades', 'Leaderboards', 'Themes'];

  return (
    <div className={`min-h-screen ${activeTheme.shell} ${activeTheme.bodyPattern}`}>
      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/35 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className={`text-xs uppercase tracking-[0.35em] ${activeTheme.accentText}`}>SkyBlock Hub</div>
            <h1 className="text-2xl font-black tracking-tight md:text-3xl">Pixel SkyBlock Dashboard</h1>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <select
              value={selectedMenu}
              onChange={(e) => setSelectedMenu(e.target.value)}
              className={`h-11 rounded-2xl border px-4 text-sm font-semibold outline-none ${activeTheme.soft}`}
            >
              {menuOptions.map((option) => (
                <option key={option} value={option} className="bg-zinc-900 text-white">
                  {option}
                </option>
              ))}
            </select>

            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className={`h-11 rounded-2xl border px-4 text-sm font-semibold outline-none ${activeTheme.soft}`}
            >
              {themes.map((theme) => (
                <option key={theme.name} value={theme.name} className="bg-zinc-900 text-white">
                  {theme.name} Theme
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <section className="mb-8 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className={`rounded-[28px] border bg-gradient-to-br p-6 shadow-2xl shadow-black/20 ${activeTheme.panel} ${activeTheme.hero}`}>
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className={`text-sm uppercase tracking-[0.3em] ${activeTheme.accentText}`}>Search Player</div>
                <h2 className="mt-2 text-4xl font-black tracking-tight">Find any SkyBlock profile</h2>
                <p className={`mt-3 max-w-2xl ${activeTheme.subText}`}>
                  Added flip-card leaderboard tiles, animated pill buttons, working themes, and handcrafted pixel-art collection items.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 md:flex-row">
              <input
                defaultValue="Technoblade"
                className={`h-14 flex-1 rounded-2xl border px-4 text-base outline-none placeholder:opacity-60 ${activeTheme.soft}`}
                placeholder="Enter Minecraft username"
              />
              <button
                className="group inline-flex h-14 items-center gap-3 overflow-hidden rounded-full px-5 font-semibold text-white transition duration-300 hover:bg-black"
                style={{ backgroundColor: activeTheme.buttonVar } as React.CSSProperties}
              >
                <span>Search Profile</span>
                <span className="relative grid h-7 w-7 place-items-center overflow-hidden rounded-full bg-white" style={{ color: activeTheme.buttonVar } as React.CSSProperties}>
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[150%] group-hover:-translate-y-[150%]" />
                  <ArrowIcon className="absolute h-4 w-4 -translate-x-[150%] translate-y-[150%] transition-transform delay-100 duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
                </span>
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {[`Menu: ${selectedMenu}`, `Theme: ${selectedTheme}`, 'Pixel Collection Art', 'Upgrade Planner'].map((tag) => (
                <div key={tag} className={`rounded-2xl border px-4 py-2 text-sm ${activeTheme.soft}`}>
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[28px] border p-6 ${activeTheme.panel}`}>
            <div className={`text-sm uppercase tracking-[0.3em] ${activeTheme.accentText}`}>Selected Theme</div>
            <h3 className="mt-2 text-2xl font-bold">{selectedTheme}</h3>
            <p className={`mt-3 text-sm leading-6 ${activeTheme.subText}`}>
              The dropdown now switches themes for the whole page. The call-to-action buttons use the animated sliding-arrow style you sent.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {collections.slice(0, 3).map((item) => (
                <div key={item.name} className={`rounded-2xl border p-3 transition duration-300 hover:-translate-y-1 ${activeTheme.soft}`}>
                  <div className={`rounded-2xl border p-2 ${activeTheme.imageFrame}`}>
                    <img src={item.sprite} alt={item.name} className="mx-auto h-14 w-14 object-contain [image-rendering:pixelated]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <div key={card.label} className={`rounded-[28px] border p-5 transition duration-300 hover:-translate-y-1 ${activeTheme.panel}`}>
              <div className={`text-sm uppercase tracking-[0.25em] ${activeTheme.faint}`}>{card.label}</div>
              <div className="mt-3 text-3xl font-black">{card.value}</div>
            </div>
          ))}
        </section>

        <section className="mb-8 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className={`rounded-[28px] border p-6 ${activeTheme.panel}`}>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className={`text-sm uppercase tracking-[0.25em] ${activeTheme.faint}`}>Player Snapshot</div>
                <h3 className="mt-2 text-2xl font-bold">{player.username} · {player.profile}</h3>
              </div>
              <div className={`rounded-2xl px-4 py-2 text-sm ${activeTheme.accentSoft}`}>Profile loaded</div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[
                ['Purse', player.purse],
                ['Bank', player.bank],
                ['Farming', player.farming],
                ['Mining', player.mining],
                ['Fishing', player.fishing],
                ['Slayer XP', player.slayerXP],
                ['Catacombs', player.catacombs],
              ].map(([k, v]) => (
                <div key={String(k)} className={`rounded-2xl border p-4 transition duration-300 hover:-translate-y-1 ${activeTheme.soft}`}>
                  <div className={`text-sm ${activeTheme.faint}`}>{k}</div>
                  <div className="mt-2 text-2xl font-bold">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[28px] border p-6 ${activeTheme.panel}`}>
            <div className={`text-sm uppercase tracking-[0.25em] ${activeTheme.faint}`}>Quick Actions</div>
            <h3 className="mt-2 text-2xl font-bold">Explore more</h3>
            <div className="mt-5 flex flex-col gap-3">
              {['Open Collections', 'See Cheapest Upgrades', 'Browse Leaderboards'].map((label) => (
                <button
                  key={label}
                  className="group inline-flex items-center justify-between gap-3 overflow-hidden rounded-full px-5 py-3 font-semibold text-white transition duration-300 hover:bg-black"
                  style={{ backgroundColor: activeTheme.buttonVar } as React.CSSProperties}
                >
                  <span>{label}</span>
                  <span className="relative grid h-7 w-7 place-items-center overflow-hidden rounded-full bg-white" style={{ color: activeTheme.buttonVar } as React.CSSProperties}>
                    <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[150%] group-hover:-translate-y-[150%]" />
                    <ArrowIcon className="absolute h-4 w-4 -translate-x-[150%] translate-y-[150%] transition-transform delay-100 duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className={`mb-8 rounded-[28px] border p-6 ${activeTheme.panel}`}>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <div className={`text-sm uppercase tracking-[0.25em] ${activeTheme.faint}`}>Collections</div>
              <h3 className="mt-2 text-2xl font-bold">Pixel item progress</h3>
            </div>
            <div className={`text-sm ${activeTheme.faint}`}>Prototype art tiles</div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {collections.map((item) => (
              <div key={item.name} className={`group rounded-2xl border p-4 transition duration-300 hover:-translate-y-1 ${activeTheme.soft}`}>
                <div className="mb-4 flex items-center gap-3">
                  <div className={`rounded-2xl border p-2 transition duration-300 group-hover:scale-105 ${activeTheme.imageFrame}`}>
                    <img
                      src={item.sprite}
                      alt={item.name}
                      className="h-16 w-16 object-contain [image-rendering:pixelated]"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className={`text-sm ${activeTheme.faint}`}>{item.progress}% completed</div>
                  </div>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div className={`h-full rounded-full ${activeTheme.progress}`} style={{ width: `${item.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <div className={`text-sm uppercase tracking-[0.25em] ${activeTheme.faint}`}>Leaderboards</div>
              <h3 className="mt-2 text-2xl font-bold">Flip for more info</h3>
            </div>
            <div className={`text-sm ${activeTheme.faint}`}>Hover any card</div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {leaderboard.map((entry) => (
              <div key={entry.label} className="group h-56 [perspective:1000px]">
                <div className="relative h-full w-full rounded-[24px] transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  <div className={`absolute inset-0 flex h-full w-full flex-col justify-between rounded-[24px] border p-6 [backface-visibility:hidden] ${activeTheme.panel}`}>
                    <div>
                      <div className={`text-sm uppercase tracking-[0.25em] ${activeTheme.faint}`}>{entry.label}</div>
                      <div className="mt-4 text-4xl font-black">{entry.rank}</div>
                    </div>
                    <div className={`text-sm ${activeTheme.subText}`}>{entry.detail}</div>
                  </div>
                  <div className="absolute inset-0 flex h-full w-full flex-col justify-between rounded-[24px] border border-white/10 bg-black/80 p-6 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <div>
                      <div className="text-sm uppercase tracking-[0.25em] text-white/60">Why it matters</div>
                      <div className="mt-3 text-2xl font-bold">{entry.label}</div>
                    </div>
                    <div className="text-sm leading-6 text-white/85">{entry.back}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
          {Object.entries(cheapUpgrades).map(([category, upgrades]) => (
            <div key={category} className={`rounded-[28px] border p-6 ${activeTheme.panel}`}>
              <div className={`text-sm uppercase tracking-[0.25em] ${activeTheme.faint}`}>{category}</div>
              <h3 className="mt-2 text-2xl font-bold capitalize">Cheapest upgrades</h3>
              <div className="mt-5 space-y-4">
                {upgrades.map((upgrade) => (
                  <div key={upgrade.name} className={`rounded-2xl border p-4 transition duration-300 hover:-translate-y-1 ${activeTheme.soft}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold">{upgrade.name}</div>
                        <div className={`mt-1 text-sm ${activeTheme.faint}`}>{upgrade.reason}</div>
                      </div>
                      <div className={`rounded-xl px-3 py-1 text-sm ${activeTheme.accentSoft}`}>{upgrade.cost}</div>
                    </div>
                    <div className={`mt-3 text-sm ${activeTheme.accentText}`}>{upgrade.impact}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
