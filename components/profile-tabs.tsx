'use client';

import type { NavKey } from '@/lib/site-data';

const tabs: { key: NavKey; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'player', label: 'Player' },
  { key: 'collections', label: 'Collections' },
  { key: 'upgrades', label: 'Upgrades' },
  { key: 'leaderboards', label: 'Leaderboards' },
  { key: 'inventory', label: 'Inventory' },
  { key: 'settings', label: 'Themes' },
];

export function ProfileTabs({
  selected,
  onChange,
}: {
  selected: NavKey;
  onChange: (value: NavKey) => void;
}) {
  return (
    <div className="mt-6 rounded-[24px] border border-zinc-800 bg-zinc-900/90 p-3">
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
              selected === tab.key
                ? 'border-zinc-600 bg-zinc-100 text-zinc-950'
                : 'border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}