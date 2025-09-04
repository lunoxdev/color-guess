import { useEffect, useRef, useState } from "react";
import { Application, Graphics, Text } from "pixi.js";
import { type GameState } from "./types";

const colors = [
  { name: "Red", hex: "#ff0000" },
  { name: "Green", hex: "#00ff00" },
  { name: "Blue", hex: "#0000ff" },
  { name: "Yellow", hex: "#ffff00" },
  { name: "Purple", hex: "#ff00ff" },
  { name: "Orange", hex: "#ff8000" },
];

const App = () => {
  const pixiContainer = useRef<HTMLDivElement>(null);
  const pixiApp = useRef<Application | null>(null);
  const targetStar = useRef<Graphics | null>(null);
  const feedbackText = useRef<Text | null>(null);
  const [isPixiReady, setIsPixiReady] = useState<boolean>(false);

  // TODO: Use Zustand
  const [gameState, setGameState] = useState<GameState>({
    targetColor: "",
    score: 0,
    feedback: "Create a new game",
    isGameActive: false,
  });

  // Init PixiJS
  useEffect(() => {
    if (!pixiContainer.current || pixiApp.current) return;

    const initPixi = async () => {
      try {
        const app = new Application();

        globalThis.__PIXI_APP__ = app; // Pixi Devtools

        // Resize canvas height on mobile
        const isMobile = window.innerWidth <= 932;
        const canvasWeight = isMobile ? 330 : 400;
        const canvasHeight = isMobile ? 180 : 300;

        await app.init({
          width: canvasWeight,
          height: canvasHeight,
          backgroundColor: 0x1a1a2e,
          antialias: true,
        });

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

        // Pixi text instance
        const feedback = new Text({
          text: "Create a new game",
          style: {
            fontFamily: "Arial",
            fontSize: 18,
            fill: 0xffffff,
            align: "center",
          },
        });

        const feedbackOffsetY = isMobile ? 60 : 80;

        feedback.anchor.set(0.5);
        feedback.x = app.screen.width / 2;
        feedback.y = app.screen.height / 2 + feedbackOffsetY;

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
        pixiApp.current.destroy(true); // Good practice based on doc
        pixiApp.current = null;
      }
    };
  }, []);

  // Update star color
  useEffect(() => {
    if (!isPixiReady || !targetStar.current || !feedbackText.current) return;

    const star = targetStar.current;
    star.clear();
    star.star(0, 0, 5, 50); // Re-draw the star

    if (gameState.isGameActive) {
      const colorObj = colors.find((c) => c.name === gameState.targetColor);
      star.fill(colorObj?.hex ?? 0x666666);
    } else {
      star.fill(0x666666);
    }

    // Update Pixi feedback text
    feedbackText.current.text = gameState.feedback;
  }, [gameState, isPixiReady]);

  // Handle to start the game
  const startNewGame = (): void => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setGameState({
      targetColor: randomColor.name,
      score: 0,
      feedback: `What color is the star?`,
      isGameActive: true,
    });
  };

  // Handle colors guess and feedback text
  const handleColorGuess = (guessedColor: string): void => {
    if (!gameState.isGameActive) return;

    const isCorrect = guessedColor === gameState.targetColor;
    const newScore = isCorrect ? gameState.score + 1 : gameState.score;

    if (isCorrect) {
      setGameState((prev) => ({
        ...prev,
        score: newScore,
        feedback: `Correct! It was ${guessedColor}. Score: ${newScore}`,
      }));

      setTimeout(() => {
        const nextColor = colors[Math.floor(Math.random() * colors.length)];

        setGameState((prev) => ({
          ...prev,
          targetColor: nextColor.name,
          feedback: `What color is the star?`,
        }));
      }, 1500);
    } else {
      setGameState((prev) => ({
        ...prev,
        feedback: `Incorrect! It was ${prev.targetColor}. Your final score: ${newScore}`,
        isGameActive: false,
      }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto p-5 bg-[#0a0a1f] h-screen w-screen">
      {!isPixiReady && <p>Loading game...</p>}

      <div className="relative">
        <div
          className={`absolute -inset-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 blur-md ${
            gameState.isGameActive
              ? "animate-pulse brightness-125"
              : "animate-none opacity-50"
          }`}
        />
        <div
          ref={pixiContainer}
          className={`relative flex items-center justify-center bg-slate-900 text-slate-300 ${
            isPixiReady ? "block" : "none"
          }`}
        />
      </div>

      <div>
        <button
          onClick={startNewGame}
          className={`text-sm lg:text-base py-2 lg:py-3 px-5 my-5 lg:my-6 rounded-lg mr-5 font-bold bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-700 ${
            gameState.isGameActive
              ? "opacity-60 cursor-not-allowed"
              : "hover:brightness-125 cursor-pointer"
          }`}
          disabled={gameState.isGameActive || !isPixiReady}
        >
          {gameState.isGameActive ? "Playing..." : "New Game"}
        </button>

        <span className="font-bold">Score: {gameState.score}</span>
      </div>

      <div className="grid grid-cols-3 gap-3 w-[330px] lg:w-[400px]">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => handleColorGuess(color.name)}
            disabled={!gameState.isGameActive || !isPixiReady}
            className={`px-2 py-1 lg:py-3 rounded-lg border border-dashed border-purple-700 hover:bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 transition-all duration-300 ${
              gameState.isGameActive
                ? "brightness-125 cursor-pointer"
                : "opacity-70 text-white/70 cursor-not-allowed"
            }`}
          >
            {color.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
