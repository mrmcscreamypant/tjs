import * as THREE from 'three';
import ResourceTracker from './ResourceTracker';
import Engine from './Engine';

export default interface IWorld {
    readonly engine: Engine;
    readonly scene: THREE.Scene;
    readonly camera: THREE.Camera;
    readonly resTracker: ResourceTracker;
    dispose(): any;
    mainloop(): any;
    windowResizeHook(width:number, height:number): any;
}