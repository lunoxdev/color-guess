import { useState } from "react";
import PixiCanvas from "./components/PixiCanvas";
import GameControls from "./components/GameControls";
import ColorButtons from "./components/ColorButtons";
import { colors } from "./utils/colors";
import type { GameState } from "./types";

const App = () => {
  const [gameState, setGameState] = useState<GameState>({
    targetColor: "",
    score: 0,
    feedback: "Create a new game",
    isGameActive: false,
  });

  const [isPixiReady, setIsPixiReady] = useState(false);

  const startNewGame = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setGameState({
      targetColor: randomColor.name,
      score: 0,
      feedback: "What color is the star?",
      isGameActive: true,
    });
  };

  const handleColorGuess = (guessedColor: string) => {
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
          feedback: "What color is the star?",
        }));
      }, 1500);
    } else {
      setGameState((prev) => ({
        ...prev,
        feedback: `Incorrect! It was ${prev.targetColor}. Final score: ${newScore}`,
        isGameActive: false,
      }));
    }
  };

  return (
    <main className="flex flex-col items-center justify-center mx-auto p-5 bg-[#0a0a1f] h-screen w-screen">
      {!isPixiReady && <p>Loading game...</p>}

      <PixiCanvas gameState={gameState} setIsPixiReady={setIsPixiReady} />

      <GameControls gameState={gameState} onStart={startNewGame} />

      <ColorButtons gameState={gameState} onGuess={handleColorGuess} />
    </main>
  );
};

export default App;
