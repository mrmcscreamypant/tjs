import { Client, getStateCallbacks, Room } from 'colyseus.js';
import { PlayerState } from '../../../server/src/rooms/schema/BattleState';
import Debug from '../../weapons/Debug';
import DebugWorld from '../../DebugWorld';

export default async function connect(world: DebugWorld): Promise<Room> {
    let client: Client;
    //@ts-ignore more trouble than it's worth
    if (import.meta.env.PROD) {
        client = new Client('/api/');
    } else {
        client = new Client("http://192.168.50.229:2567");
    }
    const room: Room = await client.joinOrCreate('battle', {
        /* custom join options */
    });
    const $ = getStateCallbacks(room);

    // Listen to 'player' instance additions
    $(room.state).players.onAdd((player: PlayerState, sessionId) => {
        if (sessionId != room.sessionId) {
            world.addPlayer(player, sessionId);
        }
    });

    // Listen to 'player' instance removals
    $(room.state).players.onRemove((player: PlayerState, sessionId) => {
        if (sessionId != room.sessionId) {
            world.removePlayer(sessionId);
        }
    });

    $(room.state).activeWeapons.onAdd((item: any, idx: number) => {
        const weapon = new Debug(world, item);
        world.scene.add(weapon.obj());
        world.entities.push(weapon);
    });

    return room;
}