import { useEffect, useRef } from "react";
import type { GameState } from "../types";
import { Application, extend } from "@pixi/react";
import { Graphics, Text } from "pixi.js";
import PixiContent from "./PixiContent"
import { playSound } from "../utils/sounds";

extend({ Graphics, Text });

type Props = {
  gameState: GameState;
  setIsPixiReady: (ready: boolean) => void;
};

const PixiCanvas = ({ gameState, setIsPixiReady }: Props) => {
  const pixiContainer = useRef<HTMLDivElement>(null);
  const targetStar = useRef<Graphics | null>(null);
  const feedbackText = useRef<Text | null>(null);

  // Init PixiJS
  useEffect(() => {
    playSound("bgSound")
    setIsPixiReady(true);
  }, [setIsPixiReady]);

  return (
    <section className="relative">
      {/* Shadow Gradient */}
      <div
        className={`absolute -inset-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 blur-md ${gameState.isGameActive ? "animate-pulse brightness-125" : "opacity-50"
          }`}
      />

      {/* Pixi Container */}
      <div
        ref={pixiContainer}
        className="relative flex items-center justify-center bg-slate-900 text-slate-300 w-full h-full"
      >
        {pixiContainer.current && (
          <Application
            width={window.innerWidth <= 932 ? 330 : 400}
            height={window.innerWidth <= 932 ? 180 : 300}
            backgroundColor={0x0a0a1f}
            antialias={true}
            resizeTo={pixiContainer.current}
          >
            <PixiContent
              gameState={gameState}
              targetStar={targetStar}
              feedbackText={feedbackText}
            />
          </Application>
        )}
      </div>
    </section>
  );
};

export default PixiCanvas;
