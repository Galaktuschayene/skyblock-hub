export default function SkyBlockHubPrototype() {
  const player = {
    username: "Technoblade",
    profile: "Coconut",
    netWorth: "12.4B",
    purse: "128.5M",
    bank: "2.1B",
    skyblockLevel: 432,
    skillAverage: 48.7,
    farming: 60,
    mining: 60,
    fishing: 45,
    slayerXP: "9.4M",
    catacombs: 50,
    museumValue: "3.8B",
  };

  const themes = [
    {
      name: "Void",
      shell: "bg-zinc-950 text-zinc-100",
      panel: "border-white/10 bg-white/5",
      soft: "bg-black/20 border-white/10",
      hero: "from-lime-500/15 via-emerald-500/10 to-cyan-500/10",
      accent: "bg-lime-400 text-zinc-950",
      accentSoft: "bg-lime-400/15 text-lime-300",
      accentText: "text-lime-300",
      subText: "text-zinc-300",
      faint: "text-zinc-400",
      progress: "bg-lime-400",
      emojiFrame: "bg-zinc-900 border-lime-400/30",
      bodyPattern: "bg-[radial-gradient(circle_at_top_right,rgba(132,204,22,0.12),transparent_25%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.1),transparent_30%)]",
    },
    {
      name: "Sky",
      shell: "bg-sky-950 text-sky-50",
      panel: "border-sky-200/10 bg-sky-400/10",
      soft: "bg-sky-950/40 border-sky-200/10",
      hero: "from-sky-400/20 via-cyan-400/10 to-indigo-400/20",
      accent: "bg-cyan-300 text-sky-950",
      accentSoft: "bg-cyan-300/15 text-cyan-200",
      accentText: "text-cyan-200",
      subText: "text-sky-100/80",
      faint: "text-sky-200/55",
      progress: "bg-cyan-300",
      emojiFrame: "bg-sky-950/60 border-cyan-300/30",
      bodyPattern: "bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_34%)]",
    },
    {
      name: "Ruby",
      shell: "bg-neutral-950 text-rose-50",
      panel: "border-rose-200/10 bg-rose-500/10",
      soft: "bg-black/25 border-rose-200/10",
      hero: "from-rose-500/20 via-red-500/10 to-orange-400/15",
      accent: "bg-rose-300 text-rose-950",
      accentSoft: "bg-rose-300/15 text-rose-200",
      accentText: "text-rose-200",
      subText: "text-rose-50/80",
      faint: "text-rose-200/50",
      progress: "bg-rose-300",
      emojiFrame: "bg-neutral-950 border-rose-300/30",
      bodyPattern: "bg-[radial-gradient(circle_at_top_right,rgba(251,113,133,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(251,146,60,0.12),transparent_34%)]",
    },
  ];

  const activeTheme = themes[0];

  const pixelIcons = {
    money: "🪙",
    farming: "🌾",
    mining: "⛏️",
    fishing: "🎣",
    museum: "🏛️",
    rank: "🏆",
    search: "🧭",
    profile: "🧱",
    spark: "✨",
    collection: "📦",
  };

  const cheapUpgrades = {
    farming: [
      { name: "Lotus Equipment Upgrade", cost: "8.5M", impact: "+Farming Fortune", reason: "Best low-cost fortune gain", icon: pixelIcons.farming },
      { name: "Crop-Specific Tool Reforge", cost: "3.2M", impact: "+Crop Efficiency", reason: "Cheap boost for contests", icon: "🥕" },
      { name: "Pet Item Upgrade", cost: "14M", impact: "+Pet Performance", reason: "Good value before major gear swap", icon: "🐘" },
    ],
    mining: [
      { name: "Artifact of Power Tuning", cost: "6.8M", impact: "+Mining Stats", reason: "Low cost stat improvement", icon: pixelIcons.mining },
      { name: "Gemstone Slot Unlock", cost: "18M", impact: "+Pristine / Fortune", reason: "Efficient step before new drill", icon: "💎" },
      { name: "HotM Utility Upgrade", cost: "2.9M", impact: "+Progression", reason: "Very cheap improvement", icon: "🪨" },
    ],
    fishing: [
      { name: "Rod Enchant Package", cost: "4.4M", impact: "+Fishing Speed", reason: "Cheap and immediate", icon: pixelIcons.fishing },
      { name: "Pet Level Upgrade", cost: "11M", impact: "+Sea Creature Chance", reason: "Strong value per coin", icon: "🐬" },
      { name: "Armor Piece Swap", cost: "16M", impact: "+Fishing Stats", reason: "Good midgame upgrade", icon: "🐟" },
    ],
  };

  const leaderboard = [
    { rank: 1, label: "Net Worth", value: "#1,284", icon: pixelIcons.money },
    { rank: 2, label: "Skill Average", value: "#2,019", icon: pixelIcons.spark },
    { rank: 3, label: "Farming", value: "#742", icon: pixelIcons.farming },
    { rank: 4, label: "Mining", value: "#1,106", icon: pixelIcons.mining },
    { rank: 5, label: "Fishing", value: "#3,488", icon: pixelIcons.fishing },
  ];

  const collections = [
    { name: "Wheat", progress: 94, icon: "🌾" },
    { name: "Cobblestone", progress: 88, icon: "🧱" },
    { name: "Mithril", progress: 72, icon: "⛏️" },
    { name: "Diamond", progress: 84, icon: "💎" },
    { name: "Raw Fish", progress: 61, icon: "🐟" },
    { name: "Pumpkin", progress: 97, icon: "🎃" },
  ];

  const statCards = [
    { label: "Net Worth", value: player.netWorth, icon: pixelIcons.money },
    { label: "SkyBlock Level", value: player.skyblockLevel, icon: pixelIcons.profile },
    { label: "Skill Average", value: player.skillAverage, icon: pixelIcons.spark },
    { label: "Museum Value", value: player.museumValue, icon: pixelIcons.museum },
  ];

  return (
    <div className={`min-h-screen ${activeTheme.shell} ${activeTheme.bodyPattern}`}>
      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/35 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className={`text-xs uppercase tracking-[0.35em] ${activeTheme.accentText}`}>SkyBlock Hub</div>
            <h1 className="text-2xl font-black tracking-tight md:text-3xl">Hypixel SkyBlock Progression Dashboard</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className={`rounded-2xl border px-3 py-2 text-xs uppercase tracking-[0.25em] ${activeTheme.panel}`}>
              Theme Select
            </div>
            {themes.map((theme) => (
              <button
                key={theme.name}
                className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition hover:scale-[1.02] ${
                  theme.name === activeTheme.name ? activeTheme.accent : activeTheme.panel
                }`}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <section className="mb-8 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className={`rounded-[28px] border bg-gradient-to-br p-6 shadow-2xl shadow-black/20 ${activeTheme.panel} ${activeTheme.hero}`}>
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className={`text-sm uppercase tracking-[0.3em] ${activeTheme.accentText}`}>{pixelIcons.search} Search Player</div>
                <h2 className="mt-2 text-4xl font-black tracking-tight">Find any SkyBlock profile</h2>
                <p className={`mt-3 max-w-2xl ${activeTheme.subText}`}>
                  View net worth, skills, collections, rankings, and the cheapest next upgrades for farming, mining, and fishing.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 md:flex-row">
              <input
                defaultValue="Technoblade"
                className={`h-14 flex-1 rounded-2xl border px-4 text-base outline-none placeholder:opacity-60 ${activeTheme.soft}`}
                placeholder="Enter Minecraft username"
              />
              <button className={`h-14 rounded-2xl px-6 font-semibold transition hover:scale-[1.01] ${activeTheme.accent}`}>
                Search Profile
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {["🧱 SkyBlock Stats", "🏆 Leaderboards", "🌾 Upgrade Advisor", "💎 Market Value"].map((tag) => (
                <div key={tag} className={`rounded-2xl border px-4 py-2 text-sm ${activeTheme.soft}`}>
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[28px] border p-6 ${activeTheme.panel}`}>
            <div className={`text-sm uppercase tracking-[0.3em] ${activeTheme.accentText}`}>{pixelIcons.spark} Style Boost</div>
            <h3 className="mt-2 text-2xl font-bold">Theme + pixel vibe</h3>
            <p className={`mt-3 text-sm leading-6 ${activeTheme.subText}`}>
              This version adds selectable themes and playful pixel-style emoji markers so the site feels more like a game dashboard.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3 text-2xl">
              {["🪙", "🌾", "⛏️", "🎣", "💎", "🏆"].map((emoji) => (
                <div key={emoji} className={`flex h-16 items-center justify-center rounded-2xl border text-3xl shadow-inner ${activeTheme.emojiFrame}`}>
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <div key={card.label} className={`rounded-[28px] border p-5 ${activeTheme.panel}`}>
              <div className="flex items-center justify-between gap-4">
                <div className={`text-sm uppercase tracking-[0.25em] ${activeTheme.faint}`}>{card.label}</div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border text-xl ${activeTheme.emojiFrame}`}>
                  {card.icon}
                </div>
              </div>
              <div className="mt-3 text-3xl font-black">{card.value}</div>
            </div>
          ))}
        </section>

        <section className="mb-8 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className={`rounded-[28px] border p-6 ${activeTheme.panel}`}>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className={`text-sm uppercase tracking-[0.25em] ${activeTheme.faint}`}>{pixelIcons.profile} Player Snapshot</div>
                <h3 className="mt-2 text-2xl font-bold">{player.username} · {player.profile}</h3>
              </div>
              <div className={`rounded-2xl px-4 py-2 text-sm ${activeTheme.accentSoft}`}>Profile loaded</div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[
                ["Purse", player.purse, pixelIcons.money],
                ["Bank", player.bank, "🏦"],
                ["Farming", player.farming, pixelIcons.farming],
                ["Mining", player.mining, pixelIcons.mining],
                ["Fishing", player.fishing, pixelIcons.fishing],
                ["Slayer XP", player.slayerXP, "⚔️"],
                ["Catacombs", player.catacombs, "🕳️"],
              ].map(([k, v, icon]) => (
                <div key={String(k)} className={`rounded-2xl border p-4 ${activeTheme.soft}`}>
                  <div className="flex items-center justify-between gap-3">
                    <div className={`text-sm ${activeTheme.faint}`}>{k}</div>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-2xl border text-lg ${activeTheme.emojiFrame}`}>
                      {icon}
                    </div>
                  </div>
                  <div className="mt-2 text-2xl font-bold">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[28px] border p-6 ${activeTheme.panel}`}>
            <div className={`text-sm uppercase tracking-[0.25em] ${activeTheme.faint}`}>{pixelIcons.rank} Leaderboard Positions</div>
            <h3 className="mt-2 text-2xl font-bold">Current ranking</h3>
            <div className="mt-5 space-y-3">
              {leaderboard.map((row) => (
                <div key={row.label} className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${activeTheme.soft}`}>
                  <div className="flex items-center gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${activeTheme.emojiFrame}`}>
                      {row.icon}
                    </div>
                    <div>
                      <div className={`text-sm ${activeTheme.faint}`}>{row.label}</div>
                      <div className="font-semibold">{row.value}</div>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/5 px-3 py-1 text-sm text-zinc-300">#{row.rank}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`mb-8 rounded-[28px] border p-6 ${activeTheme.panel}`}>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <div className={`text-sm uppercase tracking-[0.25em] ${activeTheme.faint}`}>{pixelIcons.collection} Collections</div>
              <h3 className="mt-2 text-2xl font-bold">Progress overview</h3>
            </div>
            <div className={`text-sm ${activeTheme.faint}`}>Prototype view</div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {collections.map((item) => (
              <div key={item.name} className={`rounded-2xl border p-4 ${activeTheme.soft}`}>
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-2 font-medium">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-xl border text-lg ${activeTheme.emojiFrame}`}>
                      {item.icon}
                    </span>
                    {item.name}
                  </span>
                  <span className={`text-sm ${activeTheme.faint}`}>{item.progress}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div className={`h-full rounded-full ${activeTheme.progress}`} style={{ width: `${item.progress}%` }} />
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
                  <div key={upgrade.name} className={`rounded-2xl border p-4 ${activeTheme.soft}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-3">
                        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-xl ${activeTheme.emojiFrame}`}>
                          {upgrade.icon}
                        </div>
                        <div>
                          <div className="font-semibold">{upgrade.name}</div>
                          <div className={`mt-1 text-sm ${activeTheme.faint}`}>{upgrade.reason}</div>
                        </div>
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
