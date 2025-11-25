"use client";

import { useEffect, useMemo, useState } from "react";

type SubtitleLine = {
  speaker?: string;
  text: string;
  cliffhanger?: boolean;
  holdMs?: number;
};

type DisplayState = {
  index: number;
  buffer: string;
  typing: boolean;
  erasing: boolean;
};

const DEFAULT_HOLD = 3000;
const TYPE_INTERVAL = 44;
const ERASE_INTERVAL = 65;

const triggerFlashCut = () => {
  if (typeof document === "undefined") return;
  const el = document.getElementById("flash-cut");
  if (!el) return;
  el.classList.remove("active");
  void el.offsetWidth;
  el.classList.add("active");
};

export function Subtitles({ lines }: { lines: SubtitleLine[] }) {
  const [state, setState] = useState<DisplayState>({ index: 0, buffer: "", typing: true, erasing: false });
  const [visible, setVisible] = useState<SubtitleLine[]>([]);

  const currentLine = useMemo(() => lines[state.index] ?? null, [lines, state.index]);

  useEffect(() => {
    if (!currentLine) return;

    if (state.typing) {
      const target = currentLine.text;
      if (state.buffer.length >= target.length) {
        setState((prev) => ({ ...prev, typing: false }));
        return;
      }

      const timeout = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          buffer: target.slice(0, prev.buffer.length + 1)
        }));
      }, TYPE_INTERVAL + Math.random() * 20);

      return () => clearTimeout(timeout);
    }

    if (!state.erasing) {
      const holdDuration = currentLine.holdMs ?? DEFAULT_HOLD;
      const timer = setTimeout(() => {
        if (currentLine.cliffhanger) {
          setState((prev) => ({ ...prev, erasing: true }));
          triggerFlashCut();
        } else {
          commitNextLine(lines, setVisible, setState);
        }
      }, holdDuration);
      return () => clearTimeout(timer);
    }

    if (state.erasing) {
      if (state.buffer.length === 0) {
        commitNextLine(lines, setVisible, setState);
        return;
      }

      const timeout = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          buffer: prev.buffer.slice(0, -1)
        }));
      }, ERASE_INTERVAL);

      return () => clearTimeout(timeout);
    }
  }, [currentLine, lines, state.buffer, state.erasing, state.index, state.typing]);

  useEffect(() => {
    if (!currentLine) return;
    setVisible((prev) => {
      const updated = [...prev, currentLine];
      return updated.slice(-6);
    });
  }, [currentLine]);

  if (!currentLine) {
    return (
      <div className="w-full max-w-4xl rounded-xl border border-white/10 bg-black/40 p-6 text-left text-sm text-white/70">
        Монтаж завершён. Перезапусти страницу, чтобы снова пережить паузу.
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl space-y-4 text-left font-mono text-base text-white/80">
      <div className="space-y-1">
        {currentLine.speaker ? (
          <span className="text-ember/80 block text-xs uppercase tracking-[0.3em]">{currentLine.speaker}</span>
        ) : null}
        <div
          className={`relative overflow-hidden rounded-lg border border-white/15 bg-black/45 px-5 py-4 shadow-[0_0_38px_rgba(88,0,122,0.28)] ${
            currentLine.cliffhanger ? "bg-gradient-to-r from-black/70 via-black/40 to-black/70" : ""
          }`}
        >
          <span
            className={`block min-h-[1.3em] whitespace-pre-line leading-relaxed tracking-wide ${
              currentLine.cliffhanger ? "erasable text-ember/80" : ""
            }`}
          >
            {state.buffer || " "}
          </span>
        </div>
      </div>
      <div className="grid gap-2 text-xs text-white/40">
        {visible.slice(-5).map((item, idx) => (
          <div
            key={`${item.text}-${idx}`}
            className="rounded-md border border-white/5 bg-white/[0.04] px-3 py-2 backdrop-blur-sm"
          >
            {item.speaker ? <span className="mr-2 text-white/50">{item.speaker}:</span> : null}
            <span className="tracking-wide text-white/60">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function commitNextLine(
  lines: SubtitleLine[],
  setVisible: React.Dispatch<React.SetStateAction<SubtitleLine[]>>,
  setState: React.Dispatch<React.SetStateAction<DisplayState>>
) {
  setVisible((prev) => prev.slice(-5));
  setState((prev) => {
    const nextIndex = prev.index + 1;
    if (nextIndex >= lines.length) {
      return { index: nextIndex, buffer: "", typing: false, erasing: false };
    }

    return { index: nextIndex, buffer: "", typing: true, erasing: false };
  });
}
