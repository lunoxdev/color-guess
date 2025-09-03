import { useEffect, useRef } from "react";
import { Application, Container, Graphics } from "pixi.js";

const App = () => {
  const canvasContainer = useRef<HTMLDivElement>(null);

  // Initialize PixiJS
  useEffect(() => {
    const initPixi = async () => {
      try {
        const app = new Application();

        globalThis.__PIXI_APP__ = app; // Enable Pixi DevTools. Check "global.d.ts"

        // Init with full screen and custom background
        await app.init({ resizeTo: window, background: "#0f0f23" });

        if (canvasContainer.current) {
          canvasContainer.current.innerHTML = ""; // Clear any previous canvas
          canvasContainer.current.appendChild(app.canvas); // Append Pixi canvas
        }

        // Container at center of screen
        const container = new Container({
          x: app.screen.width / 2,
          y: app.screen.height / 2,
        });

        app.stage.addChild(container); // Add container to stage

        // Star
        const graphics = new Graphics();

        graphics.star(0, 0, 5, 50);
        graphics.stroke({ width: 2, color: 0x4a9eff });

        container.addChild(graphics); // add Star to the container
      } catch (error) {
        console.error("Error initializing PixiJS:", error);
      }
    };

    initPixi();
  }, []);

  return <div ref={canvasContainer} />;
};

export default App;
