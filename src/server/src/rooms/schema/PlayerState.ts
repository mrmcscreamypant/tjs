import { BattleState } from "./BattleState";
import Vector3State from "./Vector3State";
import { generateUUID } from "three.quarks";
import { type, Schema } from "@colyseus/schema";
import { Clock } from "colyseus";
import { DebugWeaponState } from './WeaponStates';

export default class PlayerState extends Schema {
    @type(Vector3State) position: Vector3State = new Vector3State(0, 0, 0);
    @type(Vector3State) rotation: Vector3State = new Vector3State(0, 0, 0);
    @type("number") round: number = 0;
    @type("boolean") weaponCooldown: boolean = false;

    public ROUND_SIZE: number = 5;
}