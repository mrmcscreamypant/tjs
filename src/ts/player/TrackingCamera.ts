import * as THREE from 'three';
import ICamera from '../engine/ICamera';

export default class TrackingCamera implements ICamera {
    public readonly raw: THREE.PerspectiveCamera;
    public target: THREE.Vector3;

    constructor() {
        this.raw = new THREE.PerspectiveCamera(70);
        this.target = new THREE.Vector3(0, 0, 0);
    }

    tick() {
        this.raw.position.add(
            this.target.clone().sub(this.raw.position)
            .divideScalar(5)
        )
    }
}