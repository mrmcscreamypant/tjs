import * as THREE from 'three';

import { DebugWeaponState } from "../../server/src/rooms/schema/WeaponStates";
import Weapon from "./Weapon";

export default class Debug extends Weapon<DebugWeaponState> {
    private mesh: THREE.Mesh;

    public init() {
        const geo = new THREE.SphereGeometry(0.2);
        const mat = new THREE.MeshNormalMaterial();
        this.mesh = new THREE.Mesh(geo, mat);
    }

    public tick(): void {
        this.mesh.position.copy(this.networkInstance.position)
    }

    public obj(): THREE.Object3D {
        return this.mesh
    }
}