import { Room, Client } from "@colyseus/core";
import { BattleState, PlayerState } from "./schema/BattleState";
import { DebugWeaponState } from "./schema/WeaponStates";
import { ArraySchema } from '@colyseus/schema';

export class Battle extends Room<BattleState> {
    public readonly maxClients: number = 4;
    public readonly state: BattleState = new BattleState();

    public onCreate(options: any) {
        this.onMessage("update_data", (client, message: Array<number>) => {
            this.state.players.get(client.sessionId).position.x = message[0];
            this.state.players.get(client.sessionId).position.y = message[1];
            this.state.players.get(client.sessionId).position.z = message[2];

            this.state.players.get(client.sessionId).rotation.x = message[3];
            this.state.players.get(client.sessionId).rotation.y = message[4];
            this.state.players.get(client.sessionId).rotation.z = message[5];
        });

        this.onMessage("use_weapon", (client, message: { type: string; }) => {
            const weapon = new DebugWeaponState(this.state.players.get(client.sessionId));
            this.state.activeWeapons.push(weapon);
            const handler = this.clock.setInterval(() => {
                if (!weapon.tick()) {
                    this.state.activeWeapons = new ArraySchema(
                        ...this.state.activeWeapons.filter(
                            (a) => (a !== weapon)
                        )
                    );
                    handler.clear();
                }
            }, 1 / 30);
        });
    }

    public onJoin(client: Client, options: any) {
        this.state.players.set(client.sessionId, new PlayerState());
        console.log(client.sessionId, "joined!");
    }

    public onLeave(client: Client, consented: boolean) {
        this.state.players.delete(client.sessionId);
        console.log(client.sessionId, "left!");
    }

    public onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
