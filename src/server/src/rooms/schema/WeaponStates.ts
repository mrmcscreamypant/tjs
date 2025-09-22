import * as THREE from 'three';
import Vector3State from "./Vector3State";
import { type } from '@colyseus/schema';
import WeaponState from "./WeaponState";
import { Clock } from 'colyseus';
import { BattleState } from './BattleState';
import { generateUUID } from 'three.quarks';

export class DebugWeaponState extends WeaponState {
    @type("number") age: number = 0;
    @type(Vector3State) rotation: Vector3State;
    @type(Vector3State) vel: Vector3State = new Vector3State(0, 0, 0);

    init() {
        this.rotation = this.owner.rotation.clone();
        this.position = this.owner.position.clone();
    }

    public tick(): boolean {
        const quat = new THREE.Quaternion().setFromEuler(
            new THREE.Euler().setFromVector3(
                new THREE.Vector3().copy(this.rotation)
            )
        );
        const vec = new THREE.Vector3(-1, 0, 0).applyQuaternion(quat);
        vec.multiplyScalar(0.5);

        this.position.x += vec.x + this.vel.x;
        this.position.y += vec.y + this.vel.y;
        this.position.z += vec.z + this.vel.z;

        this.vel.y -= 0.005;

        this.age += 1;
        if (this.age > 50) {
            return false;
        }

        return true;
    }
}