import type { GameState } from "../types";

type Props = {
  gameState: GameState;
  onStart: () => void;
};

const GameControls = ({ gameState, onStart }: Props) => (
  <section>
    <button
      onClick={onStart}
      className={`text-sm lg:text-base py-2 lg:py-3 px-5 my-5 lg:my-6 rounded-lg mr-5 font-bold bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-700 ${
        gameState.isGameActive
          ? "opacity-60 cursor-not-allowed"
          : "hover:brightness-125 cursor-pointer"
      }`}
      disabled={gameState.isGameActive}
    >
      {gameState.isGameActive ? "Playing..." : "New Game"}
    </button>

    <span className="font-bold">Score: {gameState.score}</span>
  </section>
);

export default GameControls;
