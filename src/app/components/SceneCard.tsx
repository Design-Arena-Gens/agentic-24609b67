"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export type Scene = {
  id: string;
  title: string;
  visual: string;
  dissolve: string;
  cut: string;
  voice: string;
  beats: string[];
};

export function SceneCard({ scene }: { scene: Scene }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 1.4, ease: [0.16, 0.84, 0.44, 1] }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_0_120px_rgba(77,28,131,0.32)] backdrop-blur-md"
    >
      <div className="absolute -right-20 -top-32 h-72 w-72 rounded-full bg-gradient-to-br from-mist/40 via-transparent to-transparent blur-[120px]" />
      <header className="flex flex-col gap-2 pb-4">
        <span className="text-sm uppercase tracking-[0.3em] text-white/40">Сцена {scene.id}</span>
        <h2 className="text-3xl font-semibold text-white">{scene.title}</h2>
      </header>
      <section className="grid gap-4 text-sm leading-relaxed text-white/70 lg:grid-cols-2">
        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-[0.25em] text-white/50">Визуал</h3>
          <p className="rounded-xl border border-white/10 bg-black/30 p-4 text-white/70">{scene.visual}</p>
        </div>
        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-[0.25em] text-white/50">Голос</h3>
          <p className="rounded-xl border border-white/10 bg-black/30 p-4 text-white/70">{scene.voice}</p>
        </div>
      </section>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-ember/20 bg-ember/5 p-5 text-sm">
          <h4 className="mb-2 text-xs uppercase tracking-[0.3em] text-ember/80">Dissolve — туман</h4>
          <p className="text-white/80">{scene.dissolve}</p>
        </div>
        <div className="rounded-xl border border-mist/20 bg-mist/10 p-5 text-sm">
          <h4 className="mb-2 text-xs uppercase tracking-[0.3em] text-mist/80">Cut — вспышка</h4>
          <p className="text-white/80">{scene.cut}</p>
        </div>
      </div>
      <ul className="mt-6 space-y-2 text-sm text-white/70">
        {scene.beats.map((beat, idx) => (
          <li key={`${scene.id}-beat-${idx}`} className="flex items-start gap-3 rounded-lg border border-white/10 bg-black/25 p-3">
            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-ember/70 shadow-[0_0_12px_rgba(199,125,255,0.7)]" />
            <p>{beat}</p>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
