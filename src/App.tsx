import { useState } from "react";
import { useGameStore } from "./store/useGameStore";
import PixiCanvas from "./components/PixiCanvas";
import GamePanel from "./components/GamePanel";

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

      {/* Pixi PJ v8 content */}
      <PixiCanvas gameState={gameState} setIsPixiReady={setIsPixiReady} />

      {/* Game Panel */}
      <GamePanel gameState={gameState} onStart={startNewGame} onGuess={handleColorGuess} />
    </main>
  );
};

export default App;
