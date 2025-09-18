import * as THREE from 'three';

import Object from "./Object";
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';

export default abstract class NewtonObject extends Object {
    public vel: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    public rotVel: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

    public readonly hasGravity: boolean = true;

    public abstract obj(): THREE.Mesh;

    public tick() {
        this.obj().position.add(this.vel);
        this.obj().rotation.order = "YZX";
        this.obj().rotation.setFromVector3(
            new THREE.Vector3()
            .setFromEuler(this.obj().rotation)
            .add(this.rotVel)
        );

        if (this.hasGravity) {
            this.vel.y -= 0.01;
        }

        if (this.onGround) {
            this.vel.y = 0
            while (this.onGround) {
                this.obj().position.y += 0.01
            }
        }
    }

    get onGround(): boolean {
        return this.obj().position.y < -0.2;
    }

    public applyImpulse(delta: THREE.Vector3Like) {
        this.vel.add(delta);
    }
}