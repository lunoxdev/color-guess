import { sound } from '@pixi/sound';

sound.add("bgSound", {
  url: "/assets/audio/bg-sound.mp3",
  loop: true,
  volume: 1,
  autoplay: true,
});

sound.add("start", {
  url: "/assets/audio/start-game.mp3",
  loop: false,
  volume: 1,
});

sound.add("selection", {
  url: "/assets/audio/selection-sound.mp3",
  loop: false,
  volume: 1,
});

// Funtions to interact with audios
export const playSound = (name: string) => {
  sound.play(name);
};

export const stopSound = (name: string) => {
  sound.stop(name);
};