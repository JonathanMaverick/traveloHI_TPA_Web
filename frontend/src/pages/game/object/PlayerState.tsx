import { gamePath } from "../game";

export interface PlayerAnimations {
    [key: string]: HTMLImageElement[]; 
}

export enum PlayerState {
    Idle = "Idle",
    Walk = "Walking",
    LowKick = "LowKick",
    FrontKick = "FrontKick",
    IdleMirror = "IdleMirror",
    WalkMirror = "WalkMirror",
    LowKickMirror = "LowKickMirror",
    FrontKickMirror = "FrontKickMirror",
    Jump = "Jump",
    JumpMirrored = "JumpMirrored",
    BackWard = "BackWard",
    BackWardMirror = "BackWardMirror",
}

const loadSprites = async (paths: string[]): Promise<HTMLImageElement[]> => {
    const images: HTMLImageElement[] = [];

    for (const path of paths) {
        const img = new Image();
        img.src = path;

        await new Promise<void>((resolve) => {
            img.onload = () => resolve();
        });

        images.push(img);
    }

    return images;
};

export async function getFirstPlayerAnimations() {

    const idleSpritesPaths = Array.from({ length: 5 }, (_, i) => gamePath + `sword impulse/idle/sword-impulse_${(i + 1).toString().padStart(2, '0')}.png`);
    const walkingSpritesPaths = Array.from({ length: 10 }, (_, i) => gamePath + `sword impulse/walking/sword-impulse_${(i + 1).toString().padStart(1, '0')}.png`);
    const lowKickSpritesPaths = Array.from({ length: 3 }, (_, i) => gamePath + `sword impulse/low kick/sword-impulse_${(i + 1).toString().padStart(2, '0')}.png`);
    const frontKickSpritesPaths = Array.from({ length: 4 }, (_, i) => gamePath + `sword impulse/front kick/sword-impulse_${(i + 1).toString().padStart(2, '0')}.png`);
    const jumpSpritesPaths = Array.from({ length: 6 }, (_, i) => gamePath + `sword impulse/jumping/sword-impulse_jump_${(i + 1).toString().padStart(2, '0')}.png`);
    const frontKickMirrorSpritesPaths = Array.from({ length: 4 }, (_, i) => gamePath + `sword impulse/front kick mirrored/sword-impulse_${(i + 1).toString().padStart(2, '0')}.png`);
    const lowKickMirrorSpritesPaths = Array.from({ length: 3 }, (_, i) => gamePath + `sword impulse/low kick mirrored/sword-impulse_${(i + 1).toString().padStart(2, '0')}.png`);
    const idleMirrorSpritesPaths = Array.from({ length: 5 }, (_, i) => gamePath + `sword impulse/idle mirrored/sword-impulse_${(i + 1).toString().padStart(2, '0')}.png`);
    const walkingMirrorSpritesPaths = Array.from({ length: 10 }, (_, i) => gamePath + `sword impulse/walking mirrored/sword-impulse_${(i + 1).toString().padStart(1, '0')}.png`);
    const jumpMirrorSpritesPaths = Array.from({ length: 6 }, (_, i) => gamePath + `sword impulse/jumping mirrored/sword-impulse_jump_${(i + 1).toString().padStart(2, '0')}.png`);

    const idleSprites = await loadSprites(idleSpritesPaths)
    const walkingSprites = await loadSprites(walkingSpritesPaths)
    const lowKickSprites = await loadSprites(lowKickSpritesPaths)
    const frontKickSprites = await loadSprites(frontKickSpritesPaths)
    const jumpSprites = await loadSprites(jumpSpritesPaths)
    const frontKickMirrorSprites = await loadSprites(frontKickMirrorSpritesPaths)
    const lowKickMirrorSprites = await loadSprites(lowKickMirrorSpritesPaths)
    const idleMirrorSprites = await loadSprites(idleMirrorSpritesPaths)
    const walkingMirrorSprites = await loadSprites(walkingMirrorSpritesPaths)
    const jumpMirrorSprites = await loadSprites(jumpMirrorSpritesPaths)

    return {
        [PlayerState.Idle]: idleSprites,
        [PlayerState.Walk]: walkingSprites,
        [PlayerState.LowKick]: lowKickSprites,
        [PlayerState.FrontKick]: frontKickSprites,
        [PlayerState.Jump]: jumpSprites,
        [PlayerState.FrontKickMirror]: frontKickMirrorSprites,
        [PlayerState.LowKickMirror]: lowKickMirrorSprites,
        [PlayerState.IdleMirror]: idleMirrorSprites,
        [PlayerState.WalkMirror]: walkingMirrorSprites,
        [PlayerState.JumpMirrored]: jumpMirrorSprites,
    };
}

export async function getSecondPlayerAnimations() {
    
    const idleSpritesPaths = Array.from({ length: 6 }, (_, i) => gamePath + `blast impulse/idle/idle ${(i + 1).toString().padStart(1, '0')}.png`);
    const idleMirrorSpritesPaths = Array.from({ length: 6 }, (_, i) => gamePath + `blast impulse/idle mirrored/idle ${(i + 1).toString().padStart(1, '0')}.png`);
    const walkingSpritesPaths = Array.from({ length: 3 }, (_, i) => gamePath + `blast impulse/walking/${(i + 1)}.png`);
    const walkingMirrorSpritesPaths = Array.from({ length: 3 }, (_, i) => gamePath + `blast impulse/walking mirrored/${(i + 1)}.png`);
    const lowKickSpritesPaths = Array.from({ length: 4 }, (_, i) => gamePath + `blast impulse/low kick/${(i + 1)}.png`);
    const lowKickMirrorSpritesPaths = Array.from({ length: 4 }, (_, i) => gamePath + `blast impulse/low kick mirrored/${(i + 1)}.png`);
    const frontKickSpritesPaths = Array.from({ length: 3 }, (_, i) => gamePath + `blast impulse/front kick/${(i + 1)}.png`);
    const frontKickMirrorSpritesPaths = Array.from({ length: 3 }, (_, i) => gamePath + `blast impulse/front kick mirrored/${(i + 1)}.png`);
    const jumpSpritesPaths = Array.from({ length: 1 }, (_, i) => gamePath + `blast impulse/jump/${(i + 1)}.png`);
    const jumpMirrorSpritesPaths = Array.from({ length: 1 }, (_, i) => gamePath + `blast impulse/jump mirrored/${(i + 1)}.png`);
    const backWardSpritesPaths = Array.from({ length: 3 }, (_, i) => gamePath + `blast impulse/backward/${(i + 1)}.png`);
    const backWardMirrorSpritesPaths = Array.from({ length: 3 }, (_, i) => gamePath + `blast impulse/backward mirrored/${(i + 1)}.png`);

    const idleSprites = await loadSprites(idleMirrorSpritesPaths)
    const idleMirrorSprites = await loadSprites(idleSpritesPaths)
    const walkingSprites = await loadSprites(walkingSpritesPaths)
    const walkingMirrorSprites = await loadSprites(walkingMirrorSpritesPaths)
    const lowKickSprites = await loadSprites(lowKickSpritesPaths)
    const lowKickMirrorSprites = await loadSprites(lowKickMirrorSpritesPaths)
    const frontKickSprites = await loadSprites(frontKickSpritesPaths)
    const frontKickMirrorSprites = await loadSprites(frontKickMirrorSpritesPaths)
    const jumpSprites = await loadSprites(jumpSpritesPaths)
    const jumpMirrorSprites = await loadSprites(jumpMirrorSpritesPaths)
    const backWardSprites = await loadSprites(backWardSpritesPaths)
    const backWardMirrorSprites = await loadSprites(backWardMirrorSpritesPaths)

    return {
        [PlayerState.Idle]: idleSprites,
        [PlayerState.IdleMirror]: idleMirrorSprites,
        [PlayerState.Walk]: walkingSprites,
        [PlayerState.WalkMirror]: walkingMirrorSprites,
        [PlayerState.LowKick]: lowKickSprites,
        [PlayerState.LowKickMirror]: lowKickMirrorSprites,
        [PlayerState.FrontKick]: frontKickSprites,
        [PlayerState.FrontKickMirror]: frontKickMirrorSprites,
        [PlayerState.Jump]: jumpSprites,
        [PlayerState.JumpMirrored]: jumpMirrorSprites,
        [PlayerState.BackWard]: backWardSprites,
        [PlayerState.BackWardMirror]: backWardMirrorSprites,
    };
}