import { Room, Client } from "@colyseus/core";
import { BattleState, PlayerState } from "./schema/BattleState";

export class Battle extends Room<BattleState> {
    public readonly maxClients = 4;
    public readonly state = new BattleState();

    public onCreate(options: any) {
        this.onMessage("update_position", (client, message: Array<number>) => {
            this.state.players.get(client.sessionId).x = message[0];
            this.state.players.get(client.sessionId).y = message[1];
            this.state.players.get(client.sessionId).z = message[2];
        });
    }

    public onJoin(client: Client, options: any) {
        this.state.players.set(client.sessionId, new PlayerState());
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
