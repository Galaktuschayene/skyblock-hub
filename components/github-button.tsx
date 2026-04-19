export function GitHubButton() {
  return (
    <a
      href="https://github.com/Galaktuschayene/skyblock-hub"
      target="_blank"
      rel="noreferrer"
      className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
    >
      <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white/10 transition-all duration-1000 group-hover:-translate-x-40" />
      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.2.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.2 1.9 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6A4.7 4.7 0 0 1 5.5 8c-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.3 11.3 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1a4.7 4.7 0 0 1 1.3 3.3c0 4.7-2.8 5.7-5.5 6 .4.3.8 1 .8 2v3c0 .4.2.7.8.6A12 12 0 0 0 12 .5Z" />
      </svg>
      <span>GitHub</span>
    </a>
  );
}