import { useRef, useCallback, useEffect } from "react";

type SoundType =
  | "silence"
  | "hum"
  | "wind"
  | "nature"
  | "heartbeat"
  | "music"
  | "cosmic"
  | "gate"
  | "bell"
  | "scales";

interface SoundNode {
  context: AudioContext;
  masterGain: GainNode;
  nodes: AudioNode[];
  intervals: ReturnType<typeof setInterval>[];
}

function classifySound(description: string): SoundType {
  const d = description.toLowerCase();
  if (d.includes("silence") && !d.includes("wind") && !d.includes("music"))
    return "silence";
  if (d.includes("heartbeat") || d.includes("pulse")) return "heartbeat";
  if (d.includes("bell toll") || d.includes("bell")) return "bell";
  if (d.includes("gate closing") || d.includes("gate")) return "gate";
  if (d.includes("scales") || d.includes("dry rustle")) return "scales";
  if (d.includes("music") || d.includes("melody") || d.includes("note"))
    return "music";
  if (d.includes("cosmic") || d.includes("tide") || d.includes("waves"))
    return "cosmic";
  if (
    d.includes("birdsong") ||
    d.includes("leaves") ||
    d.includes("water") ||
    d.includes("garden") ||
    d.includes("nature")
  )
    return "nature";
  if (d.includes("wind") || d.includes("breeze")) return "wind";
  if (d.includes("hum")) return "hum";
  return "wind";
}

function createNoise(
  ctx: AudioContext,
  type: "white" | "brown" | "pink"
): AudioBufferSourceNode {
  const bufferSize = ctx.sampleRate * 4;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  if (type === "white") {
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  } else if (type === "brown") {
    let last = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }
  } else {
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      b3 = 0.8665 * b3 + white * 0.3104856;
      b4 = 0.55 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.016898;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  return source;
}

function createWind(ctx: AudioContext, master: GainNode): AudioNode[] {
  const noise = createNoise(ctx, "brown");
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 400;
  filter.Q.value = 0.5;

  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.value = 0.15;
  lfoGain.gain.value = 150;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  lfo.start();

  noise.connect(filter);
  filter.connect(master);
  noise.start();

  return [noise, filter, lfo, lfoGain];
}

function createHum(ctx: AudioContext, master: GainNode): AudioNode[] {
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 55;

  const osc2 = ctx.createOscillator();
  osc2.type = "sine";
  osc2.frequency.value = 82.5;

  const gain1 = ctx.createGain();
  gain1.gain.value = 0.15;
  const gain2 = ctx.createGain();
  gain2.gain.value = 0.08;

  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.value = 0.05;
  lfoGain.gain.value = 0.05;
  lfo.connect(lfoGain);
  lfoGain.connect(gain1.gain);

  osc.connect(gain1);
  osc2.connect(gain2);
  gain1.connect(master);
  gain2.connect(master);
  osc.start();
  osc2.start();
  lfo.start();

  return [osc, osc2, gain1, gain2, lfo, lfoGain];
}

type IntervalList = ReturnType<typeof setInterval>[];

function createHeartbeat(
  ctx: AudioContext,
  master: GainNode,
  intervals: IntervalList
): AudioNode[] {
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 40;

  const gain = ctx.createGain();
  gain.gain.value = 0;

  osc.connect(gain);
  gain.connect(master);
  osc.start();

  const interval = setInterval(() => {
    const now = ctx.currentTime;
    // Double beat
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
    gain.gain.linearRampToValueAtTime(0, now + 0.15);
    gain.gain.setValueAtTime(0, now + 0.2);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.25);
    gain.gain.linearRampToValueAtTime(0, now + 0.4);
  }, 1200);
  intervals.push(interval);

  return [osc, gain];
}

function createNature(
  ctx: AudioContext,
  master: GainNode,
  intervals: IntervalList
): AudioNode[] {
  // Wind base
  const noise = createNoise(ctx, "pink");
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 2000;

  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.value = 0.1;
  lfoGain.gain.value = 500;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);

  const noiseGain = ctx.createGain();
  noiseGain.gain.value = 0.12;

  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(master);
  noise.start();
  lfo.start();

  // Bird chirps
  const chirpInterval = setInterval(() => {
    if (Math.random() > 0.6) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    const baseFreq = 2000 + Math.random() * 2000;
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.linearRampToValueAtTime(baseFreq * 1.3, now + 0.05);
    osc.frequency.linearRampToValueAtTime(baseFreq * 0.9, now + 0.1);

    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.03, now + 0.02);
    g.gain.linearRampToValueAtTime(0, now + 0.12);

    osc.connect(g);
    g.connect(master);
    osc.start(now);
    osc.stop(now + 0.15);
  }, 800);
  intervals.push(chirpInterval);

  return [noise, filter, lfo, lfoGain, noiseGain];
}

function createMusic(ctx: AudioContext, master: GainNode): AudioNode[] {
  const notes = [220, 277.18, 329.63, 440]; // Am chord tones
  const oscs: AudioNode[] = [];

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;

    const gain = ctx.createGain();
    gain.gain.value = 0.04;

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.08 + i * 0.02;
    lfoGain.gain.value = 0.02;
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);

    osc.connect(gain);
    gain.connect(master);
    osc.start();
    lfo.start();
    oscs.push(osc, gain, lfo, lfoGain);
  });

  return oscs;
}

function createCosmic(ctx: AudioContext, master: GainNode): AudioNode[] {
  const noise = createNoise(ctx, "brown");
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 200;

  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.value = 0.03;
  lfoGain.gain.value = 100;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);

  const gain = ctx.createGain();
  gain.gain.value = 0.2;

  // Deep drone
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 36;
  const oscGain = ctx.createGain();
  oscGain.gain.value = 0.1;

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(master);
  osc.connect(oscGain);
  oscGain.connect(master);

  noise.start();
  osc.start();
  lfo.start();

  return [noise, filter, lfo, lfoGain, gain, osc, oscGain];
}

function createBell(
  ctx: AudioContext,
  master: GainNode,
  intervals: IntervalList
): AudioNode[] {
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 523.25; // C5

  const gain = ctx.createGain();
  gain.gain.value = 0;

  osc.connect(gain);
  gain.connect(master);
  osc.start();

  const interval = setInterval(() => {
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 3);
  }, 4000);
  intervals.push(interval);

  return [osc, gain];
}

function createGate(ctx: AudioContext, master: GainNode): AudioNode[] {
  const noise = createNoise(ctx, "brown");
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 150;

  const gain = ctx.createGain();
  gain.gain.value = 0.15;

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(master);
  noise.start();

  return [noise, filter, gain];
}

function createScales(ctx: AudioContext, master: GainNode): AudioNode[] {
  const noise = createNoise(ctx, "white");
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 3000;
  filter.Q.value = 2;

  const gain = ctx.createGain();
  gain.gain.value = 0.03;

  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.value = 2;
  lfoGain.gain.value = 0.02;
  lfo.connect(lfoGain);
  lfoGain.connect(gain.gain);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(master);
  noise.start();
  lfo.start();

  return [noise, filter, gain, lfo, lfoGain];
}

function createSilence(_ctx: AudioContext, _master: GainNode): AudioNode[] {
  return [];
}

const builders: Record<
  SoundType,
  (ctx: AudioContext, master: GainNode, intervals: IntervalList) => AudioNode[]
> = {
  silence: createSilence,
  hum: createHum,
  wind: createWind,
  nature: createNature,
  heartbeat: createHeartbeat,
  music: createMusic,
  cosmic: createCosmic,
  gate: createGate,
  bell: createBell,
  scales: createScales,
};

const FADE_TIME = 2;

let activeSound: SoundNode | null = null;

function stopActiveSound() {
  if (!activeSound) return;
  const { context, masterGain, nodes, intervals } = activeSound;
  const now = context.currentTime;

  masterGain.gain.cancelScheduledValues(now);
  masterGain.gain.setValueAtTime(masterGain.gain.value, now);
  masterGain.gain.linearRampToValueAtTime(0, now + FADE_TIME);

  const ref = activeSound;
  setTimeout(() => {
    intervals.forEach(clearInterval);
    nodes.forEach((n) => {
      try {
        if (n instanceof OscillatorNode || n instanceof AudioBufferSourceNode)
          n.stop();
        n.disconnect();
      } catch {}
    });
    ref.context.close();
  }, FADE_TIME * 1000 + 200);

  activeSound = null;
}

export function useAmbientSound() {
  const currentTypeRef = useRef<SoundType | null>(null);

  const play = useCallback((soundDescription: string) => {
    const type = classifySound(soundDescription);
    if (type === "silence") {
      stopActiveSound();
      currentTypeRef.current = null;
      return;
    }

    if (currentTypeRef.current === type) return;

    stopActiveSound();
    currentTypeRef.current = type;

    const context = new AudioContext();
    const masterGain = context.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(context.destination);

    const intervals: ReturnType<typeof setInterval>[] = [];
    const nodes = builders[type](context, masterGain, intervals);

    // Fade in
    const now = context.currentTime;
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(1, now + FADE_TIME);

    activeSound = { context, masterGain, nodes, intervals };
  }, []);

  const stop = useCallback(() => {
    stopActiveSound();
    currentTypeRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      stopActiveSound();
      currentTypeRef.current = null;
    };
  }, []);

  return { play, stop };
}
