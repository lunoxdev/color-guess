import { useEffect, useRef } from "react";
import { Application, Container } from "pixi.js";

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

        // Create a container positioned at the center of the screen
        const container = new Container({
          x: app.screen.width / 2,
          y: app.screen.height / 2,
        });

        app.stage.addChild(container); // Add container to stage
      } catch (error) {
        console.error("Error initializing PixiJS:", error);
      }
    };

    initPixi();
  }, []);

  return <div ref={canvasContainer} />;
};

export default App;
