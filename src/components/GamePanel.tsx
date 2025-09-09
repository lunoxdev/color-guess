import type { GameState } from "../types";
import { colors } from "../utils/colors";

type Props = {
    gameState: GameState;
    onStart: () => void;
    onGuess: (color: string) => void;
};

const GamePanel = ({ gameState, onStart, onGuess }: Props) => {
    return (
        <>
            <section>
                <button
                    onClick={onStart}
                    className={`text-sm lg:text-base py-2 lg:py-3 px-5 my-5 lg:my-6 rounded-lg mr-5 font-bold bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-700 ${gameState.isGameActive
                        ? "bg-none text-lime-500"
                        : "hover:brightness-125 cursor-pointer"
                        }`}
                    disabled={gameState.isGameActive}
                >
                    {gameState.isGameActive ? "Playing..." : "New Game"}
                </button>

                <span className="font-bold">Score: {gameState.score}</span>
            </section>

            <section className="grid grid-cols-3 gap-3 w-[330px] lg:w-[400px]">
                {colors.map((color) => (
                    <button
                        key={color.name}
                        onClick={() => onGuess(color.name)}
                        disabled={!gameState.isGameActive}
                        className={`px-2 py-1 lg:py-3 rounded-lg border border-dashed border-purple-700 hover:bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 hover:font-bold transition-all duration-300 ${gameState.isGameActive
                            ? "brightness-125 cursor-pointer"
                            : "opacity-70 text-white/70 cursor-not-allowed"
                            }`}
                    >
                        {color.name}
                    </button>
                ))}
            </section>
        </>
    );
};

export default GamePanel;
