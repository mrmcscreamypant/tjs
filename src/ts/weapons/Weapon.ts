import { WeaponState } from "../../server/src/rooms/schema/BattleState";
import DebugWorld from "../DebugWorld";
import GameObject from "../engine/GameObject";
import ITickedObject from "../engine/ITickedObject";
import ResourceTracker from '../engine/ResourceTracker';

export default abstract class Weapon<State extends WeaponState> extends GameObject implements ITickedObject {
    public readonly world: DebugWorld;
    public readonly networkInstance: State;

    public readonly tracker: ResourceTracker;

    //TODO: add more attributes for things like icons, cooldowns, etc...

    constructor(world: DebugWorld, networkInstance: State) {
        super();
        this.world = world;
        this.networkInstance = networkInstance;
        this.tracker = new ResourceTracker();

        this.init();
    }

    public abstract init(): void;
    public abstract tick(): void;
}