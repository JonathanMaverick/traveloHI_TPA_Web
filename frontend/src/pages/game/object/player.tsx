import { characterScaleFactor } from "../game";
import { PlayerAnimations, PlayerState } from "./PlayerState";
import { Socket } from "socket.io";

export class Player {
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
    xSpeed: number;
    ySpeed: number;
    health: number;
    mirrored: boolean;
    framesElapsed: number = 0;
    currentPlayerState: PlayerState;
    playerAnimation: PlayerAnimations;
    currentFrame: number = 0;
    isJumping: boolean = false;
    jumpVelocity: number = -10;
    gravity: number = 0.5;
    isActionLocked :boolean = false;
    lockDuration : number = 1;
    maxHealth : number = 100;  
    enemy : Player | null = null;
    socket : Socket | null = null;
    enemyPressedKey : string = "";
    enemyReleasedKey : string = "";

    constructor(type : string, x : number, y : number, width : number, height : number, xSpeed : number, ySpeed : number, health : number, mirrored : boolean, playerAnimation : PlayerAnimations, currentPlayerState : PlayerState, socket : Socket) { 
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.health = health;
        this.mirrored = mirrored;
        this.currentPlayerState = currentPlayerState;
        this.playerAnimation = playerAnimation;
        this.socket = socket;
        this.socket?.on('keyPressedByEnemy', (key: string) => {
            this.enemyPressedKey = key;
        })
    }

    setEnemy(enemy: Player) {
        this.enemy = enemy;
    }

    draw(c: CanvasRenderingContext2D) {
        const frame = this.playerAnimation[this.currentPlayerState][this.currentFrame];

        if (this.currentPlayerState === PlayerState.Jump) {
            c.drawImage(frame, this.x, this.y, frame.width * characterScaleFactor, frame.height * characterScaleFactor);
        } else {
            c.drawImage(
                frame,
                this.x,
                this.y,
                frame.width * characterScaleFactor,
                frame.height * characterScaleFactor,
            );
        }

        c.strokeStyle = 'red';
        c.strokeRect(this.x, this.y,  frame.width * characterScaleFactor, frame.height * characterScaleFactor);
    }

    animateFrames(deltaTime: number) {
        this.framesElapsed += deltaTime / 60;
        if (this.framesElapsed > 3) {
            this.currentFrame = (this.currentFrame + 1) % this.playerAnimation[this.currentPlayerState].length;
            this.framesElapsed = 0;
        }
    }

    handleEnemy(enemyPressedKey : string, enemyReleasedKey : string){
        let isSKeyPressed = false;
        let isDKeyPressed = false;
        let isAKeyPressed = false;
        console.log("kt,", enemyPressedKey, "sapi", enemyReleasedKey)
        switch (enemyPressedKey) {
            case 'a':
                if (!this.enemy!.isActionLocked){
                    this.enemy!.handleLeftWalk();
                    isAKeyPressed = true;
                }
                break;
            case 'd':
                if (!this.enemy!.isActionLocked){
                    this.enemy!.handleRightWalk();
                    isDKeyPressed = true;
                }
                break;
            case 's':
                isSKeyPressed = true;
                break;
            case 'w':
                if (!this.enemy!.isJumping) {
                    this.enemy!.isJumping = true;
                    this.enemy!.handleJump();
                }
                break;
            case ' ':
                if (isSKeyPressed && !this.isActionLocked) {
                    this.enemy!.handleLowKick();
                    this.enemy!.isActionLocked = true;
                } else if (isDKeyPressed && !this.isActionLocked) {
                    this.enemy!.handleFrontKick("d");
                    this.enemy!.isActionLocked = true;
                } else if (isAKeyPressed && !this.isActionLocked) {
                    this.enemy!.handleFrontKick("a");
                    this.enemy!.isActionLocked = true;
                } else if (!this.isActionLocked) {
                    this.enemy!.handleIdle();
                }
                break;
            default:
                break;
        }

        switch(enemyReleasedKey){
            case 'a':
                this.enemy!.xSpeed = 0;
                this.enemy!.handleIdle();
                break;
            case 'd':
                this.enemy!.xSpeed = 0;
                this.enemy!.handleIdle();
                isDKeyPressed = false;
                break;
            case 's':
                this.enemy!.handleIdle();
                isSKeyPressed = false;
                break;                
        }
    }

    update(deltaTime: number, canvas : HTMLCanvasElement, c: CanvasRenderingContext2D) {
        this.handleEnemy(this.enemyPressedKey, this.enemyReleasedKey);
        if (this.isActionLocked) {
            this.lockDuration -= (deltaTime / 500);
            this.xSpeed = 0;
            if (this.lockDuration < 0) {
                this.isActionLocked = false;
                this.lockDuration = 1; 
                if (
                    this.x < this.enemy!.x + this.enemy!.width &&
                    this.x + this.width > this.enemy!.x &&
                    this.y < this.enemy!.y + this.enemy!.height &&
                    this.y + this.height > this.enemy!.y
                ) {
                    if(this.currentPlayerState == PlayerState.LowKick || this.currentPlayerState == PlayerState.LowKickMirror){
                        this.enemy!.health -= 15; 
                    }
                    else if(this.currentPlayerState == PlayerState.FrontKick || this.currentPlayerState == PlayerState.FrontKickMirror){
                        this.enemy!.health -= 10;
                    }
                    console.log("Enemy health:", this.enemy!.health);
                }
            }
        }

        if (this.isJumping) {
            this.y += this.jumpVelocity;
            this.jumpVelocity += this.gravity;
    
            if (this.y >= canvas!.height - this.height) {
                this.isJumping = false;
                this.y = canvas!.height - this.height; 
                this.jumpVelocity = -10;
                this.handleIdle();
            }
        }
    
        this.x += this.xSpeed;
        this.animateFrames(deltaTime);
        this.draw(c);
        this.validateMove(canvas);
        this.mirrorBasedOnEnemyPosition(this.enemy!);

        this.enemy!.x += this.enemy!.xSpeed;
        this.enemy!.animateFrames(deltaTime);
        this.enemy!.draw(c)
        this.enemy!.validateMove(canvas);
        this.enemy!.mirrorBasedOnEnemyPosition(this);
    }

    validateMove(canvas : HTMLCanvasElement) {
        if (this.x < 0) {
            this.x = 0;
        }
        else if (this.x + this.width > canvas!.width) {
            this.x = canvas!.width - this.width;
        }

        if (this.y < 0) {
            this.y = 0;
        }
        else if (this.y + this.height >= canvas!.height) {
            this.y = canvas!.height - this.height;
        }
    }

    handleInput() {
        let isSKeyPressed = false;
        let isDKeyPressed = false;
        let isAKeyPressed = false;
        window.addEventListener('keydown', (event) => {
            this.socket!.emit('keyPressed', event.key);
            console.log('Key pressed:', event.key);
            switch (event.key) {
                case 'a':
                    if (!this.isActionLocked){
                        this.handleLeftWalk();
                        isAKeyPressed = true;
                    }
                    break;
                case 'd':
                    if (!this.isActionLocked){
                        this.handleRightWalk();
                        isDKeyPressed = true;
                    }
                    break;
                case 's':
                    isSKeyPressed = true;
                    break;
                case 'w':
                    if (!this.isJumping) {
                        this.isJumping = true;
                        this.handleJump();
                    }
                    break;
                case ' ':
                    if (isSKeyPressed && !this.isActionLocked) {
                        this.handleLowKick();
                        this.isActionLocked = true;
                    } else if (isDKeyPressed && !this.isActionLocked) {
                        this.handleFrontKick("d");
                        this.isActionLocked = true;
                    } else if (isAKeyPressed && !this.isActionLocked) {
                        this.handleFrontKick("a");
                        this.isActionLocked = true;
                    } else if (!this.isActionLocked) {
                        this.handleIdle();
                    }
                    break;
                default:
                    break;
            }
        });

        window.addEventListener('keyup', (event) => {
            this.socket?.emit('keyReleased', event.key);
            console.log('Key released:', event.key);
            switch (event.key) {
                case 'a':
                    this.xSpeed = 0;
                    this.handleIdle();
                    break;
                case 'd':
                    this.xSpeed = 0;
                    this.handleIdle();
                    isDKeyPressed = false;
                    break;
                case 's':
                    isSKeyPressed = false;
                    this.handleIdle();
                    break;                
            }
        });
    }

    mirrorBasedOnEnemyPosition(enemy: Player) {
        if (this.x > enemy.x) {
            this.mirrored = true;
        } else {
            this.mirrored = false;
        }
    }

    handleJump(){
        if (this.mirrored){
            this.changeState(PlayerState.JumpMirrored);
        }
        else{
            this.changeState(PlayerState.Jump);
        }
    }

    handleIdle(){
        if(this.mirrored){
            this.changeState(PlayerState.IdleMirror);
        }
        else{
            this.changeState(PlayerState.Idle);
        }
    }

    handleLeftWalk(){
        this.xSpeed =-7;
        if(this.type == "blast"){
            if(this.mirrored){
                this.changeState(PlayerState.WalkMirror);
            }
            else{
                this.changeState(PlayerState.BackWard);
            }
        }
        else{
            if(this.mirrored){
                this.changeState(PlayerState.WalkMirror);
            }
            else{
                this.changeState(PlayerState.Walk);
            }
        }
    }

    handleLowKick(){
        if(this.mirrored){
            this.changeState(PlayerState.LowKickMirror);
        }
        else{
            this.changeState(PlayerState.LowKick);
        }
        this.isActionLocked = true;
    }

    handleFrontKick(char : string){
        if(char == "a"){
            this.changeState(PlayerState.FrontKickMirror);
            this.isActionLocked = true;
        }
        else if (char == "d"){
            this.changeState(PlayerState.FrontKick);
            this.isActionLocked = true;
        }
    }

    handleRightWalk(){
        this.xSpeed =+7;
        if(this.type == "blast"){
            if(this.mirrored){
                this.changeState(PlayerState.BackWardMirror);
            }
            else{
                this.changeState(PlayerState.Walk);
            }
        }
        else{
            if(this.mirrored){
                this.changeState(PlayerState.WalkMirror);
            }
            else{
                this.changeState(PlayerState.Walk);
            }
        }
    }

    changeState(newState: PlayerState) {
        if (this.currentPlayerState !== newState) {
            this.currentPlayerState = newState;
            this.currentFrame = 0; 
        }
    }
}


