import { useEffect, useRef } from "react";
import { Application, Graphics, Text, Ticker } from "pixi.js";
import type { GameState } from "../types";
import { colors } from "../utils/colors";

type Props = {
  gameState: GameState;
  setIsPixiReady: (ready: boolean) => void;
};

const PixiCanvas = ({ gameState, setIsPixiReady }: Props) => {
  const pixiContainer = useRef<HTMLDivElement>(null);
  const pixiApp = useRef<Application | null>(null);
  const targetStar = useRef<Graphics | null>(null);
  const feedbackText = useRef<Text | null>(null);

  // Init PixiJS
  useEffect(() => {
    if (!pixiContainer.current || pixiApp.current) return;

    const initPixi = async () => {
      try {
        const app = new Application();
        globalThis.__PIXI_APP__ = app; // Pixi Devtools

        // Resize base on window
        const isMobile = window.innerWidth <= 932;
        const canvasWeight = isMobile ? 330 : 400;
        const canvasHeight = isMobile ? 180 : 300;

        await app.init({
          width: canvasWeight,
          height: canvasHeight,
          backgroundColor: 0x0a0a1f,
          antialias: true,
        });

        pixiApp.current = app;

        if (pixiContainer.current) {
          pixiContainer.current.innerHTML = "";
          pixiContainer.current.appendChild(app.canvas);
        }

        // Star graphics instance
        const star = new Graphics();
        star.star(0, 0, 5, 50);
        star.fill(0x666666);
        star.x = app.screen.width / 2;
        star.y = app.screen.height / 2;

        targetStar.current = star;
        app.stage.addChild(star);

        // Feedback text instance
        const feedback = new Text({
          text: "Create a new game",
          style: { fontFamily: "Arial", fontSize: 18, fill: 0xffffff },
        });

        const offsetY = isMobile ? 60 : 80;
        feedback.anchor.set(0.5);
        feedback.x = app.screen.width / 2;
        feedback.y = app.screen.height / 2 + offsetY;

        feedbackText.current = feedback;
        app.stage.addChild(feedback);

        setIsPixiReady(true);
      } catch (error) {
        console.error("Error initializing PixiJS:", error);
      }
    };

    initPixi();

    return () => {
      if (pixiApp.current) {
        pixiApp.current.destroy(true); // Good practice based on docs
        pixiApp.current = null;
      }
    };
  }, [setIsPixiReady]);

  // Update graphics when game state changes
  useEffect(() => {
    if (!targetStar.current || !feedbackText.current || !pixiApp.current)
      return;

    const star = targetStar.current;
    const app = pixiApp.current;
    const feedback = feedbackText.current;

    // Re draw the star
    star.clear();
    star.star(0, 0, 5, 50);

    if (gameState.isGameActive) {
      const colorObj = colors.find((c) => c.name === gameState.targetColor);
      star.fill(colorObj?.hex ?? 0x666666);
    } else {
      star.fill(0x666666);
    }

    feedback.text = gameState.feedback;

    // Animate the start if the response contain "Correct!"
    if (gameState.feedback.startsWith("Correct!")) {
      const rotate = (ticker: Ticker) => {
        star.rotation += 0.05 * ticker.deltaTime;
      };

      app.ticker.add(rotate);

      const timeout = setTimeout(() => {
        app.ticker.remove(rotate);
        star.rotation = 0;
      }, 1500);

      return () => {
        clearTimeout(timeout);
        app.ticker.remove(rotate);
      };
    }
  }, [gameState]);

  return (
    <section className="relative">
      {/* Shadow Gradient */}
      <div
        className={`absolute -inset-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 blur-md ${
          gameState.isGameActive ? "animate-pulse brightness-125" : "opacity-50"
        }`}
      />

      {/* Pixi Container */}
      <div
        ref={pixiContainer}
        className="relative flex items-center justify-center bg-slate-900 text-slate-300"
      />
    </section>
  );
};

export default PixiCanvas;
