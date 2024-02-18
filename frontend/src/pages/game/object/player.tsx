import { characterScaleFactor } from "../game";
import { PlayerAnimations, PlayerState } from "./PlayerState";
import { Socket } from "socket.io";

export interface PlayerUtils {
    state : PlayerState;
    mirrored : boolean;
    isJumping : boolean;
    isActionLocked : boolean;
    enemyHealth : number;
    jumpVelocity: number;
    x : number;
    y : number;
}

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
    enemyUtils : PlayerUtils | null = null;
    enemyDirection : string = "";

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
        this.socket?.on('enemyUtils', (utils : PlayerUtils) => {
            this.enemyUtils = utils;
        })
        this.socket?.on('enemyDirection', (direction : string) => {
            this.enemyDirection = direction;
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

    handleEnemy(state : PlayerState, direction : string){
        if((state === PlayerState.Walk || state === PlayerState.WalkMirror || state === PlayerState.BackWard) && direction === "left"){
            this.enemy!.handleLeftWalk();
        }
        else if((state === PlayerState.Walk || state === PlayerState.WalkMirror || state === PlayerState.BackWard || state == PlayerState.BackWardMirror) && direction === "right"){
            this.enemy!.handleRightWalk();
        }
        else if (state === PlayerState.Idle || state === PlayerState.IdleMirror){
            this.enemy!.handleIdle();
        }
        else if(state === PlayerState.LowKick || state === PlayerState.LowKickMirror){
            this.enemy!.handleLowKick();
        }
        else if((state === PlayerState.FrontKick || state === PlayerState.FrontKickMirror)&& this.enemyDirection === "left"){
            this.enemy!.handleFrontKick("a");
        }
        else if((state === PlayerState.FrontKick || state === PlayerState.FrontKickMirror)&& this.enemyDirection === "right"){
            this.enemy!.handleFrontKick("d");
        }
        else if(state === PlayerState.Jump || state === PlayerState.JumpMirrored){
            this.enemy!.handleJump();
        }

    }

    enemyUtilsValidate(utils : PlayerUtils | null, deltaTime : number, canvas : HTMLCanvasElement | null){
        if(utils?.isActionLocked){
            this.enemy!.xSpeed = 0;
            this.enemy!.lockDuration -= (deltaTime / 500);
            if (this.enemy!.lockDuration < 0) {
                this.enemy!.isActionLocked = false;
                this.enemy!.lockDuration = 1; 
            }
        }

        if (utils?.isJumping) {
            this.enemy!.y += this.enemy!.jumpVelocity;
            this.enemy!.jumpVelocity += this.gravity;
            if (this.enemy!.y >= canvas!.height - this.enemy!.height) {
                this.enemy!.isJumping = false;
                this.enemy!.y = canvas!.height - this.enemy!.height; 
                this.enemy!.jumpVelocity = -10;
                this.enemy!.handleIdle();
            }
        }
    }

    update(deltaTime: number, canvas : HTMLCanvasElement, c: CanvasRenderingContext2D) {
        this.socket!.emit('utils', {
            state: this.currentPlayerState,
            isJumping : this.isJumping,
            isActionLocked : this.isActionLocked,
            lockDuration : this.lockDuration,
            enemyHealth : this.enemy?.health,
            jumpVelocity: this.jumpVelocity,
        })
        if(this.enemyUtils !== null){
            this.handleEnemy(this.enemyUtils!.state, this.enemyDirection);
        }
        this.enemyUtilsValidate(this.enemyUtils, deltaTime, canvas);
        console.log(this.enemyUtils?.state)

        this.health = this.enemyUtils?.enemyHealth || 100;

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
        this.xSpeed = 0;
        if(this.mirrored){
            this.changeState(PlayerState.IdleMirror);
        }
        else{
            this.changeState(PlayerState.Idle);
        }
    }

    handleLeftWalk(){
        this.xSpeed =-7;
        this.socket!.emit('direction', "left")
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

    handleRightWalk(){
        this.xSpeed =+7;
        this.socket!.emit('direction', "right")
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
            this.socket!.emit('direction', "left")
            this.changeState(PlayerState.FrontKickMirror);
            this.isActionLocked = true;
        }
        else if (char == "d"){
            this.socket!.emit('direction', "right")
            this.changeState(PlayerState.FrontKick);
            this.isActionLocked = true;
        }
    }

    changeState(newState: PlayerState) {
        if (this.currentPlayerState !== newState) {
            this.currentPlayerState = newState;
            this.currentFrame = 0; 
        }
    }
}


