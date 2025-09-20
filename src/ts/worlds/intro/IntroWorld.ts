import * as THREE from 'three';

import IWorld from "../../engine/IWorld";
import ResourceTracker from '../../engine/ResourceTracker';
import IntroCube from './IntroCube';
import DebugWorld from '../../DebugWorld';
import Engine from '../../engine/Engine';
import ICamera from '../../engine/ICamera';
import { PlayerState } from '../../../server/src/rooms/schema/BattleState';

class IntroCamera implements ICamera {
    public readonly raw: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(70);
}

export default class IntroWorld implements IWorld {
    public readonly engine: Engine;
    public readonly scene: THREE.Scene;
    public readonly camera: IntroCamera;
    public readonly resTracker: ResourceTracker;
    public readonly ambientLight: THREE.AmbientLight;
    public readonly pointLight: THREE.PointLight;

    public cube: IntroCube;

    public constructor(engine: Engine) {
        this.engine = engine;

        this.resTracker = new ResourceTracker();
        this.scene = new THREE.Scene();
        this.camera = new IntroCamera();
        this.camera.raw.position.z = 1;

        this.ambientLight = this.resTracker.track(new THREE.AmbientLight(0xFFFFFF, 0.2));
        this.pointLight = this.resTracker.track(new THREE.PointLight(0xFFFFFF, 10, 5, 10));
        this.pointLight.position.set(1, 0, 1);
        this.scene.add(this.ambientLight);
        this.scene.add(this.pointLight);

        this.cube = new IntroCube(this);
        this.scene.add(this.cube.obj());
    }

    public mainloop(delta: number) {
        this.cube.tick()
    }

    public dispose() {
        this.resTracker.dispose();
    }

    public windowResizeHook(width: number, height: number) {
        this.camera.raw.aspect = width / height;
        this.camera.raw.updateProjectionMatrix();
    }

    public addPlayer(player: PlayerState, sessionId: string): void { }
    public removePlayer(sessionId: string): void { }
}