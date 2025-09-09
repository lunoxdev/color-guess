import { Howl } from "howler";

const sounds: Record<string, Howl> = {
  bgSound: new Howl({
    src: ["/assets/audio/bg-sound.mp3"],
    loop: true,
    volume: 1,
    autoplay: true,
  }),
  start: new Howl({
    src: ["/assets/audio/start-game.mp3"],
    loop: false,
    volume: 1,
  }),
  selection: new Howl({
    src: ["/assets/audio/selection-sound.mp3"],
    loop: false,
    volume: 1,
  }),
};

// Funtions to interact with audios
export const playSound = (name: keyof typeof sounds) => {
  sounds[name]?.play();
};

export const stopSound = (name: keyof typeof sounds) => {
  sounds[name]?.stop();
};

export const setVolume = (name: keyof typeof sounds, volume: number) => {
  sounds[name]?.volume(volume);
};

export default sounds;
