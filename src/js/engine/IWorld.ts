import * as THREE from 'three';

export default interface IWorld {
    scene: THREE.Scene;
    camera: THREE.Camera;
    mainloop():any;
}