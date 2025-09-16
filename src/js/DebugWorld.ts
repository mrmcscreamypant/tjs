import * as THREE from 'three';

import IWorld from "./engine/IWorld";

export default class DebugWorld implements IWorld {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;

    cube: THREE.Mesh;

    constructor() {
        this.scene = new THREE.Scene();
        this.cube = this.makeCube();
        this.camera = new THREE.PerspectiveCamera(70)
        this.camera.position.z = 1;
    }

    private makeCube(): THREE.Mesh {
        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const material = new THREE.MeshNormalMaterial();

        const mesh = new THREE.Mesh(geometry, material);

        this.scene.add(mesh);
        return mesh
    }

    public mainloop() {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.03
    }

    public windowResizeHook(width: number, height: number) {
        this.camera.aspect = width/height;
        this.camera.updateProjectionMatrix();
    }
}