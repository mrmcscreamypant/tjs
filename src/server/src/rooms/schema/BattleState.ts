import { Schema, MapSchema, type } from "@colyseus/schema";

export class PlayerState extends Schema {
    @type("number") x: number = 0;
    @type("number") y: number = 0;
    @type("number") z: number = 0;
}

export class BattleState extends Schema {
    @type("string") motd: string = "Hello world";

    @type({ map: PlayerState }) players = new MapSchema<PlayerState>();
}
