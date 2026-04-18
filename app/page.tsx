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

  const cheapUpgrades = {
    farming: [
      { name: "Lotus Equipment Upgrade", cost: "8.5M", impact: "+Farming Fortune", reason: "Best low-cost fortune gain" },
      { name: "Crop-Specific Tool Reforge", cost: "3.2M", impact: "+Crop Efficiency", reason: "Cheap boost for contests" },
      { name: "Pet Item Upgrade", cost: "14M", impact: "+Pet Performance", reason: "Good value before major gear swap" },
    ],
    mining: [
      { name: "Artifact of Power Tuning", cost: "6.8M", impact: "+Mining Stats", reason: "Low cost stat improvement" },
      { name: "Gemstone Slot Unlock", cost: "18M", impact: "+Pristine / Fortune", reason: "Efficient step before new drill" },
      { name: "HotM Utility Upgrade", cost: "2.9M", impact: "+Progression", reason: "Very cheap improvement" },
    ],
    fishing: [
      { name: "Rod Enchant Package", cost: "4.4M", impact: "+Fishing Speed", reason: "Cheap and immediate" },
      { name: "Pet Level Upgrade", cost: "11M", impact: "+Sea Creature Chance", reason: "Strong value per coin" },
      { name: "Armor Piece Swap", cost: "16M", impact: "+Fishing Stats", reason: "Good midgame upgrade" },
    ],
  };

  const leaderboard = [
    { rank: 1, label: "Net Worth", value: "#1,284" },
    { rank: 2, label: "Skill Average", value: "#2,019" },
    { rank: 3, label: "Farming", value: "#742" },
    { rank: 4, label: "Mining", value: "#1,106" },
    { rank: 5, label: "Fishing", value: "#3,488" },
  ];

  const collections = [
    { name: "Wheat", progress: 94 },
    { name: "Cobblestone", progress: 88 },
    { name: "Mithril", progress: 72 },
    { name: "Diamond", progress: 84 },
    { name: "Raw Fish", progress: 61 },
    { name: "Pumpkin", progress: 97 },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-lime-400">SkyBlock Hub</div>
            <h1 className="text-2xl font-bold tracking-tight">Hypixel SkyBlock Progression Dashboard</h1>
          </div>
          <div className="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 md:block">
            Built for profile stats, market-aware upgrades, and leaderboards
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <section className="mb-8 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-lime-500/15 via-emerald-500/10 to-cyan-500/10 p-6 shadow-2xl shadow-black/20">
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.3em] text-lime-300">Search Player</div>
                <h2 className="mt-2 text-4xl font-black tracking-tight">Find any SkyBlock profile</h2>
                <p className="mt-3 max-w-2xl text-zinc-300">
                  View net worth, skills, collections, rankings, and the cheapest next upgrades for farming, mining, and fishing.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3 md:flex-row">
              <input
                defaultValue="Technoblade"
                className="h-14 flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 text-base outline-none ring-0 placeholder:text-zinc-500"
                placeholder="Enter Minecraft username"
              />
              <button className="h-14 rounded-2xl bg-lime-400 px-6 font-semibold text-zinc-950 transition hover:scale-[1.01]">
                Search Profile
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">Why this site</div>
            <h3 className="mt-2 text-2xl font-bold">Not just stats</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              This project is designed to tell players what they should upgrade next, not only show raw profile data.
            </p>
            <div className="mt-5 grid gap-3 text-sm">
              {[
                "Player overview",
                "Net worth tracking",
                "Collections progress",
                "Leaderboards",
                "Cheapest upgrades",
                "Premium dashboard UI",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-zinc-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Net Worth", value: player.netWorth },
            { label: "SkyBlock Level", value: player.skyblockLevel },
            { label: "Skill Average", value: player.skillAverage },
            { label: "Museum Value", value: player.museumValue },
          ].map((card) => (
            <div key={card.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm uppercase tracking-[0.25em] text-zinc-400">{card.label}</div>
              <div className="mt-3 text-3xl font-black">{card.value}</div>
            </div>
          ))}
        </section>

        <section className="mb-8 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.25em] text-zinc-400">Player Snapshot</div>
                <h3 className="mt-2 text-2xl font-bold">{player.username} · {player.profile}</h3>
              </div>
              <div className="rounded-2xl bg-lime-400/15 px-4 py-2 text-sm text-lime-300">Profile loaded</div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[
                ["Purse", player.purse],
                ["Bank", player.bank],
                ["Farming", player.farming],
                ["Mining", player.mining],
                ["Fishing", player.fishing],
                ["Slayer XP", player.slayerXP],
                ["Catacombs", player.catacombs],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-sm text-zinc-400">{k}</div>
                  <div className="mt-2 text-2xl font-bold">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm uppercase tracking-[0.25em] text-zinc-400">Leaderboard Positions</div>
            <h3 className="mt-2 text-2xl font-bold">Current ranking</h3>
            <div className="mt-5 space-y-3">
              {leaderboard.map((row) => (
                <div key={row.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <div>
                    <div className="text-sm text-zinc-400">{row.label}</div>
                    <div className="font-semibold">{row.value}</div>
                  </div>
                  <div className="rounded-xl bg-white/5 px-3 py-1 text-sm text-zinc-300">#{row.rank}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-zinc-400">Collections</div>
              <h3 className="mt-2 text-2xl font-bold">Progress overview</h3>
            </div>
            <div className="text-sm text-zinc-400">Prototype view</div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {collections.map((item) => (
              <div key={item.name} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-sm text-zinc-400">{item.progress}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-lime-400" style={{ width: `${item.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
          {Object.entries(cheapUpgrades).map(([category, upgrades]) => (
            <div key={category} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm uppercase tracking-[0.25em] text-zinc-400">{category}</div>
              <h3 className="mt-2 text-2xl font-bold capitalize">Cheapest upgrades</h3>
              <div className="mt-5 space-y-4">
                {upgrades.map((upgrade) => (
                  <div key={upgrade.name} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-semibold">{upgrade.name}</div>
                        <div className="mt-1 text-sm text-zinc-400">{upgrade.reason}</div>
                      </div>
                      <div className="rounded-xl bg-lime-400/15 px-3 py-1 text-sm text-lime-300">{upgrade.cost}</div>
                    </div>
                    <div className="mt-3 text-sm text-cyan-300">{upgrade.impact}</div>
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
