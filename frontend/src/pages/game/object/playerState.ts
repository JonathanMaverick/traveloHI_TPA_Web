import { gamePath } from "../game";

export enum State{
    IDLE = "idle",
}

export class PlayerState {
    animations: HTMLImageElement[];
    state: State;

    constructor(animations: HTMLImageElement[], state: State) {
        this.animations = animations;
        this.state = state;
    }
}

const loadImage = (src: any) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
    });
};
  

export async function loadIdleSprites(name: string): Promise<PlayerState> {
    const idleAnimationFrames: HTMLImageElement[] = [];

    if (name === "blast impulse") {
        for (let i = 1; i <= 6; i++) {
            const frame = await loadImage(gamePath + `${name}/idle/idle ${i}.png`);
            idleAnimationFrames.push(frame);
        }

        return new PlayerState(idleAnimationFrames, State.IDLE);
    } else if (name === "sword impulse") {
        for (let i = 1; i <= 6; i++) {
            const frame = await loadImage(gamePath + `${name}/idle mirrored/sword-impulse_0${i}.png`);
            idleAnimationFrames.push(frame);
        }
        return new PlayerState(idleAnimationFrames, State.IDLE);
    } else {
        return new PlayerState([], State.IDLE);
    }
}