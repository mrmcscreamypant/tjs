import { Schema, MapSchema, SetSchema, type } from "@colyseus/schema";

export class Vector3State extends Schema {
    @type("number") x: number;
    @type("number") y: number;
    @type("number") z: number;

    constructor(x: number, y: number, z: number) {
        super();
        this.x = x;
        this.y = y;
        this.z = z
    }
}

export class PlayerState extends Schema {
    @type(Vector3State) position: Vector3State = new Vector3State(0, 0, 0);
    @type(Vector3State) rotation: Vector3State = new Vector3State(0, 0, 0);
}

export abstract class WeaponState extends Schema {
    @type(Vector3State) position: Vector3State = new Vector3State(0, 0, 0);
    @type(PlayerState) owner: PlayerState; // Han shot first

    constructor(owner: PlayerState) {
        super();
        this.owner = owner;

        this.init();
    }

    public abstract init(): void;
    public abstract tick(): boolean;
}

export class BattleState extends Schema {
    @type("string") motd: string = "Hello world";

    @type({ map: PlayerState }) players: MapSchema<PlayerState> = new MapSchema();
    @type({ collection: WeaponState }) activeWeapons: SetSchema<WeaponState> = new SetSchema();
}