import { Client, getStateCallbacks, Room } from 'colyseus.js';

export default async function connect() {
    const client = new Client('http://192.168.50.229:2567');
    const room: Room = await client.joinOrCreate('battle', {
        /* custom join options */
    });
    const $ = getStateCallbacks(room);

    // Listen to 'player' instance additions
    $(room.state).players.onAdd((player, sessionId) => {
        console.log('Player joined:', player);
    });

    // Listen to 'player' instance removals
    $(room.state).players.onRemove((player, sessionId) => {
        console.log('Player left:', player);
    });

    return room;
}