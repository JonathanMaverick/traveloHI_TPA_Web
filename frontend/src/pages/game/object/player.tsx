import { characterScaleFactor } from "../game";
import { PlayerAnimations, PlayerState } from "./PlayerState";

export class Player {
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    xSpeed: number;
    ySpeed: number;
    health: number;
    maxHealth: number;
    mirrored: boolean;
    framesElapsed: number = 0;
    currentPlayerState: PlayerState;
    playerAnimation: PlayerAnimations;
    currentFrame: number = 0;

    constructor(type : string, x : number, y : number, width : number, height : number, xSpeed : number, ySpeed : number, health : number, maxHealth : number, mirrored : boolean, playerAnimation : PlayerAnimations, currentPlayerState : PlayerState) { 
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.health = health;
        this.maxHealth = maxHealth;
        this.mirrored = mirrored;
        this.currentPlayerState = currentPlayerState;
        this.playerAnimation = playerAnimation;
    }

    draw(c: CanvasRenderingContext2D) {
        const frame = this.playerAnimation[this.currentPlayerState][this.currentFrame];
        c.drawImage(
            frame,
            this.x,
            this.y,
            this.playerAnimation[this.currentPlayerState][this.currentFrame].width * characterScaleFactor,
            this.height
        );
    }

    animateFrames(deltaTime: number) {
        this.framesElapsed += deltaTime / 60;
        if (this.framesElapsed > 2) {
            console.log(this.currentFrame);
            this.currentFrame = (this.currentFrame + 1) % this.playerAnimation[this.currentPlayerState].length;
            this.framesElapsed = 0;
        }
    }

    update(deltaTime: number, canvas : HTMLCanvasElement, c: CanvasRenderingContext2D) {
        this.animateFrames(deltaTime);
        this.draw(c);
        this.validateMove(canvas);
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    validateMove(canvas : HTMLCanvasElement) {
        if (this.x < 0) {
            this.x = 0;
        }
        else if (this.x + this.width > canvas!.width) {
            this.x = canvas!.width - this.width;
        }
    }

    handleInput() {
        const speed = 5;
        let isSKeyPressed = false;
        let isDKeyPressed = false;
        console.log(isSKeyPressed);

        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'a':
                    this.xSpeed = -speed;
                    this.handleLeftWalk();
                    break;
                case 'd':
                    this.xSpeed = speed;
                    this.changeState(PlayerState.Walk);
                    isDKeyPressed = true;
                    break;
                case 's':
                    isSKeyPressed = true;
                    break;
                case ' ':
                    if (isSKeyPressed) {
                        this.handleLowKick();
                    } else if (isDKeyPressed){
                        this.changeState(PlayerState.FrontKick);
                    }
                    break;
                default:
                    break;
            }
        });

        window.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'a':
                    this.xSpeed = 0;
                    this.changeState(PlayerState.Idle);
                    break;
                case 'd':
                    this.xSpeed = 0;
                    this.changeState(PlayerState.Idle);
                    isDKeyPressed = false;
                    break;
                case 's':
                    isSKeyPressed = false;
                    this.changeState(PlayerState.Idle);
                    break;
                
            }
        });
    }

    handleLeftWalk(){
        if(this.mirrored){
            this.changeState(PlayerState.WalkMirror);
        }
        else{
            this.changeState(PlayerState.Walk);
        }
    }

    handleLowKick(){
        if(this.mirrored){
            this.changeState(PlayerState.LowKickMirror);
        }
        else{
            this.changeState(PlayerState.LowKick);
        }
    }

    handleRightWalk(){
        if(this.mirrored){
            this.changeState(PlayerState.Walk);
        }
        else{
            this.changeState(PlayerState.WalkMirror);
        }
    }

    changeState(newState: PlayerState) {
        if (this.currentPlayerState !== newState) {
            this.currentPlayerState = newState;
            this.currentFrame = 0; 
        }
    }
}


