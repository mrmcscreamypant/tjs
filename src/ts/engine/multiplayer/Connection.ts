import { Client, getStateCallbacks, Room } from 'colyseus.js';
import { PlayerState } from '../../../server/src/rooms/schema/BattleState';
import IWorld from '../IWorld';

export default async function connect(world: IWorld): Promise<Room> {
    const client = new Client('http://192.168.50.229:2567');
    const room: Room = await client.joinOrCreate('battle', {
        /* custom join options */
    });
    const $ = getStateCallbacks(room);

    // Listen to 'player' instance additions
    $(room.state).players.onAdd((player: PlayerState, sessionId) => {
        console.log('Player joined:', player);
        if (sessionId != room.sessionId) {
            world.addPlayer(player, sessionId);
        }
    });

    // Listen to 'player' instance removals
    $(room.state).players.onRemove((player: PlayerState, sessionId) => {
        console.log('Player left:', player);
    });

    return room;
}