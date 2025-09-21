import * as THREE from 'three';

import Player from "./Player";
import { PlayerState } from "../../server/src/rooms/schema/BattleState";
import DebugWorld from "../DebugWorld";

export default class NetworkPlayer extends Player {
    public readonly state: PlayerState;

    constructor(world: DebugWorld, state: PlayerState) {
        super(world);
        this.state = state;
    }

    handleInputs() {
        const pos = new THREE.Vector3(
            this.state.position.x,
            this.state.position.y,
            this.state.position.z
        )

        const rot = new THREE.Vector3(
            this.state.rotation.x,
            this.state.rotation.y,
            this.state.rotation.z
        )

        this.obj().position.add(pos.sub(this.obj().position.clone()).divideScalar(3));
        this.obj().rotation.setFromVector3(rot, this.obj().rotation.order);
    }
}