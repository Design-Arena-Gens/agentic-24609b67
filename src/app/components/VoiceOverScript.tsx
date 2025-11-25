"use client";

import { useMemo } from "react";

type VoiceCue = {
  timecode: string;
  text: string;
  note?: string;
};

const cues: VoiceCue[] = [
  { timecode: "00:00", text: "(низкий вдох) ... (шёпотом) Слышишь, как площадь стонет?", note: "добавить лёгкий радио-шум" },
  { timecode: "00:14", text: "Я оставил здесь тень. (pause 2s) Она до сих пор ходит вместо меня.", note: "длинное эхо 0.6s" },
  { timecode: "00:33", text: "(вдох с сипом) Фонари подмигивают... каждый раз, когда я закрываю глаза.", note: "шёпот панорамировать слева направо" },
  { timecode: "00:52", text: "(почти тише) Они наступают мягко. (выдох) Как мороз на стекле.", note: "прибавить треск радио" },
  { timecode: "01:11", text: "Я слышу их имена. (пауза 3s) Они шепчут, что я им должен.", note: "наложить фоновый хор шёпотов" },
  { timecode: "01:38", text: "(очень тихо) Если я отойду, туман меня проглотит.", note: "добавить лёгкий реверб, затухание 2.5s" },
  { timecode: "02:06", text: "(сухой кашель) Они не ушли. (пауза) Они выдохнули меня.", note: "в этот момент запустить эффект erase" }
];

export function VoiceOverScript() {
  const totalDuration = useMemo(() => "≈02:30", []);

  return (
    <section className="mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-10 shadow-[0_0_120px_rgba(80,35,130,0.28)] backdrop-blur-xl">
      <header className="mb-6 flex flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.35em] text-white/40">Закадровый голос</span>
        <h2 className="text-3xl text-white">Хриплый тембр, старое радио, дыхание между фразами</h2>
        <p className="text-sm text-white/60">Продолжительность дорожки: {totalDuration}</p>
      </header>
      <div className="space-y-3 text-sm text-white/75">
        {cues.map((cue) => (
          <div key={cue.timecode} className="rounded-2xl border border-white/10 bg-black/35 p-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/40">
              <span>{cue.timecode}</span>
              {cue.note ? <span className="text-[0.65rem] text-ember/80">{cue.note}</span> : null}
            </div>
            <p className="mt-2 whitespace-pre-line text-base leading-relaxed text-white/80">{cue.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
