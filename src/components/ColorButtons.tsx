import { colors } from "../utils/colors";
import type { GameState } from "../types";

type Props = {
  gameState: GameState;
  onGuess: (color: string) => void;
};

const ColorButtons = ({ gameState, onGuess }: Props) => (
  <div className="grid grid-cols-3 gap-3 w-[330px] lg:w-[400px]">
    {colors.map((color) => (
      <button
        key={color.name}
        onClick={() => onGuess(color.name)}
        disabled={!gameState.isGameActive}
        className={`px-2 py-1 lg:py-3 rounded-lg border border-dashed border-purple-700 hover:bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:font-bold transition-all duration-300 ${
          gameState.isGameActive
            ? "brightness-125 cursor-pointer"
            : "opacity-70 text-white/70 cursor-not-allowed"
        }`}
      >
        {color.name}
      </button>
    ))}
  </div>
);

export default ColorButtons;
