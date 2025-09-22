import { Schema, type } from "@colyseus/schema";
import PlayerState from "./PlayerState";
import Vector3State from "./Vector3State";
import { BattleState } from "./BattleState";
import { Clock } from "colyseus";
import uuid4 from 'uuid4';
import { DebugWeaponState } from "./WeaponStates";

export default abstract class WeaponState extends Schema {
    @type(Vector3State) position: Vector3State = new Vector3State(0, 0, 0);
    @type(PlayerState) owner: PlayerState; // Han shot first

    constructor(owner: PlayerState) {
        super();
        this.owner = owner;

        this.init();
    }

    public abstract init(): void;
    public abstract tick(): boolean;

    public static fire(sessionId: string, state: BattleState, weaponClass: typeof DebugWeaponState, clock: Clock): void {
        const player = state.players.get(sessionId);

        if (player.weaponCooldown) return;

        const weapon = new weaponClass(player);
        const uuid = uuid4();
        player.weaponCooldown = true;
        clock.setTimeout(() => {
            player.weaponCooldown = false;
        }, 250);

        state.activeWeapons.set(uuid, weapon);
        const handler = clock.setInterval(() => {
            if (!weapon.tick()) {
                if (state.activeWeapons.has(uuid)) {
                    state.activeWeapons.delete(uuid);
                    handler.clear();
                }
            }
        }, 1 / 60 * 1000);
    }
}
