import { useEffect, useRef, useState } from 'react';
import "../../styles/pages/game/game.scss";
import { PlayerState, getFirstPlayerAnimations, getSecondPlayerAnimations } from './object/PlayerState';
import { Player } from './object/player';
import useUser from '../../contexts/user-context';
import { useNavigate } from 'react-router-dom';
import useTheme from '../../contexts/theme-context';
import { io } from 'socket.io-client';

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


export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const {user} = useUser();
  const navigate = useNavigate();
  const [timer, setTimer] = useState(600);
  const timerRef = useRef(timer); 
  const {theme} = useTheme();
  const winnerChecked = useRef(false);
  const [_, setGameCounter] = useState(0);
  const gameOver = useRef(false);
  const maxGames = 3;
  const playerNum = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  let socket: any;
  const gameStatus = useRef('');

  useEffect(() => {
    document.title = "Game";
    const canvas = canvasRef.current;
    
    if(!user){
      navigate('/login');
    }
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;

    socket = io('http://localhost:3000');
    socket.on('connect', () => {
      socket.on('playerNumber', (number:number) => {
        console.log('Nomor pemain:', number);
        playerNum.current = number;
      });

      socket.on('gameStatus', (status:string) => {
        gameStatus.current = status;
      })
    });

    initGame(canvas, context, socket);
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        timerRef.current = prevTimer; 
        return prevTimer > 0 ? prevTimer - 1 : 0;
      });
    }, 1000); 
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    const timer = setTimeout(() => {
      if(audio){
        audio.play();
      }
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const reloadAfterDelay = (delay: number) => {
    setTimeout(() => {
      setGameCounter((prevCounter) => {
        if (prevCounter < maxGames - 1) {
          const canvas = canvasRef.current;
          if (!canvas) return prevCounter; 
          const context = canvas.getContext('2d');
          if (!context) return prevCounter;
          setTimer(600);
          initGame(canvas, context, socket);
          return prevCounter + 1; 
        }
        else{
          navigate('/')
          return prevCounter;
        }
      });
    }, delay);
  };

  const initGame = async (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, socket : any) => {
    gameOver.current = false;
    winnerChecked.current = false;

    const [background, lifeBarFull, winGame, drawGame, loseGame] = await Promise.all([
      loadImage(gamePath + 'background/background.png'),
      loadImage(gamePath + 'lifebar full.png'),
      loadImage(gamePath + 'win.png'),
      loadImage(gamePath + 'draw.png'),
      loadImage(gamePath + 'lose.png'),
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
      firstCharacterX + 200,
      firstCharacterY,
      FirstCharacterWidth,
      FirstCharacterHeight,
      0,
      0,
      100,
      false,
      firstPlayerSprite,
      PlayerState.Idle,
      socket
    )
  
    const secondPlayer = new Player(
      "blast",
      secondCharacterX - 200,
      secondCharacterY,
      SecondCharacterWidth,
      SecondCharacterHeight,
      0,
      0,
      100,
      true,
      secondPlayerSprite,
      PlayerState.IdleMirror,
      socket
    )

    firstPlayer.setEnemy(secondPlayer);
    secondPlayer.setEnemy(firstPlayer);

    let player = null;
    if(playerNum.current === 0){
      player = firstPlayer;
    }else{
      player = secondPlayer;
    }
  
    let lastTimestamp = performance.now();
    const targetFrameRate = 60;
    
    const updateHealth = () => {
        let lifeBarX = (canvas.width - (lifeBarFull.width / 0.35)) / 2; 
        const firstPlayerLifePercentage = (firstPlayer.health / firstPlayer.maxHealth) * 100;
        const firstPlayerLifeBarWidth = (firstPlayerLifePercentage / 100) * (lifeBarFull.width / 0.35);
    
        context.fillStyle = 'yellow';
        context.fillRect((lifeBarX * 1.28), 50, (firstPlayerLifeBarWidth / 3), lifeBarFull.height);
        // context.fillRect((lifeBarX * 1.6), 50, (firstPlayerLifeBarWidth / 3.2), lifeBarFull.height);
  
        const secondPlayerLifePercentage = (secondPlayer.health / secondPlayer.maxHealth) * 100;
        const secondPlayerLifeBarWidth = (secondPlayerLifePercentage / 100) * (lifeBarFull.width / 0.35);
    
        context.fillStyle = 'blue';
        context.fillRect((lifeBarX * 3.475), 50, -(secondPlayerLifeBarWidth / 3), lifeBarFull.height);
        // context.fillRect((lifeBarX * 5.3), 50, -(secondPlayerLifeBarWidth / 3.2), lifeBarFull.height);
    }
  
    const lose = () =>{
      context.drawImage(loseGame, canvas.width / 2.3, canvas.height / 3, winGame.width / 0.35, winGame.height * 3);
      winnerChecked.current = true;
      gameOver.current = true; 
      reloadAfterDelay(2000);
    }

    const win = () =>{
      context.drawImage(winGame, canvas.width / 2.3, canvas.height / 3, winGame.width / 0.35, winGame.height * 3);
      winnerChecked.current = true;
      gameOver.current = true;
      reloadAfterDelay(2000);
    }

    const draw_status = () => {
      context.drawImage(drawGame, canvas.width / 2.3, canvas.height / 3, drawGame.width / 0.35, drawGame.height * 3);
      winnerChecked.current = true;
      gameOver.current = true;
      reloadAfterDelay(2000);
    }


    const checkWinner = () => {
      if (player!.health < 0 && !winnerChecked.current) {
        socket.emit('game', 'end-lose');
        lose();
      } else if (player!.enemy.health < 0 && !winnerChecked.current) {
        socket.emit('game', 'end-win');
        win();
      } else if (timerRef.current === 0 && !winnerChecked.current) {
        socket.emit('game', 'end-draw');
        draw_status();
      }
    };
  
    const draw = () => {
      if (gameOver.current) {
        return;
      }
  
      const timeStamp = performance.now();
      const deltaTime = (timeStamp - lastTimestamp); 

      player!.handleInput();
  
      if (deltaTime < 1000 / targetFrameRate) {;
        requestAnimationFrame(draw);
        return;
      }
      
      context.drawImage(background, 0, 0, canvas.width, canvas.height);
      updateHealth();
      context.drawImage(lifeBarFull,lifeBarX - 3.5,0,lifeBarFull.width / 0.35,lifeBarFull.height * 3);
  
      player!.update(deltaTime, canvas, context);
      checkWinner();
      if(gameStatus.current === 'end-win'){
        lose();
        gameStatus.current = '';
      }
      else if(gameStatus.current === 'end-lose'){
        win();
        gameStatus.current = '';
      }
      else if(gameStatus.current === 'end-draw'){
        draw_status();
        gameStatus.current = '';
      }
      
      lastTimestamp = timeStamp;
      requestAnimationFrame(draw);
    }
  
    draw();
  };
  
  return (
    <div className={`game ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <h2>{timer}</h2>
      <audio ref={audioRef} src={gamePath + "background music 1.mp3"}></audio>
      <canvas ref={canvasRef} width={2000} height={850} style={{ border: '1px solid black' }} />
    </div>
  );
}