import * as THREE from 'three';

import IWorld from "../../engine/IWorld";
import ResourceTracker from '../../engine/ResourceTracker';
import IntroCube from './IntroCube';

export default class IntroWorld implements IWorld {
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    public resTracker: ResourceTracker;

    public cube: IntroCube;

    public constructor() {
        this.resTracker = new ResourceTracker();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70);
        this.camera.position.z = 1;

        this.cube = new IntroCube(this);
        this.scene.add(this.cube.obj());
    }

    public mainloop() {
        this.cube.tick()
    }

    public dispose() {
        this.resTracker.dispose();
    }

    public windowResizeHook(width: number, height: number) {
        this.camera.aspect = width/height;
        this.camera.updateProjectionMatrix();
    }
}