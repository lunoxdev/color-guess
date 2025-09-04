import { useState } from "react";
import PixiCanvas from "./components/PixiCanvas";
import GameControls from "./components/GameControls";
import ColorButtons from "./components/ColorButtons";
import { useGameStore } from "./store/useGameStore";

const App = () => {
  const {
    targetColor,
    score,
    feedback,
    isGameActive,
    startNewGame,
    handleColorGuess,
  } = useGameStore();

  const gameState = { targetColor, score, feedback, isGameActive };

  const [isPixiReady, setIsPixiReady] = useState<boolean>(false);

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
