"use client";

import { useEffect, useRef, useState } from "react";

type LayerRefs = {
  source: AudioScheduledSourceNode;
  gain: GainNode;
  extra?: AudioScheduledSourceNode;
};

export function AmbientAudio() {
  const contextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const humRef = useRef<LayerRefs | null>(null);
  const whisperRef = useRef<LayerRefs | null>(null);
  const windRef = useRef<LayerRefs | null>(null);
  const [active, setActive] = useState(false);
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const buildContext = () => {
    if (contextRef.current) return contextRef.current;
    const ctx = new AudioContext();
    contextRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0.23;
    master.connect(ctx.destination);
    masterGainRef.current = master;

    return ctx;
  };

  const createHum = (ctx: AudioContext) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 38;

    const mod = ctx.createOscillator();
    mod.type = "sine";
    mod.frequency.value = 0.18;

    const modGain = ctx.createGain();
    modGain.gain.value = 8;
    mod.connect(modGain);

    const gain = ctx.createGain();
    gain.gain.value = 0.22;

    modGain.connect(osc.frequency);
    osc.connect(gain);

    return { source: osc, gain, extra: mod };
  };

  const createWind = (ctx: AudioContext) => {
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i += 1) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 400;
    filter.Q.value = 0.6;

    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.05;

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 140;

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const gain = ctx.createGain();
    gain.gain.value = 0.14;

    noise.connect(filter);
    filter.connect(gain);

    return { source: noise, gain, lfo };
  };

  const createWhispers = (ctx: AudioContext) => {
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i += 1) {
      output[i] = (Math.random() * 2 - 1) * (i / bufferSize) * 0.6;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    source.playbackRate.value = 0.35;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 1100;
    bandpass.Q.value = 15;

    const delay = ctx.createDelay();
    delay.delayTime.value = 0.38;

    const feedback = ctx.createGain();
    feedback.gain.value = 0.55;

    const gain = ctx.createGain();
    gain.gain.value = 0.12;

    delay.connect(feedback);
    feedback.connect(delay);

    source.connect(bandpass);
    bandpass.connect(delay);
    delay.connect(gain);

    return { source, gain };
  };

  const startAudio = async () => {
    const ctx = buildContext();
    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    if (!initialised) {
      const master = masterGainRef.current;
      if (!master) return;

      const hum = createHum(ctx);
      const wind = createWind(ctx);
      const whispers = createWhispers(ctx);

      hum.gain.connect(master);
      wind.gain.connect(master);
      whispers.gain.connect(master);

      hum.source.start(0);
      if (hum.extra) {
        (hum.extra as OscillatorNode).start(0);
      }
      wind.source.start(0);
      wind.lfo.start(0);
      whispers.source.start(0);

      humRef.current = hum;
      whisperRef.current = whispers;
      windRef.current = { source: wind.source, gain: wind.gain, extra: wind.lfo };

      setInitialised(true);
    }

    setActive(true);
  };

  const stopAudio = () => {
    const ctx = contextRef.current;
    if (!ctx) return;
    humRef.current?.source.stop();
    if (humRef.current?.extra) {
      (humRef.current.extra as OscillatorNode).stop();
    }
    whisperRef.current?.source.stop();
    windRef.current?.source.stop();
    if (windRef.current?.extra) {
      (windRef.current.extra as OscillatorNode).stop();
    }
    ctx.close();
    contextRef.current = null;
    humRef.current = null;
    whisperRef.current = null;
    windRef.current = null;
    masterGainRef.current = null;
    setActive(false);
    setInitialised(false);
  };

  return (
    <div className="relative z-20 mt-8 flex w-full flex-col items-start gap-3 text-left text-sm">
      <button
        type="button"
        onClick={active ? stopAudio : startAudio}
        className="rounded-full border border-white/30 bg-white/5 px-6 py-3 font-medium tracking-[0.2em] text-white/80 transition hover:bg-white/10 hover:text-white"
      >
        {active ? "Гул включён — остановить" : "Запустить гул и шёпоты"}
      </button>
      <p className="text-white/50">
        {active
          ? "Слышен низкий гул, эхом обрываются голосовые фантомы, порыв ветра шлифует кромку кадра."
          : "Нажми, чтобы впустить низкий гул, шёпоты и далёкий ветер прямо в монтаж."}
      </p>
    </div>
  );
}
