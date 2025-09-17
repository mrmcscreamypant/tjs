import * as THREE from 'three';

import IWorld from "./engine/IWorld";
import ResourceTracker from './engine/ResourceTracker';
import Engine from './engine/Engine';
import Player from './player/Player';

export default class DebugWorld implements IWorld {
    public readonly engine: Engine;

    public readonly scene: THREE.Scene;
    public readonly camera: THREE.PerspectiveCamera;
    public readonly resTracker: ResourceTracker;

    public readonly player: Player;

    public constructor(engine: Engine) {
        this.engine = engine;

        this.resTracker = new ResourceTracker();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(70);
        this.camera.position.z = 1;

        this.player = new Player(this);
        this.scene.add(this.player.obj());

        const light = new THREE.AmbientLight(0xFFFFFF, 1);
        this.scene.add(light);
    }

    public mainloop() {
        this.player.tick();
    }

    public dispose() {
        this.resTracker.dispose();
    }

    public windowResizeHook(width: number, height: number) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }
}