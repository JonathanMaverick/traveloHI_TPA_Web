import { useEffect, useRef, useState } from 'react';
import "../../styles/pages/game/game.scss";
import { PlayerState, getFirstPlayerAnimations, getSecondPlayerAnimations } from './object/PlayerState';
import { Player } from './object/player';

export const gamePath = "./game_asset/";
export const characterScaleFactor = 3; 

const loadImage = (src:any) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
};

const initGame = async (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
  const [background, lifeBarFull] = await Promise.all([
    loadImage(gamePath + 'background/background.png'),
    loadImage(gamePath + 'lifebar full.png'),
  ]);

  canvas.height = window.innerHeight * 0.8;
  canvas.width = window.innerWidth * 0.9;

  let lifeBarX = (canvas.width - (lifeBarFull.width / 0.35)) / 2; 
  const firstPlayerSprite = await getFirstPlayerAnimations(); 
  const secondPlayerSprite = await getSecondPlayerAnimations();
  
  const FirstCharacterWidth = firstPlayerSprite[PlayerState.Idle][0].width * characterScaleFactor;
  const FirstCharacterHeight = firstPlayerSprite[PlayerState.Idle][0].height * characterScaleFactor;
  const firstCharacterX = (canvas!.width - FirstCharacterWidth) / 25;
  const firstCharacterY = canvas!.height - FirstCharacterHeight;
  
  const SecondCharacterWidth = secondPlayerSprite[PlayerState.Idle][0].width * characterScaleFactor;
  const SecondCharacterHeight = secondPlayerSprite[PlayerState.Idle][0].height * characterScaleFactor;
  const secondCharacterX = (canvas!.width - SecondCharacterWidth) / 1.05;
  const secondCharacterY = canvas!.height - SecondCharacterHeight;

  const firstPlayer = new Player(
    "sword",
    firstCharacterX,
    firstCharacterY,
    FirstCharacterWidth,
    FirstCharacterHeight,
    0,
    0,
    100,
    100,
    false,
    firstPlayerSprite,
    PlayerState.Idle,
  )

  const secondPlayer = new Player(
    "blast",
    secondCharacterX,
    secondCharacterY,
    SecondCharacterWidth,
    SecondCharacterHeight,
    0,
    0,
    100,
    100,
    true,
    secondPlayerSprite,
    PlayerState.Idle,
  )

  let lastTimestamp = performance.now();
  const targetFrameRate = 60;

  const draw = () => {
    const timeStamp = performance.now();
    const deltaTime = (timeStamp - lastTimestamp); 
    secondPlayer.handleInput();
  
    if (deltaTime < 1000 / targetFrameRate) {;
      requestAnimationFrame(draw);
      return;
    }
    
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    context.drawImage(lifeBarFull,lifeBarX - 3.5,0,lifeBarFull.width / 0.35,lifeBarFull.height * 3);
    firstPlayer.update(deltaTime, canvas, context);
    secondPlayer.update(deltaTime, canvas, context);
    
    lastTimestamp = timeStamp;
    requestAnimationFrame(draw);
  };

  draw();
};

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    initGame(canvas, context);
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000); 

    return () => clearInterval(interval);
  }, []);

  const [timer, setTimer] = useState(120);

  return (
    <div className='game'>
      <h2>{timer}</h2>
      <canvas ref={canvasRef} width={2000} height={850} style={{ border: '1px solid black' }} />
    </div>
  );
}