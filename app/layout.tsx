import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SkyBlock Hub',
  description: 'Hypixel SkyBlock profile viewer',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100 antialiased">{children}</body>
    </html>
  );
}