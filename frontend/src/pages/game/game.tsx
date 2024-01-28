import { useEffect, useRef } from 'react';
import "../../styles/pages/game/game.scss";

const gamePath = "./game_asset/";

const loadImage = (src:any) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
};

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const loadAssets = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext('2d');
      if (!context) return;

      const [background, lifeBarFull] = await Promise.all([
        loadImage(gamePath + "background/background.png"),
        loadImage(gamePath + "lifebar full.png"),
      ]);

      const characterFrames: HTMLImageElement[] = [];
      const characterFrames2: HTMLImageElement[] = [];

      for (let i = 1; i <= 6; i++) {
        const frame = await loadImage(gamePath + `blast impulse/idle/idle ${i}.png`);
        characterFrames.push(frame);
      }

      for(let i = 1; i <= 6; i++) {
        const frame = await loadImage(gamePath + `sword impulse/idle mirrored/sword-impulse_0${i}.png`);
        characterFrames2.push(frame);
      }

      const frameRate = 60;
      const frameDuration = 1000 / frameRate;
      let lastFrameTime = performance.now();
      let currentFrame = 0;

      canvas.height = window.innerHeight - 100;
      canvas.width = window.innerWidth - 600;

      function draw() {
        // Draw background
        context!.drawImage(background, 0, 0, canvas!.width, canvas!.height);

        // Draw life bar
        let lifeBarX = (canvas!.width - (lifeBarFull.width + 600)) / 2;
        context!.drawImage(lifeBarFull, lifeBarX, 20, lifeBarFull.width + 600, lifeBarFull.height + 70);

        // Draw character
        const characterScaleFactor = 4; 
        const characterX = (canvas!.width - characterFrames[currentFrame].width * characterScaleFactor) - 1000;
        const characterY = canvas!.height - characterFrames[currentFrame].height * characterScaleFactor - 50;

        context!.drawImage(
          characterFrames[currentFrame],
          characterX,
          characterY,
          characterFrames[currentFrame].width * characterScaleFactor,
          characterFrames[currentFrame].height * characterScaleFactor
        );
        
        const characterScaleFactor2 = 4;
        const characterX2 = (canvas!.width - characterFrames2[currentFrame].width * characterScaleFactor2) - 100;
        const characterY2 = canvas!.height - characterFrames2[currentFrame].height * characterScaleFactor2 - 50;

        context!.drawImage(
          characterFrames2[currentFrame],
          characterX2,
          characterY2,
          characterFrames2[currentFrame].width * characterScaleFactor2,
          characterFrames2[currentFrame].height * characterScaleFactor2
        );

        currentFrame = (currentFrame + 1) % characterFrames.length; 
        requestAnimationFrame(draw);
      }

      function animate() {
        const currentTime = performance.now();
        const elapsed = currentTime - lastFrameTime;

        if (elapsed > frameDuration) {
          lastFrameTime = currentTime - (elapsed % frameDuration);
          draw();
        }
        requestAnimationFrame(animate);
      }
      animate();
    };

    document.title = 'Game';
    loadAssets();
  }, []);

  return (
    <div className='game'>
      <canvas ref={canvasRef} width={2000} height={850} style={{ border: '1px solid black' }} />
    </div>
  );
}
