import { Client, getStateCallbacks, Room } from 'colyseus.js';
import PlayerState from '../../../server/src/rooms/schema/PlayerState';
import Debug from '../../weapons/Debug';
import DebugWorld from '../../DebugWorld';
import Weapon from '../../weapons/Weapon';

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

    $(room.state).activeWeapons.onAdd((item: any, uuid: string) => {
        const weapon = new Debug(world, item);
        world.scene.add(weapon.obj());
        world.entities[uuid] = weapon;
    });

    $(room.state).activeWeapons.onRemove((item: any, uuid: string) => {
        const weapon: Weapon<any> = world.entities[uuid];
        world.scene.remove(weapon.obj());
        weapon.dispose();
        world.entities.delete(uuid);
    });

    return room;
}