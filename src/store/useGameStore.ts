import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GameState } from "../types";
import { colors } from "../utils/colors";

type GameStore = GameState & {
  setGameState: (state: Partial<GameState>) => void;
  startNewGame: () => void;
  handleColorGuess: (guessedColor: string) => void;
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      targetColor: "",
      score: 0,
      feedback: "Create a new game",
      isGameActive: false,

      setGameState: (state) => set((prev) => ({ ...prev, ...state })),

      startNewGame: () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        set({
          targetColor: randomColor.name,
          score: 0,
          feedback: "What color is the star?",
          isGameActive: true,
        });
      },

      handleColorGuess: (guessedColor) => {
        const { targetColor, score, isGameActive } = get();
        if (!isGameActive) return;

        const isCorrect = guessedColor === targetColor;
        const newScore = isCorrect ? score + 1 : score;

        if (isCorrect) {
          set({
            score: newScore,
            feedback: `Correct! It was ${guessedColor}. Score: ${newScore}`,
          });

          setTimeout(() => {
            const nextColor = colors[Math.floor(Math.random() * colors.length)];
            set({
              targetColor: nextColor.name,
              feedback: "What color is the star?",
            });
          }, 1500);
        } else {
          set({
            feedback: `Incorrect! It was ${targetColor}. Final score: ${newScore}`,
            isGameActive: false,
          });
        }
      },
    }),
    {
      name: "game-storage",
    }
  )
);
