import * as THREE from 'three';
import ResourceTracker from './ResourceTracker';
import Engine from './Engine';
import ICamera from './ICamera';

export default interface IWorld {
    readonly engine: Engine;
    readonly scene: THREE.Scene;
    readonly camera: ICamera;
    readonly resTracker: ResourceTracker;
    dispose(): any;
    mainloop(): any;
    windowResizeHook(width:number, height:number): any;
}