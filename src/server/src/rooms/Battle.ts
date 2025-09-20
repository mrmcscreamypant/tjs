import { Room, Client } from "@colyseus/core";
import { BattleState, Player } from "./schema/BattleState";

export class Battle extends Room<BattleState> {
    public readonly maxClients = 4;
    public readonly state = new BattleState();

    public onCreate(options: any) {
        this.onMessage("set", (client, message) => {
            if (message.value) {
                this.state.motd = message.value
            }
        });
    }

    public onJoin(client: Client, options: any) {
        this.state.players.set(client.sessionId, new Player())
        console.log(client.sessionId, "joined!");
    }

    public onLeave(client: Client, consented: boolean) {
        this.state.players.delete(client.sessionId)
        console.log(client.sessionId, "left!");
    }

    publiconDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
