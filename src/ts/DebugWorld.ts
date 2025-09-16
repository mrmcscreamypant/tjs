import * as THREE from 'three';

import IWorld from "./engine/IWorld";
import ResourceTracker from './engine/ResourceTracker';

export default class DebugWorld implements IWorld {
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    public resTracker: ResourceTracker;

    public cube: THREE.Mesh;

    public constructor() {
        this.resTracker = new ResourceTracker();
        this.scene = new THREE.Scene();
        this.cube = this.makeCube();
        this.camera = new THREE.PerspectiveCamera(70);
        this.camera.position.z = 1;
    }

    private makeCube(): THREE.Mesh {
        const geometry = this.resTracker.track(new THREE.BoxGeometry(0.2, 0.2, 0.2));
        const material = this.resTracker.track(new THREE.MeshNormalMaterial());

        const mesh = this.resTracker.track(new THREE.Mesh(geometry, material));

        this.scene.add(mesh);
        return mesh
    }

    public mainloop() {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.03;
        this.cube.rotation.z += 0.05;
    }

    public dispose() {
        this.resTracker.dispose();
    }

    public bindResource(resource:any) {

    }

    public windowResizeHook(width: number, height: number) {
        this.camera.aspect = width/height;
        this.camera.updateProjectionMatrix();
    }
}