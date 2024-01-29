import { PlayerState } from "./playerState";

export class Player {
    x: number;
    y: number;
    width: number;
    height: number;
    xSpeed: number;
    ySpeed: number;
    health: number;
    mirrored: boolean;
    state: PlayerState;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        xSpeed: number,
        ySpeed: number,
        health: number,
        mirrored: boolean,
        state: PlayerState
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.health = health;
        this.mirrored = mirrored;
        this.state = state;
    }
}