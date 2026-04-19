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

type NavKey = 'dashboard' | 'player' | 'collections' | 'upgrades' | 'leaderboards' | 'settings';

type Upgrade = { name: string; cost: string; impact: string; reason: string; item: string };

type CollectionItem = { name: string; progress: number; item: string; tier: string; next: string };

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

const textureBase = 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.20.4/assets/minecraft/textures';
const item = (name: string) => `${textureBase}/item/${name}.png`;
const block = (name: string) => `${textureBase}/block/${name}.png`;

const textures = {
  player: 'https://mc-heads.net/avatar/Technoblade/128',
  melon: block('melon_side'),
  cobblestone: block('cobblestone'),
  diamond: item('diamond'),
  fish: item('cod'),
  pumpkin: block('pumpkin_side'),
  wheat: item('wheat'),
  diamondPickaxe: item('diamond_pickaxe'),
  fishingRod: item('fishing_rod'),
  diamondHoe: item('diamond_hoe'),
  enchantedBook: item('enchanted_book'),
  chest: block('chest_front'),
  emerald: item('emerald'),
  gold: item('gold_ingot'),
  netherStar: item('nether_star'),
  compass: item('compass_00'),
  map: item('filled_map'),
  clock: item('clock_00'),
  enderChest: block('ender_chest_front'),
  diamondSword: item('diamond_sword'),
  helmet: item('diamond_helmet'),
  boots: item('diamond_boots'),
  shovel: item('diamond_shovel'),
  bucket: item('water_bucket'),
  book: item('book'),
};

function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function ChevronIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ActionButton({ label, color }: { label: string; color: string }) {
  return (
    <button
      className="group inline-flex items-center justify-between gap-3 overflow-hidden rounded-full px-5 py-3 font-semibold text-white transition duration-300 hover:bg-black"
      style={{ backgroundColor: color } as React.CSSProperties}
    >
      <span>{label}</span>
      <span className="relative grid h-7 w-7 place-items-center overflow-hidden rounded-full bg-white" style={{ color: color } as React.CSSProperties}>
        <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[150%] group-hover:-translate-y-[150%]" />
        <ArrowIcon className="absolute h-4 w-4 -translate-x-[150%] translate-y-[150%] transition-transform delay-100 duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
      </span>
    </button>
  );
}

function ItemThumb({ src, alt, frameClass, size = 'h-14 w-14' }: { src: string; alt: string; frameClass: string; size?: string }) {
  return (
    <div className={`rounded-2xl border p-2 ${frameClass}`}>
      <img src={src} alt={alt} className={`${size} object-contain [image-rendering:pixelated]`} />
    </div>
  );
}

function SectionTitle({ eyebrow, title, faintClass, right }: { eyebrow: string; title: string; faintClass: string; right?: string }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <div className={`text-sm uppercase tracking-[0.25em] ${faintClass}`}>{eyebrow}</div>
        <h3 className="mt-2 text-2xl font-bold">{title}</h3>
      </div>
      {right ? <div className={`text-sm ${faintClass}`}>{right}</div> : null}
    </div>
  );
}

function CustomDropdown({
  value,
  options,
  onChange,
  theme,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  theme: Theme;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex h-12 min-w-[180px] items-center justify-between gap-3 rounded-2xl border px-4 text-sm font-semibold transition ${theme.soft}`}
      >
        <span>{value}</span>
        <ChevronIcon className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open ? (
        <div className={`absolute right-0 z-30 mt-2 min-w-full overflow-hidden rounded-2xl border shadow-2xl ${theme.panel}`}>
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`block w-full px-4 py-3 text-left text-sm transition hover:bg-white/10 ${option === value ? theme.accentText : ''}`}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function SkyBlockHubPrototype() {
  const [selectedTheme, setSelectedTheme] = useState('Void');
  const [selectedMenu, setSelectedMenu] = useState<NavKey>('dashboard');

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
    gardenLevel: 15,
    hotm: 10,
    pets: 21,
    accessories: 139,
  };

  const collections: CollectionItem[] = [
    { name: 'Melon', progress: 96, item: textures.melon, tier: 'X', next: 'Final medals and crop optimization' },
    { name: 'Cobblestone', progress: 88, item: textures.cobblestone, tier: 'IX', next: 'Last minion-related unlocks' },
    { name: 'Diamond', progress: 84, item: textures.diamond, tier: 'IX', next: 'Mining recipe progression' },
    { name: 'Raw Fish', progress: 61, item: textures.fish, tier: 'VIII', next: 'Fishing utility unlocks' },
    { name: 'Pumpkin', progress: 97, item: textures.pumpkin, tier: 'X', next: 'Nearly maxed crop milestones' },
    { name: 'Wheat', progress: 94, item: textures.wheat, tier: 'X', next: 'Finish final farming recipe unlocks' },
  ];

  const cheapUpgrades: Record<string, Upgrade[]> = {
    farming: [
      { name: 'Lotus Equipment Upgrade', cost: '8.5M', impact: '+Farming Fortune', reason: 'Best low-cost fortune gain', item: textures.diamondHoe },
      { name: 'Crop Tool Reforge', cost: '3.2M', impact: '+Contest Power', reason: 'Cheap boost for crop contests', item: textures.enchantedBook },
      { name: 'Pet Item Upgrade', cost: '14M', impact: '+Pet Performance', reason: 'Good value before bigger gear swaps', item: textures.gold },
    ],
    mining: [
      { name: 'Artifact Tuning', cost: '6.8M', impact: '+Mining Stats', reason: 'Low cost stat improvement', item: textures.netherStar },
      { name: 'Gemstone Slot Unlock', cost: '18M', impact: '+Pristine / Fortune', reason: 'Efficient step before a new drill', item: textures.diamondPickaxe },
      { name: 'HotM Utility Upgrade', cost: '2.9M', impact: '+Progression', reason: 'Very cheap improvement', item: textures.book },
    ],
    fishing: [
      { name: 'Rod Enchant Package', cost: '4.4M', impact: '+Fishing Speed', reason: 'Cheap and immediate', item: textures.fishingRod },
      { name: 'Pet Level Upgrade', cost: '11M', impact: '+Sea Creature Chance', reason: 'Strong value per coin', item: textures.emerald },
      { name: 'Armor Piece Swap', cost: '16M', impact: '+Fishing Stats', reason: 'Good midgame upgrade', item: textures.boots },
    ],
  };

  const leaderboard = [
    { label: 'Net Worth', rank: '#1,284', detail: 'Top 0.8% of tracked players', back: 'Coins are spread between purse, bank, inventory value, and museum assets.', item: textures.gold },
    { label: 'Skill Average', rank: '#2,019', detail: 'Strong all-round progression', back: 'Average skill level 48.7 with farming and mining already capped at 60.', item: textures.book },
    { label: 'Farming', rank: '#742', detail: 'Contest-ready setup', back: 'Best next cheap gains are crop tool tuning and lotus equipment upgrades.', item: textures.diamondHoe },
    { label: 'Mining', rank: '#1,106', detail: 'Gemstone path active', back: 'Next efficient path is utility unlocks before a full drill replacement.', item: textures.diamondPickaxe },
    { label: 'Fishing', rank: '#3,488', detail: 'Mid-high tier fishing profile', back: 'Low-cost enchants and pet levels are still better than big-ticket swaps.', item: textures.fishingRod },
    { label: 'Museum', rank: '#912', detail: 'High collection value', back: 'Museum value is already strong and can become a flex leaderboard category.', item: textures.chest },
  ];

  const statCards = [
    { label: 'Net Worth', value: player.netWorth, item: textures.gold },
    { label: 'SkyBlock Level', value: player.skyblockLevel, item: textures.netherStar },
    { label: 'Skill Average', value: player.skillAverage, item: textures.book },
    { label: 'Museum Value', value: player.museumValue, item: textures.chest },
  ];

  const navItems: { key: NavKey; label: string; item: string }[] = [
    { key: 'dashboard', label: 'Overview', item: textures.map },
    { key: 'player', label: 'Player', item: textures.player },
    { key: 'collections', label: 'Collections', item: textures.melon },
    { key: 'upgrades', label: 'Upgrades', item: textures.enchantedBook },
    { key: 'leaderboards', label: 'Leaderboards', item: textures.compass },
    { key: 'settings', label: 'Themes', item: textures.clock },
  ];

  function ProfileTabs() {
    return (
      <div className={`mt-6 rounded-[24px] border p-3 ${activeTheme.panel}`}>
        <div className="flex flex-wrap gap-3">
          {navItems.map((nav) => (
            <button
              key={nav.key}
              onClick={() => setSelectedMenu(nav.key)}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 ${selectedMenu === nav.key ? activeTheme.accentSoft : activeTheme.soft}`}
            >
              <ItemThumb src={nav.item} alt={nav.label} frameClass={activeTheme.imageFrame} size="h-8 w-8" />
              <span>{nav.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  function ProfileHero() {
    return (
      <section className={`mb-8 rounded-[32px] border bg-gradient-to-br p-6 shadow-2xl shadow-black/20 ${activeTheme.panel} ${activeTheme.hero}`}>
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className={`text-sm uppercase tracking-[0.3em] ${activeTheme.accentText}`}>Search Player</div>
            <h2 className="mt-2 text-4xl font-black tracking-tight">Find any SkyBlock profile</h2>
            <p className={`mt-3 max-w-2xl ${activeTheme.subText}`}>
              Cleaner profile-first layout with custom dropdowns, real Minecraft item textures, collections, upgrades, and leaderboard views directly under the looked-up player.
            </p>
            <div className="mt-6 flex flex-col gap-3 md:flex-row">
              <input defaultValue="Technoblade" className={`h-14 flex-1 rounded-2xl border px-4 text-base outline-none placeholder:opacity-60 ${activeTheme.soft}`} placeholder="Enter Minecraft username" />
              <ActionButton label="Search Profile" color={activeTheme.buttonVar} />
            </div>
          </div>

          <div className={`rounded-[28px] border p-5 ${activeTheme.soft}`}>
            <div className="flex items-center gap-4">
              <ItemThumb src={textures.player} alt={player.username} frameClass={activeTheme.imageFrame} size="h-20 w-20" />
              <div>
                <div className="text-2xl font-black">{player.username}</div>
                <div className={`mt-1 ${activeTheme.subText}`}>Profile: {player.profile}</div>
                <div className={`mt-2 text-sm ${activeTheme.faint}`}>SkyBlock Level {player.skyblockLevel} · Skill Avg {player.skillAverage}</div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                ['Net Worth', player.netWorth, textures.gold],
                ['Garden', player.gardenLevel, textures.melon],
                ['HOTM', player.hotm, textures.diamondPickaxe],
                ['Museum', player.museumValue, textures.chest],
              ].map(([label, value, img]) => (
                <div key={String(label)} className={`rounded-2xl border p-3 ${activeTheme.soft}`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className={`text-xs uppercase tracking-[0.25em] ${activeTheme.faint}`}>{label}</div>
                    <ItemThumb src={String(img)} alt={String(label)} frameClass={activeTheme.imageFrame} size="h-8 w-8" />
                  </div>
                  <div className="mt-2 text-lg font-bold">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ProfileTabs />
      </section>
    );
  }

  function DashboardPage() {
    return (
      <>
        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <div key={card.label} className={`rounded-[28px] border p-5 transition duration-300 hover:-translate-y-1 ${activeTheme.panel}`}>
              <div className="flex items-center justify-between gap-4">
                <div className={`text-sm uppercase tracking-[0.25em] ${activeTheme.faint}`}>{card.label}</div>
                <ItemThumb src={card.item} alt={card.label} frameClass={activeTheme.imageFrame} />
              </div>
              <div className="mt-3 text-3xl font-black">{card.value}</div>
            </div>
          ))}
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
          {Object.entries(cheapUpgrades).map(([category, upgrades]) => (
            <div key={category} className={`rounded-[28px] border p-6 ${activeTheme.panel}`}>
              <SectionTitle eyebrow={category} title="Cheapest upgrades" faintClass={activeTheme.faint} />
              <div className="space-y-4">
                {upgrades.map((upgrade) => (
                  <div key={upgrade.name} className={`rounded-2xl border p-4 transition duration-300 hover:-translate-y-1 ${activeTheme.soft}`}>
                    <div className="flex items-start gap-3">
                      <ItemThumb src={upgrade.item} alt={upgrade.name} frameClass={activeTheme.imageFrame} />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="font-semibold">{upgrade.name}</div>
                            <div className={`mt-1 text-sm ${activeTheme.faint}`}>{upgrade.reason}</div>
                          </div>
                          <div className={`rounded-xl px-3 py-1 text-sm ${activeTheme.accentSoft}`}>{upgrade.cost}</div>
                        </div>
                        <div className={`mt-3 text-sm ${activeTheme.accentText}`}>{upgrade.impact}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      </>
    );
  }

  function PlayerPage() {
    const blocks = [
      ['Purse', player.purse, textures.gold],
      ['Bank', player.bank, textures.enderChest],
      ['Garden Level', player.gardenLevel, textures.melon],
      ['HOTM', player.hotm, textures.diamondPickaxe],
      ['Pets', player.pets, textures.emerald],
      ['Accessories', player.accessories, textures.book],
      ['Catacombs', player.catacombs, textures.diamondSword],
      ['Slayer XP', player.slayerXP, textures.netherStar],
    ] as const;

    return (
      <>
        <section className={`mb-8 rounded-[28px] border p-6 ${activeTheme.panel}`}>
          <SectionTitle eyebrow="Player Page" title="Full progression overview" faintClass={activeTheme.faint} right="Stats · Gear · Skills · Museum" />
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div className={`rounded-[24px] border p-5 ${activeTheme.soft}`}>
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <ItemThumb src={textures.player} alt={player.username} frameClass={activeTheme.imageFrame} size="h-24 w-24" />
                <div>
                  <h4 className="text-3xl font-black">{player.username}</h4>
                  <div className={`mt-2 ${activeTheme.subText}`}>Profile: {player.profile} · SkyBlock Level {player.skyblockLevel} · Skill Average {player.skillAverage}</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['Museum', 'Garden', 'Dungeons', 'Minions', 'Pets', 'Collections'].map((tag) => (
                      <div key={tag} className={`rounded-2xl border px-3 py-2 text-sm ${activeTheme.soft}`}>{tag}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={`rounded-[24px] border p-5 ${activeTheme.soft}`}>
              <div className={`text-sm uppercase tracking-[0.25em] ${activeTheme.faint}`}>Focus Areas</div>
              <div className="mt-4 space-y-3">
                {[
                  'Farming Fortune upgrades still have the best cheap value.',
                  'Mining utility before replacing full drill setup.',
                  'Fishing still has easy gains through enchants and pet levels.',
                ].map((tip) => (
                  <div key={tip} className={`rounded-2xl border px-4 py-3 text-sm ${activeTheme.soft}`}>{tip}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {blocks.map(([label, value, img]) => (
            <div key={label} className={`rounded-[28px] border p-5 transition duration-300 hover:-translate-y-1 ${activeTheme.panel}`}>
              <div className="flex items-center justify-between gap-3">
                <div className={`text-sm uppercase tracking-[0.25em] ${activeTheme.faint}`}>{label}</div>
                <ItemThumb src={img} alt={label} frameClass={activeTheme.imageFrame} />
              </div>
              <div className="mt-3 text-3xl font-black">{value}</div>
            </div>
          ))}
        </section>
      </>
    );
  }

  function CollectionsPage() {
    return (
      <section className={`rounded-[28px] border p-6 ${activeTheme.panel}`}>
        <SectionTitle eyebrow="Collections" title="Recipes, unlocks, and progress" faintClass={activeTheme.faint} right="Crop · Mining · Fishing" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {collections.map((entry) => (
            <div key={entry.name} className={`group rounded-2xl border p-4 transition duration-300 hover:-translate-y-1 ${activeTheme.soft}`}>
              <div className="mb-4 flex items-center gap-3">
                <ItemThumb src={entry.item} alt={entry.name} frameClass={`${activeTheme.imageFrame} transition duration-300 group-hover:scale-105`} size="h-16 w-16" />
                <div>
                  <div className="font-semibold">{entry.name}</div>
                  <div className={`text-sm ${activeTheme.faint}`}>Tier {entry.tier}</div>
                </div>
              </div>
              <div className={`text-sm ${activeTheme.subText}`}>{entry.next}</div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                <div className={`h-full rounded-full ${activeTheme.progress}`} style={{ width: `${entry.progress}%` }} />
              </div>
              <div className={`mt-2 text-sm ${activeTheme.faint}`}>{entry.progress}% completed</div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  function UpgradesPage() {
    return (
      <div className="grid gap-4 xl:grid-cols-3">
        {Object.entries(cheapUpgrades).map(([category, upgrades]) => (
          <div key={category} className={`rounded-[28px] border p-6 ${activeTheme.panel}`}>
            <SectionTitle eyebrow={category} title="Smart next upgrades" faintClass={activeTheme.faint} right="Cheapest · Best value · Fastest" />
            <div className="space-y-4">
              {upgrades.map((upgrade) => (
                <div key={upgrade.name} className={`rounded-2xl border p-4 transition duration-300 hover:-translate-y-1 ${activeTheme.soft}`}>
                  <div className="flex items-start gap-3">
                    <ItemThumb src={upgrade.item} alt={upgrade.name} frameClass={activeTheme.imageFrame} />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-semibold">{upgrade.name}</div>
                          <div className={`mt-1 text-sm ${activeTheme.faint}`}>{upgrade.reason}</div>
                        </div>
                        <div className={`rounded-xl px-3 py-1 text-sm ${activeTheme.accentSoft}`}>{upgrade.cost}</div>
                      </div>
                      <div className={`mt-3 text-sm ${activeTheme.accentText}`}>{upgrade.impact}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  function LeaderboardsPage() {
    return (
      <section>
        <SectionTitle eyebrow="Leaderboards" title="Flip for more info" faintClass={activeTheme.faint} right="Net Worth · Skills · Farming · Mining · Fishing · Museum" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {leaderboard.map((entry) => (
            <div key={entry.label} className="group h-64 [perspective:1000px]">
              <div className="relative h-full w-full rounded-[24px] transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div className={`absolute inset-0 flex h-full w-full flex-col justify-between rounded-[24px] border p-6 [backface-visibility:hidden] ${activeTheme.panel}`}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className={`text-sm uppercase tracking-[0.25em] ${activeTheme.faint}`}>{entry.label}</div>
                      <div className="mt-4 text-4xl font-black">{entry.rank}</div>
                    </div>
                    <ItemThumb src={entry.item} alt={entry.label} frameClass={activeTheme.imageFrame} />
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
    );
  }

  function SettingsPage() {
    return (
      <section className={`rounded-[28px] border p-6 ${activeTheme.panel}`}>
        <SectionTitle eyebrow="Themes" title="Visual settings" faintClass={activeTheme.faint} right="Choose your style" />
        <div className="grid gap-4 md:grid-cols-3">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => setSelectedTheme(theme.name)}
              className={`rounded-[24px] border p-5 text-left transition duration-300 hover:-translate-y-1 ${theme.name === selectedTheme ? activeTheme.accentSoft : activeTheme.soft}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xl font-bold">{theme.name}</div>
                  <div className={`mt-2 text-sm ${activeTheme.faint}`}>Theme preset for the dashboard shell.</div>
                </div>
                <ItemThumb src={textures.clock} alt={theme.name} frameClass={activeTheme.imageFrame} />
              </div>
            </button>
          ))}
        </div>
      </section>
    );
  }

  function renderPage() {
    switch (selectedMenu) {
      case 'player':
        return <PlayerPage />;
      case 'collections':
        return <CollectionsPage />;
      case 'upgrades':
        return <UpgradesPage />;
      case 'leaderboards':
        return <LeaderboardsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  }

  return (
    <div className={`min-h-screen ${activeTheme.shell} ${activeTheme.bodyPattern}`}>
      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <header className={`mb-6 rounded-[28px] border p-4 ${activeTheme.panel}`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <ItemThumb src={textures.netherStar} alt="SkyBlock Hub" frameClass={activeTheme.imageFrame} />
              <div>
                <div className={`text-xs uppercase tracking-[0.35em] ${activeTheme.accentText}`}>SkyBlock Hub</div>
                <div className="text-2xl font-black">Profile Dashboard</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <CustomDropdown value={selectedMenu.charAt(0).toUpperCase() + selectedMenu.slice(1)} options={navItems.map((n) => n.label)} onChange={(value) => {
                const found = navItems.find((n) => n.label === value);
                if (found) setSelectedMenu(found.key);
              }} theme={activeTheme} />
              <CustomDropdown value={selectedTheme} options={themes.map((t) => t.name)} onChange={setSelectedTheme} theme={activeTheme} />
            </div>
          </div>
        </header>

        <ProfileHero />

        {renderPage()}
      </main>
    </div>
  );
}
