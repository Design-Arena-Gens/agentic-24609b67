"use client";

import { AmbientAudio } from "./components/AmbientAudio";
import { IgorProfile } from "./components/IgorProfile";
import { Storyboard } from "./components/Storyboard";
import { Subtitles } from "./components/Subtitles";
import { VoiceOverScript } from "./components/VoiceOverScript";

const subtitleLines = [
  { speaker: "VOICE-OVER", text: "(низкий вдох) ... Площадь помнит мой шаг лучше, чем я.", holdMs: 2600 },
  {
    speaker: "ИГОРЬ",
    text: "(сиплый шёпот) Видишь? (пауза) Они всё ещё смотрят. (короткий вдох)",
    holdMs: 3200
  },
  {
    speaker: "VOICE-OVER",
    text: "Фонари мигают фиолетово — каждый всплеск показал мне старые трещины.",
    holdMs: 3600
  },
  {
    speaker: "VOICE-OVER",
    text: "(длинный вдох) Если я отойду, туман вдохнёт моё место.",
    holdMs: 3200,
    cliffhanger: true
  },
  {
    speaker: "ШЁПОТЫ",
    text: "(эхо) Игорь... (вдох) не уходи...",
    holdMs: 2400
  },
  {
    speaker: "ИГОРЬ",
    text: "(кашель) Они не ушли. (пауза) Они выдохнули меня.",
    holdMs: 3500,
    cliffhanger: true
  },
  {
    speaker: "VOICE-OVER",
    text: "Треск радио заклеивает паузы. (сухой вдох) Я слышу, как площадь дышит моей кожей.",
    holdMs: 3100
  },
  {
    speaker: "VOICE-OVER",
    text: "(шёпотом) Последний свет — мой. (пауза) Пока туман не решит иначе.",
    holdMs: 4000,
    cliffhanger: true
  }
];

export default function Page() {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-20 px-6 pb-24 pt-24 sm:px-10">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-10 shadow-[0_0_220px_rgba(87,45,143,0.3)] backdrop-blur-xl">
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-gradient-to-br from-mist/45 via-transparent to-transparent blur-[140px]" />
        <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-gradient-to-br from-ember/35 via-transparent to-transparent blur-[130px]" />
        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.45em] text-white/40">Sora 2 • психологический триллер</span>
            <h1 className="text-5xl font-semibold leading-tight text-white sm:text-6xl">
              Густой туман, размытые силуэты, фиолетовые вспышки шрамов
            </h1>
            <p className="max-w-2xl text-sm text-white/65">
              Монтажный пакет для тихого триллера: dissolve-драпировка тумана, cut-вспышки шрамов, субтитры с эффектом
              стирания и закадровый голос, звучащий из старого радио. Темп медленный, как дыхание площади.
            </p>
          </div>
          <AmbientAudio />
        </div>
      </section>

      <section className="relative flex flex-col gap-10 rounded-3xl border border-white/10 bg-white/[0.02] p-10 shadow-[0_0_160px_rgba(81,30,121,0.25)] backdrop-blur-lg">
        <header>
          <span className="text-xs uppercase tracking-[0.4em] text-white/40">Subtitles</span>
          <h2 className="mt-3 text-3xl text-white">Эффект стирания на клиффхэнгерах</h2>
          <p className="mt-2 text-sm text-white/60">
            Диалоги поданы с паузами, слышимым дыханием и шёпотами. Ключевые реплики исчезают, оставляя туман после
            вспышки.
          </p>
        </header>
        <Subtitles lines={subtitleLines} />
      </section>

      <IgorProfile />
      <Storyboard />
      <VoiceOverScript />
    </main>
  );
}
