'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

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
  githubButton: string;
};

type NavKey =
  | 'overview'
  | 'player'
  | 'collections'
  | 'upgrades'
  | 'leaderboards'
  | 'inventory'
  | 'settings';

type Upgrade = {
  name: string;
  cost: string;
  impact: string;
  reason: string;
  item: string;
};

type CollectionItem = {
  name: string;
  progress: number;
  item: string;
  tier: string;
  next: string;
};

type InventoryTab = 'Inventory' | 'Armor' | 'Backpacks' | 'Ender Chest';

const themes: Theme[] = [
  {
    name: 'Minimal',
    shell: 'bg-zinc-50 text-zinc-950',
    panel: 'border-zinc-200 bg-white/90',
    soft: 'bg-zinc-100 border-zinc-200',
    hero: 'from-white via-zinc-100 to-zinc-200',
    accent: 'bg-zinc-950 text-white',
    accentSoft: 'bg-zinc-950/8 text-zinc-900',
    accentText: 'text-zinc-900',
    subText: 'text-zinc-600',
    faint: 'text-zinc-500',
    progress: 'bg-zinc-950',
    imageFrame: 'bg-white border-zinc-200',
    bodyPattern:
      'bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.05),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.04),transparent_28%)]',
    buttonVar: '#111827',
    githubButton: 'bg-black text-white hover:bg-black/90 hover:ring-black',
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
    githubButton: 'bg-black text-white hover:bg-black/90 hover:ring-cyan-300',
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
    githubButton: 'bg-black text-white hover:bg-black/90 hover:ring-rose-300',
  },
];

const textureBase =
  'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.20.4/assets/minecraft/textures';
const item = (name: string) => `${textureBase}/item/${name}.png`;
const block = (name: string) => `${textureBase}/block/${name}.png`;

const textures = {
  playerAvatar: (name: string) => `https://mc-heads.net/avatar/${encodeURIComponent(name)}/128`,
  playerSkin: (name: string) => `https://mc-heads.net/skin/${encodeURIComponent(name)}`,
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
  chestplate: item('diamond_chestplate'),
  leggings: item('diamond_leggings'),
  boots: item('diamond_boots'),
  bucket: item('water_bucket'),
  book: item('book'),
  carrot: item('carrot'),
  apple: item('apple'),
  bow: item('bow'),
  totem: item('totem_of_undying'),
  pearl: item('ender_pearl'),
  steak: item('cooked_beef'),
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

function GitHubIcon() {
  return (
    <svg className="h-4 w-4 fill-current" viewBox="0 0 438.549 438.549">
      <path d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="h-4 w-4 transition-all duration-300 group-hover:text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
      <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" />
    </svg>
  );
}

function ActionButton({
  label,
  color,
  onClick,
}: {
  label: string;
  color: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group inline-flex items-center justify-between gap-3 overflow-hidden rounded-full px-5 py-3 font-semibold text-white transition duration-300 hover:bg-black"
      style={{ backgroundColor: color }}
    >
      <span>{label}</span>
      <span className="relative grid h-7 w-7 place-items-center overflow-hidden rounded-full bg-white" style={{ color }}>
        <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[150%] group-hover:-translate-y-[150%]" />
        <ArrowIcon className="absolute h-4 w-4 -translate-x-[150%] translate-y-[150%] transition-transform delay-100 duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
      </span>
    </button>
  );
}

function GitHubButton({ theme }: { theme: Theme }) {
  return (
    <a
      href="https://github.com/Galaktuschayene/skyblock-hub"
      target="_blank"
      rel="noreferrer"
      className={`group relative flex w-full max-w-52 items-center justify-center gap-2 overflow-hidden rounded-md px-4 py-2 text-sm font-medium shadow transition-all duration-300 ease-out hover:ring-2 hover:ring-offset-2 ${theme.githubButton}`}
    >
      <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40" />
      <div className="flex items-center">
        <GitHubIcon />
        <span className="ml-1 text-white">Star on GitHub</span>
      </div>
      <div className="ml-2 flex items-center gap-1 text-sm">
        <StarIcon />
        <span className="inline-block tabular-nums font-medium tracking-wider text-white">6</span>
      </div>
    </a>
  );
}

function ItemThumb({
  src,
  alt,
  frameClass,
  size = 'h-14 w-14',
}: {
  src: string;
  alt: string;
  frameClass: string;
  size?: string;
}) {
  return (
    <div className={`rounded-2xl border p-2 ${frameClass}`}>
      <img src={src} alt={alt} className={`${size} object-contain [image-rendering:pixelated]`} />
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  faintClass,
  right,
}: {
  eyebrow: string;
  title: string;
  faintClass: string;
  right?: string;
}) {
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
              className={`block w-full px-4 py-3 text-left text-sm transition hover:bg-black/5 dark:hover:bg-white/10 ${
                option === value ? theme.accentText : ''
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function SkeletonCard({ theme }: { theme: Theme }) {
  return (
    <div className={`relative flex w-full animate-pulse gap-3 rounded-[24px] border p-4 ${theme.panel}`}>
      <div className="h-12 w-12 rounded-full bg-slate-300 dark:bg-slate-600" />
      <div className="flex-1">
        <div className="mb-2 h-5 w-3/5 rounded-lg bg-slate-300 dark:bg-slate-600" />
        <div className="h-5 w-[90%] rounded-lg bg-slate-300 dark:bg-slate-600" />
      </div>
      <div className="absolute bottom-5 right-4 h-4 w-4 rounded-full bg-slate-300 dark:bg-slate-600" />
    </div>
  );
}

function SkinViewerCard({ skinUrl, theme }: { skinUrl: string; theme: Theme }) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let disposed = false;
    let viewer: any = null;

    async function run() {
      if (!mountRef.current) return;

      mountRef.current.innerHTML = '';

      const mod = await import('skinview3d');
      if (disposed || !mountRef.current) return;

      viewer = new mod.SkinViewer({
        width: 320,
        height: 420,
        skin: skinUrl,
      });

      mountRef.current.appendChild(viewer.canvas);
      viewer.zoom = 0.9;
      viewer.fov = 50;
      viewer.autoRotate = true;
      viewer.autoRotateSpeed = 0.8;
      viewer.animation = new mod.WalkingAnimation();
    }

    run();

    return () => {
      disposed = true;
      if (viewer) viewer.dispose();
    };
  }, [skinUrl]);

  return (
    <div className={`rounded-[28px] border p-5 ${theme.panel}`}>
      <SectionTitle eyebrow="3D Skin" title="Player preview" faintClass={theme.faint} right="Auto rotating" />
      <div className={`flex min-h-[420px] items-center justify-center rounded-[24px] border ${theme.soft}`}>
        <div ref={mountRef} className="overflow-hidden rounded-[24px]" />
      </div>
    </div>
  );
}

export default function SkyBlockHubPage() {
  const [selectedTheme, setSelectedTheme] = useState('Minimal');
  const [selectedMenu, setSelectedMenu] = useState<NavKey>('overview');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState('Technoblade');
  const [inventoryTab, setInventoryTab] = useState<InventoryTab>('Inventory');

  const activeTheme = useMemo(
    () => themes.find((theme) => theme.name === selectedTheme) ?? themes[0],
    [selectedTheme]
  );

  const player = {
    username: currentPlayer,
    profile: 'Coconut',
    netWorth: '12.4B',
    purse: '128.5M',
    bank: '2.1B',
    skyblockLevel: 432,
    skillAverage: 48.7,
    catacombs: 50,
    slayerXP: '9.4M',
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
    { key: 'overview', label: 'Overview', item: textures.map },
    { key: 'player', label: 'Player', item: textures.playerAvatar(currentPlayer) },
    { key: 'collections', label: 'Collections', item: textures.melon },
    { key: 'upgrades', label: 'Upgrades', item: textures.enchantedBook },
    { key: 'leaderboards', label: 'Leaderboards', item: textures.compass },
    { key: 'inventory', label: 'Inventory', item: textures.chest },
    { key: 'settings', label: 'Themes', item: textures.clock },
  ];

  const inventoryViews: Record<InventoryTab, string[]> = {
    Inventory: [
      textures.diamondSword,
      textures.bow,
      textures.steak,
      textures.bucket,
      textures.pearl,
      textures.carrot,
      textures.apple,
      textures.book,
      textures.gold,
      textures.enchantedBook,
      textures.totem,
      textures.compass,
      textures.clock,
      textures.netherStar,
      textures.diamondPickaxe,
      textures.fishingRod,
    ],
    Armor: [textures.helmet, textures.chestplate, textures.leggings, textures.boots],
    Backpacks: [textures.chest, textures.enderChest, textures.chest, textures.enderChest, textures.chest, textures.enderChest],
    'Ender Chest': [
      textures.diamond,
      textures.gold,
      textures.emerald,
      textures.netherStar,
      textures.pearl,
      textures.book,
      textures.diamondPickaxe,
      textures.diamondHoe,
      textures.fishingRod,
      textures.enchantedBook,
      textures.totem,
      textures.bucket,
    ],
  };

  function runSearch() {
    const name = searchInput.trim();
    if (!name) return;
    setCurrentPlayer(name);
    setHasSearched(true);
    setSelectedMenu('overview');
  }

  function LandingPage() {
    return (
      <>
        <section className={`mb-8 rounded-[32px] border bg-gradient-to-br p-6 md:p-8 ${activeTheme.panel} ${activeTheme.hero}`}>
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.95fr] lg:items-center">
            <div>
              <div className={`text-sm uppercase tracking-[0.35em] ${activeTheme.accentText}`}>SkyBlock Hub</div>
              <h1 className="mt-3 max-w-3xl text-5xl font-black tracking-tight md:text-6xl">
                Clean Hypixel SkyBlock profiles, planning, and progression.
              </h1>
              <p className={`mt-4 max-w-2xl text-lg leading-8 ${activeTheme.subText}`}>
                Search a player to open a profile-first dashboard with 3D skin preview, collections, inventory-style pages, upgrade suggestions, and polished leaderboards.
              </p>
              <div className="mt-6 flex flex-col gap-3 md:flex-row">
                <input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className={`h-14 flex-1 rounded-2xl border px-4 text-base outline-none placeholder:opacity-60 ${activeTheme.soft}`}
                  placeholder="Enter Minecraft username"
                />
                <ActionButton label="Search Profile" color={activeTheme.buttonVar} onClick={runSearch} />
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {['3D Skin Viewer', 'Inventory Preview', 'Cheapest Upgrades', 'Collections', 'Leaderboards'].map((tag) => (
                  <div key={tag} className={`rounded-full border px-4 py-2 text-sm ${activeTheme.soft}`}>
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              <SkeletonCard theme={activeTheme} />
              <SkeletonCard theme={activeTheme} />
              <SkeletonCard theme={activeTheme} />
            </div>
          </div>
        </section>

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
      </>
    );
  }

  function ProfileTabs() {
    return (
      <div className={`mt-6 rounded-[24px] border p-3 ${activeTheme.panel}`}>
        <div className="flex flex-wrap gap-3">
          {navItems.map((nav) => (
            <button
              key={nav.key}
              onClick={() => setSelectedMenu(nav.key)}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 ${
                selectedMenu === nav.key ? activeTheme.accentSoft : activeTheme.soft
              }`}
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
      <section className={`mb-8 rounded-[32px] border bg-gradient-to-br p-6 shadow-2xl shadow-black/5 ${activeTheme.panel} ${activeTheme.hero}`}>
        <div className="grid gap-6 lg:grid-cols-[1.05fr_1.1fr]">
          <SkinViewerCard skinUrl={textures.playerSkin(currentPlayer)} theme={activeTheme} />
          <div>
            <div className={`text-sm uppercase tracking-[0.3em] ${activeTheme.accentText}`}>Player Profile</div>
            <h2 className="mt-2 text-4xl font-black tracking-tight">{player.username}</h2>
            <p className={`mt-3 max-w-2xl ${activeTheme.subText}`}>
              Profile-first layout inspired by the best SkyBlock viewers, with the most important player sections directly underneath the searched account.
            </p>
            <div className="mt-6 flex flex-col gap-3 md:flex-row">
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className={`h-14 flex-1 rounded-2xl border px-4 text-base outline-none placeholder:opacity-60 ${activeTheme.soft}`}
                placeholder="Search another username"
              />
              <ActionButton label="Load Profile" color={activeTheme.buttonVar} onClick={runSearch} />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
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

  function MinecraftInventoryGrid({
    title,
    items,
    columns = 9,
  }: {
    title: string;
    items: string[];
    columns?: number;
  }) {
    const minCells = columns === 9 ? 27 : columns;
    const cells = Array.from({ length: Math.max(items.length, minCells) }, (_, i) => items[i] ?? null);

    return (
      <div className={`rounded-[28px] border p-5 ${activeTheme.panel}`}>
        <SectionTitle eyebrow="Inventory Preview" title={title} faintClass={activeTheme.faint} right="Minecraft-style grid" />
        <div className={`rounded-[24px] border p-4 ${activeTheme.soft}`}>
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
            {cells.map((src, index) => (
              <div
                key={`${title}-${index}`}
                className={`aspect-square rounded-md border p-1 shadow-inner ${
                  src ? activeTheme.imageFrame : 'border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5'
                }`}
              >
                {src ? (
                  <img
                    src={src}
                    alt={`${title} slot ${index + 1}`}
                    className="mx-auto h-full w-full object-contain [image-rendering:pixelated]"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function OverviewPage() {
    return (
      <>
        <section className="mb-8 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <MinecraftInventoryGrid title="Main Inventory" items={inventoryViews.Inventory} columns={9} />
          <div className={`rounded-[28px] border p-6 ${activeTheme.panel}`}>
            <SectionTitle eyebrow="Main Features" title="What this site will do" faintClass={activeTheme.faint} />
            <div className="space-y-3">
              {[
                '3D player skin viewer directly at the top of the profile.',
                'Minecraft-style inventory, armor, backpack, and ender chest previews.',
                'Collections page with progress, tiers, and next unlock targets.',
                'Upgrade planner for farming, mining, and fishing.',
                'Leaderboards with polished cards and cleaner sections.',
              ].map((line) => (
                <div key={line} className={`rounded-2xl border px-4 py-3 text-sm ${activeTheme.soft}`}>
                  {line}
                </div>
              ))}
            </div>
          </div>
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
                <ItemThumb
                  src={entry.item}
                  alt={entry.name}
                  frameClass={`${activeTheme.imageFrame} transition duration-300 group-hover:scale-105`}
                  size="h-16 w-16"
                />
                <div>
                  <div className="font-semibold">{entry.name}</div>
                  <div className={`text-sm ${activeTheme.faint}`}>Tier {entry.tier}</div>
                </div>
              </div>
              <div className={`text-sm ${activeTheme.subText}`}>{entry.next}</div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
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
        <SectionTitle eyebrow="Leaderboards" title="Categories" faintClass={activeTheme.faint} right="Net Worth · Skills · Farming · Mining · Fishing · Museum" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {leaderboard.map((entry) => (
            <div key={entry.label} className={`rounded-[24px] border p-6 transition duration-300 hover:-translate-y-1 ${activeTheme.panel}`}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className={`text-sm uppercase tracking-[0.25em] ${activeTheme.faint}`}>{entry.label}</div>
                  <div className="mt-3 text-4xl font-black">{entry.rank}</div>
                </div>
                <ItemThumb src={entry.item} alt={entry.label} frameClass={activeTheme.imageFrame} />
              </div>
              <div className={`mt-4 text-sm ${activeTheme.subText}`}>{entry.detail}</div>
              <div className={`mt-3 text-sm ${activeTheme.faint}`}>{entry.back}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  function InventoryPage() {
    return (
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="mb-2 flex flex-wrap gap-2">
            {(['Inventory', 'Armor', 'Backpacks', 'Ender Chest'] as InventoryTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setInventoryTab(tab)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  inventoryTab === tab ? activeTheme.accentSoft : activeTheme.soft
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <MinecraftInventoryGrid title={inventoryTab} items={inventoryViews[inventoryTab]} columns={inventoryTab === 'Armor' ? 4 : 9} />
        </div>
        <div className={`rounded-[28px] border p-6 ${activeTheme.panel}`}>
          <SectionTitle eyebrow="Equipment" title="Armor and storage view" faintClass={activeTheme.faint} />
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ['Helmet', textures.helmet],
              ['Chestplate', textures.chestplate],
              ['Leggings', textures.leggings],
              ['Boots', textures.boots],
              ['Backpack 1', textures.chest],
              ['Ender Chest', textures.enderChest],
            ].map(([label, src]) => (
              <div key={label} className={`rounded-2xl border p-4 ${activeTheme.soft}`}>
                <div className="flex items-center gap-3">
                  <ItemThumb src={String(src)} alt={label} frameClass={activeTheme.imageFrame} size="h-12 w-12" />
                  <div>
                    <div className="font-semibold">{label}</div>
                    <div className={`text-sm ${activeTheme.faint}`}>Preview section for API inventory data</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
              className={`rounded-[24px] border p-5 text-left transition duration-300 hover:-translate-y-1 ${
                theme.name === selectedTheme ? activeTheme.accentSoft : activeTheme.soft
              }`}
            >
              <div className="text-xl font-bold">{theme.name}</div>
              <div className={`mt-2 text-sm ${activeTheme.faint}`}>Theme preset for the dashboard shell.</div>
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
      case 'inventory':
        return <InventoryPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <OverviewPage />;
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
                <div className="text-2xl font-black">Profile Viewer</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <CustomDropdown
                value={selectedTheme}
                options={themes.map((t) => t.name)}
                onChange={setSelectedTheme}
                theme={activeTheme}
              />
            </div>
          </div>
        </header>

        {!hasSearched ? <LandingPage /> : null}

        {hasSearched ? (
          <>
            <ProfileHero />
            {renderPage()}
          </>
        ) : null}

        <footer className={`mt-8 rounded-[28px] border p-5 ${activeTheme.panel}`}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className={`text-sm uppercase tracking-[0.25em] ${activeTheme.faint}`}>SkyBlock Hub</div>
              <div className="mt-1 text-lg font-bold">Open source prototype for a Hypixel SkyBlock profile site</div>
            </div>
            <GitHubButton theme={activeTheme} />
          </div>
        </footer>
      </main>
    </div>
  );
}