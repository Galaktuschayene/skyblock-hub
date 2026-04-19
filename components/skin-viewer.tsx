'use client';

import { useEffect, useRef } from 'react';

export function SkinViewer({
  skinUrl,
}: {
  skinUrl: string;
}) {
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

  return <div ref={mountRef} className="overflow-hidden rounded-[24px]" />;
}