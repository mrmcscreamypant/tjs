import * as THREE from 'three';
import { WeaponState, Vector3State } from "./BattleState";
import { type } from '@colyseus/schema';

export class DebugWeaponState extends WeaponState {
    @type("number") age: number = 0;
    @type(Vector3State) rotation: Vector3State;

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

        this.position.x += vec.x
        this.position.y += vec.y
        this.position.z += vec.z

        this.age += 1;
        if (this.age > 10) {
            return false;
        }
        return true;
    }
}