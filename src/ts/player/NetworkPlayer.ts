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
        this.obj().position.set(
            this.state.position.x,
            this.state.position.y,
            this.state.position.z
        );
        this.obj().rotation.set(
            this.state.rotation.x,
            this.state.rotation.y,
            this.state.rotation.z
        );
    }
}