import { Schema, MapSchema, type } from "@colyseus/schema";
import WeaponState from "./WeaponState";
import PlayerState from "./PlayerState";

export class BattleState extends Schema {
    @type("string") motd: string = "Hello world";

    @type({ map: PlayerState }) players: MapSchema<PlayerState> = new MapSchema();
    @type({ map: WeaponState }) activeWeapons: MapSchema<WeaponState> = new MapSchema();
}