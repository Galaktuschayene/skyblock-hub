export type NavKey =
  | 'overview'
  | 'player'
  | 'collections'
  | 'upgrades'
  | 'leaderboards'
  | 'inventory';

export type InventoryTab =
  | 'Inventory'
  | 'Armor'
  | 'Backpacks'
  | 'Ender Chest';

export type Upgrade = {
  name: string;
  cost: string;
  impact: string;
  reason: string;
  item: string;
};

export type CollectionItem = {
  name: string;
  progress: number;
  item: string;
  tier: string;
  next: string;
};

const textureBase =
  'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.20.4/assets/minecraft/textures';

const item = (name: string) => `${textureBase}/item/${name}.png`;
const block = (name: string) => `${textureBase}/block/${name}.png`;

export const textures = {
  playerAvatar: (name: string) =>
    `https://mc-heads.net/avatar/${encodeURIComponent(name)}/128`,
  playerSkin: (name: string) =>
    `https://mc-heads.net/skin/${encodeURIComponent(name)}`,

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

export function getMockPlayer(player: string) {
  return {
    username: player,
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
}

export const collections: CollectionItem[] = [
  {
    name: 'Melon',
    progress: 96,
    item: textures.melon,
    tier: 'X',
    next: 'Final medals and crop optimization',
  },
  {
    name: 'Cobblestone',
    progress: 88,
    item: textures.cobblestone,
    tier: 'IX',
    next: 'Last minion-related unlocks',
  },
  {
    name: 'Diamond',
    progress: 84,
    item: textures.diamond,
    tier: 'IX',
    next: 'Mining recipe progression',
  },
  {
    name: 'Raw Fish',
    progress: 61,
    item: textures.fish,
    tier: 'VIII',
    next: 'Fishing utility unlocks',
  },
  {
    name: 'Pumpkin',
    progress: 97,
    item: textures.pumpkin,
    tier: 'X',
    next: 'Nearly maxed crop milestones',
  },
  {
    name: 'Wheat',
    progress: 94,
    item: textures.wheat,
    tier: 'X',
    next: 'Finish final farming recipe unlocks',
  },
];

export const upgrades: Record<string, Upgrade[]> = {
  farming: [
    {
      name: 'Lotus Equipment Upgrade',
      cost: '8.5M',
      impact: '+Farming Fortune',
      reason: 'Best low-cost fortune gain',
      item: textures.diamondHoe,
    },
    {
      name: 'Crop Tool Reforge',
      cost: '3.2M',
      impact: '+Contest Power',
      reason: 'Cheap boost for crop contests',
      item: textures.enchantedBook,
    },
    {
      name: 'Pet Item Upgrade',
      cost: '14M',
      impact: '+Pet Performance',
      reason: 'Good value before bigger gear swaps',
      item: textures.gold,
    },
  ],
  mining: [
    {
      name: 'Artifact Tuning',
      cost: '6.8M',
      impact: '+Mining Stats',
      reason: 'Low cost stat improvement',
      item: textures.netherStar,
    },
    {
      name: 'Gemstone Slot Unlock',
      cost: '18M',
      impact: '+Pristine / Fortune',
      reason: 'Efficient step before a new drill',
      item: textures.diamondPickaxe,
    },
    {
      name: 'HotM Utility Upgrade',
      cost: '2.9M',
      impact: '+Progression',
      reason: 'Very cheap improvement',
      item: textures.book,
    },
  ],
  fishing: [
    {
      name: 'Rod Enchant Package',
      cost: '4.4M',
      impact: '+Fishing Speed',
      reason: 'Cheap and immediate',
      item: textures.fishingRod,
    },
    {
      name: 'Pet Level Upgrade',
      cost: '11M',
      impact: '+Sea Creature Chance',
      reason: 'Strong value per coin',
      item: textures.emerald,
    },
    {
      name: 'Armor Piece Swap',
      cost: '16M',
      impact: '+Fishing Stats',
      reason: 'Good midgame upgrade',
      item: textures.boots,
    },
  ],
};

export const leaderboard = [
  {
    label: 'Net Worth',
    rank: '#1,284',
    detail: 'Top 0.8% of tracked players',
    item: textures.gold,
  },
  {
    label: 'Skill Average',
    rank: '#2,019',
    detail: 'Strong all-round progression',
    item: textures.book,
  },
  {
    label: 'Farming',
    rank: '#742',
    detail: 'Contest-ready setup',
    item: textures.diamondHoe,
  },
  {
    label: 'Mining',
    rank: '#1,106',
    detail: 'Gemstone path active',
    item: textures.diamondPickaxe,
  },
  {
    label: 'Fishing',
    rank: '#3,488',
    detail: 'Mid-high tier fishing profile',
    item: textures.fishingRod,
  },
  {
    label: 'Museum',
    rank: '#912',
    detail: 'High collection value',
    item: textures.chest,
  },
];

export const inventoryViews: Record<InventoryTab, string[]> = {
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
  Armor: [
    textures.helmet,
    textures.chestplate,
    textures.leggings,
    textures.boots,
  ],
  Backpacks: [
    textures.chest,
    textures.enderChest,
    textures.chest,
    textures.enderChest,
    textures.chest,
    textures.enderChest,
  ],
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