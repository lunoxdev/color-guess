import { useTick } from "@pixi/react";
import { Graphics, Text, Ticker } from "pixi.js";
import { useCallback } from "react";
import type { GameState } from "../types";
import { colors } from "../utils/colors";

interface PixiContentProps {
    gameState: GameState;
    targetStar: React.RefObject<Graphics | null>;
    feedbackText: React.RefObject<Text | null>;
}

const PixiContent = ({ gameState, targetStar, feedbackText }: PixiContentProps) => {
    // Animate the star if the response contains "Correct!"
    const animateStar = useCallback(
        (ticker: Ticker) => {
            if (targetStar.current && gameState.feedback.startsWith("Correct!")) {
                targetStar.current.rotation += 0.05 * ticker.deltaTime;
            }
        },
        [gameState.feedback, targetStar]
    );

    useTick(animateStar);

    return (
        <>
            <pixiGraphics
                ref={targetStar}
                x={(window.innerWidth <= 932 ? 330 : 400) / 2}
                y={(window.innerWidth <= 932 ? 180 : 300) / 2 - 20}
                draw={(g) => {
                    g.clear();
                    g.star(0, 0, 5, 50);
                    const colorObj = colors.find(
                        (c) => c.name === gameState.targetColor
                    );
                    g.fill(gameState.isGameActive ? colorObj?.hex ?? 0x666666 : 0x666666);
                }}
            />
            <pixiText
                ref={feedbackText}
                text={gameState.feedback}
                anchor={0.5}
                x={(window.innerWidth <= 932 ? 330 : 400) / 2}
                y={(window.innerWidth <= 932 ? 180 : 300) / 2 + (window.innerWidth <= 932 ? 60 : 80)}
                style={{
                    fontFamily: "Arial",
                    fontSize: 18,
                    fill: 0xffffff,
                }}
            />
        </>
    );
};

export default PixiContent