'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  username: string;
};

type Status = 'loading' | 'ready' | 'error';

export function SkinViewerPanel({ username }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    let viewer: any;
    let disposed = false;

    async function load() {
      if (!ref.current) return;

      setStatus('loading');
      ref.current.innerHTML = '';

      try {
        const skinview3d = await import('skinview3d');

        if (disposed) return;

        viewer = new skinview3d.SkinViewer({
          width: 300,
          height: 400,
          skin: `https://mc-heads.net/skin/${username}`,
        });

        ref.current.appendChild(viewer.canvas);

        viewer.zoom = 0.8;
        viewer.fov = 50;
        viewer.autoRotate = true;
        viewer.autoRotateSpeed = 0.7;
        viewer.animation = new skinview3d.WalkingAnimation();

        setStatus('ready');
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    }

    load();

    return () => {
      disposed = true;
      if (viewer) viewer.dispose();
    };
  }, [username]);

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900 p-5">
      <div className="mb-4 text-sm uppercase tracking-widest text-zinc-500">
        3D Skin
      </div>

      <div className="relative flex min-h-[400px] items-center justify-center rounded-xl border border-white/10 bg-zinc-800">
        <div ref={ref} />

        {status !== 'ready' && (
          <div className="absolute text-sm text-zinc-400">
            {status === 'error'
              ? 'Failed to load skin'
              : 'Loading...'}
          </div>
        )}
      </div>
    </div>
  );
}