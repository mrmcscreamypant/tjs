import * as THREE from 'three';
import ResourceTracker from './ResourceTracker';
import Engine from './Engine';
import ICamera from './ICamera';
import { PlayerState } from '../../server/src/rooms/schema/BattleState';

export default interface IWorld {
    readonly engine: Engine;
    readonly scene: THREE.Scene;
    readonly camera: ICamera;
    readonly resTracker: ResourceTracker;
    dispose(): void;
    mainloop(delta: number): void;
    windowResizeHook(width:number, height:number): void;
    addPlayer(player: PlayerState, sessionId: string): void;
}