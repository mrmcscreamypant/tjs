import * as THREE from 'three';

import IWorld from "../../engine/IWorld";
import ResourceTracker from '../../engine/ResourceTracker';
import IntroCube from './IntroCube';

export default class IntroWorld implements IWorld {
    public readonly scene: THREE.Scene;
    public readonly camera: THREE.PerspectiveCamera;
    public readonly resTracker: ResourceTracker;
    public readonly ambientLight: THREE.AmbientLight;
    public readonly directionalLight: THREE.DirectionalLight;

    public cube: IntroCube;

    public constructor() {
        this.resTracker = new ResourceTracker();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70);
        this.camera.position.z = 1;

        this.ambientLight = this.resTracker.track(new THREE.AmbientLight(0xFFFFFF, 0.2));
        this.directionalLight = this.resTracker.track(new THREE.DirectionalLight(0xFF2211, 1));
        this.directionalLight.position.set(2, 0, 2)
        this.scene.add(this.ambientLight);
        this.scene.add(this.directionalLight);

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