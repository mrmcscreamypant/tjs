import * as THREE from 'three';
import ResourceTracker from './ResourceTracker';

export default interface IWorld {
    readonly scene: THREE.Scene;
    readonly camera: THREE.Camera;
    readonly resTracker: ResourceTracker;
    dispose(): any;
    mainloop(): any;
    windowResizeHook(width:number, height:number): any;
}