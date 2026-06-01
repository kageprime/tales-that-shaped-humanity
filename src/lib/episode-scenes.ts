export interface SceneReflection {
  prompt: string;
}

export interface SceneParticles {
  type: "motes" | "fireflies" | "dust" | "embers" | "leaves" | "stars" | "none";
  count: number;
  colors: string[];
  speed: number;
  opacity: number;
}

export interface SceneDecoration {
  type: "leaves" | "thorns" | "light-rays" | "scales" | "veil" | "gate" | "stars" | "void";
  opacity: number;
}

export interface ScenePalette {
  background: string;
  videoUrl?: string;
  particles?: SceneParticles;
  decoration?: SceneDecoration;
  reflection?: SceneReflection;
}

export interface EpisodeScenes {
  slug: string;
  model: "cosmic" | "garden";
  scenes: ScenePalette[];
}

export const episodeScenes: EpisodeScenes[] = [
  {
    slug: "e1-before-the-beginning",
    model: "cosmic",
    scenes: [
      {
        background: "radial-gradient(ellipse at center, #0a0a12 0%, #050508 100%)",
        videoUrl: "https://cdn.free-stock.video/1982021/rain-fog-landscape-forest-nature-forest-tree-64910-full.mp4",
        decoration: { type: "void", opacity: 1 },
        reflection: { prompt: "Before words, before light — there was stillness. When was the last time you sat in true silence?" },
      },
      {
        background: "radial-gradient(ellipse at center, #0f0d1a 0%, #08070e 100%)",
        particles: { type: "dust", count: 30, colors: ["#8B7EC8", "#6B5FA8"], speed: 0.15, opacity: 0.3 },
        reflection: { prompt: "Mystery is the birthplace of wonder. How do you sit with questions that have no easy answers?" },
      },
      {
        background: "radial-gradient(ellipse at center, #120f1a 0%, #0a0812 100%)",
        particles: { type: "dust", count: 50, colors: ["#7B6EB8", "#5A4E98"], speed: 0.25, opacity: 0.25 },
        reflection: { prompt: "\"Tohu vavohu\" — formless and void. Where in your life right now feels like waiting for form?" },
      },
      {
        background: "radial-gradient(ellipse at center, #1a1533 0%, #0e0c1f 100%)",
        particles: { type: "motes", count: 40, colors: ["#B8A8E8", "#D4A853"], speed: 0.2, opacity: 0.35 },
        decoration: { type: "veil", opacity: 0.15 },
        reflection: { prompt: "The Spirit hovers — not fixing, not forcing. What would it mean to let yourself be hovered over today?" },
      },
      {
        background: "radial-gradient(ellipse at center, #2a1f0a 0%, #0f0b04 100%)",
        particles: { type: "motes", count: 60, colors: ["#FFD700", "#FFA500", "#FFF8DC"], speed: 0.3, opacity: 0.5 },
        decoration: { type: "light-rays", opacity: 0.2 },
        reflection: { prompt: "\"Let there be light.\" What needs light spoken into it in your life today?" },
      },
      {
        background: "radial-gradient(ellipse at center, #0f2a1a 0%, #08150e 100%)",
        particles: { type: "stars", count: 45, colors: ["#87CEEB", "#98D8C8", "#D4A853"], speed: 0.15, opacity: 0.4 },
        reflection: { prompt: "God called it \"good.\" What if you could hear that word spoken over your own life?" },
      },
      {
        background: "radial-gradient(ellipse at center, #2a1f0f 0%, #140f08 100%)",
        particles: { type: "motes", count: 50, colors: ["#D4A853", "#FFD700", "#FFF8DC"], speed: 0.2, opacity: 0.45 },
        decoration: { type: "stars", opacity: 0.1 },
        reflection: { prompt: "You bear the image of the Creator. What does that change about how you see yourself?" },
      },
      {
        background: "radial-gradient(ellipse at center, #2a1a0a 0%, #1a0f05 100%)",
        particles: { type: "dust", count: 35, colors: ["#C4A35A", "#8B6914"], speed: 0.1, opacity: 0.3 },
        reflection: { prompt: "God's breath in your lungs. Right now. Take a breath and feel it — holy animation." },
      },
      {
        background: "radial-gradient(ellipse at center, #1a1a0f 0%, #0f0f08 100%)",
        particles: { type: "motes", count: 25, colors: ["#D4C5A0", "#C4B090"], speed: 0.08, opacity: 0.25 },
        reflection: { prompt: "Rest is not the pause between work. Rest is the point. What would it take to truly rest?" },
      },
      {
        background: "radial-gradient(ellipse at center, #0f1a2a 0%, #080e15 100%)",
        particles: { type: "stars", count: 55, colors: ["#B0C4DE", "#D4A853", "#FFD700"], speed: 0.12, opacity: 0.4 },
        reflection: { prompt: "The world is not an accident. You are not a cosmic afterthought. How does that change your story?" },
      },
      {
        background: "radial-gradient(ellipse at center, #0a0a12 0%, #050508 100%)",
        particles: { type: "dust", count: 20, colors: ["#8B7EC8", "#6B5FA8"], speed: 0.05, opacity: 0.2 },
        reflection: { prompt: "\"Let there be light\" is still being spoken over your chaos. Can you hear it?" },
      },
      {
        background: "radial-gradient(ellipse at center, #050508 0%, #020204 100%)",
        reflection: { prompt: "In the beginning — and even now — there is grace. How will you carry that forward?" },
      },
    ],
  },
  {
    slug: "e2-the-garden-and-the-voice",
    model: "garden",
    scenes: [
      {
        background: "radial-gradient(ellipse at center, #2D4A22 0%, #1A2E1A 70%, #0f1a0f 100%)",
        videoUrl: "https://assets.mixkit.co/videos/5022/5022-full.mp4",
        particles: { type: "motes", count: 40, colors: ["#A8D5A2", "#FFD700", "#87CEEB"], speed: 0.2, opacity: 0.4 },
        decoration: { type: "leaves", opacity: 0.12 },
        reflection: { prompt: "God planted a garden, not a fortress. What kind of space is God cultivating in your life?" },
      },
      {
        background: "radial-gradient(ellipse at center, #3A5A2A 0%, #2A4A1A 70%, #1A2E1A 100%)",
        videoUrl: "https://assets.mixkit.co/videos/5022/5022-full.mp4",
        particles: { type: "motes", count: 35, colors: ["#D4A853", "#C4A35A", "#FFD700"], speed: 0.15, opacity: 0.35 },
        reflection: { prompt: "Boundaries given in love — not walls, but words. What boundaries in your life might actually be signs of love?" },
      },
      {
        background: "radial-gradient(ellipse at center, #2A3A1A 0%, #1A2A10 60%, #0f1508 100%)",
        particles: { type: "dust", count: 30, colors: ["#5A4A3A", "#4A3A2A"], speed: 0.1, opacity: 0.25 },
        decoration: { type: "scales", opacity: 0.08 },
        reflection: { prompt: "The serpent questioned, not roared. When have you heard truth twisted just enough to make you doubt God's goodness?" },
      },
      {
        background: "radial-gradient(ellipse at center, #3A3A3A 0%, #2A2A2A 60%, #1A1A1A 100%)",
        particles: { type: "dust", count: 20, colors: ["#6A6A6A", "#5A5A5A"], speed: 0.05, opacity: 0.15 },
        reflection: { prompt: "Fig leaves. Shame-management. What are you using to cover what only grace can clothe?" },
      },
      {
        background: "radial-gradient(ellipse at center, #1A2A3A 0%, #0F1A2A 60%, #080E15 100%)",
        particles: { type: "motes", count: 25, colors: ["#6A8AAA", "#5A7A9A"], speed: 0.12, opacity: 0.25 },
        reflection: { prompt: "\"Where are you?\" — not an accusation, but a father's call. Where are you hiding from Love right now?" },
      },
      {
        background: "radial-gradient(ellipse at center, #3A2A1A 0%, #2A1A0A 60%, #1A0F05 100%)",
        videoUrl: "https://cdn.free-stock.video/1982021/rain-fog-landscape-forest-nature-forest-tree-64910-full.mp4",
        particles: { type: "dust", count: 25, colors: ["#8A6A4A", "#7A5A3A"], speed: 0.15, opacity: 0.25 },
        reflection: { prompt: "\"The woman you gave me.\" When have you blamed God for the very gifts He gave you?" },
      },
      {
        background: "radial-gradient(ellipse at center, #2A1A0A 0%, #1A0F05 60%, #0A0502 100%)",
        videoUrl: "https://cdn.free-stock.video/1982021/rain-fog-landscape-forest-nature-forest-tree-64910-full.mp4",
        particles: { type: "dust", count: 30, colors: ["#6A4A2A", "#5A3A1A"], speed: 0.08, opacity: 0.2 },
        decoration: { type: "thorns", opacity: 0.1 },
        reflection: { prompt: "Even in the curse, a promise was planted: the serpent's head would be bruised. Where do you see hope hiding inside your hardest places?" },
      },
      {
        background: "radial-gradient(ellipse at center, #1A1A2A 0%, #0F0F1A 60%, #05050A 100%)",
        videoUrl: "https://cdn.free-stock.video/1982021/rain-fog-landscape-forest-nature-forest-tree-64910-full.mp4",
        particles: { type: "dust", count: 15, colors: ["#4A4A5A", "#3A3A4A"], speed: 0.06, opacity: 0.15 },
        decoration: { type: "gate", opacity: 0.12 },
        reflection: { prompt: "Exile as protection — mercy in the closing of a door. What closed door might actually be saving you?" },
      },
      {
        background: "radial-gradient(ellipse at center, #0F1A0F 0%, #1A2A1A 40%, #2A3A2A 100%)",
        videoUrl: "https://assets.mixkit.co/videos/5022/5022-full.mp4",
        particles: { type: "motes", count: 20, colors: ["#D4A853", "#C4A35A"], speed: 0.1, opacity: 0.2 },
        reflection: { prompt: "The Tree of Life is not forgotten. The leaves are for the healing of the nations. What hope does that stir in you?" },
      },
      {
        background: "radial-gradient(ellipse at center, #0A0A1A 0%, #0F0F2A 40%, #1A1A3A 100%)",
        videoUrl: "https://assets.mixkit.co/videos/5022/5022-full.mp4",
        particles: { type: "motes", count: 15, colors: ["#D4A853", "#8B7EC8"], speed: 0.08, opacity: 0.15 },
        reflection: { prompt: "The garden is still calling. Will you come out of hiding and let Love clothe you?" },
      },
      {
        background: "radial-gradient(ellipse at center, #05050A 0%, #0A0A0F 100%)",
        reflection: { prompt: "You are still loved, east of Eden. How will you walk forward knowing that?" },
      },
    ],
  },
];

export function getEpisodeScenes(slug: string): ScenePalette[] | undefined {
  const entry = episodeScenes.find((e) => e.slug === slug);
  return entry?.scenes;
}

export function getEpisodeSceneConfig(slug: string): EpisodeScenes | undefined {
  return episodeScenes.find((e) => e.slug === slug);
}
