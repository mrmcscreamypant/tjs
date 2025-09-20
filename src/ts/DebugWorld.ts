import * as THREE from 'three';
import * as QUARKS from 'three.quarks';
import { Room } from 'colyseus.js';

import IWorld from "./engine/IWorld";
import ResourceTracker from './engine/ResourceTracker';
import Engine from './engine/Engine';
import Player from './player/Player';
import TrackingCamera from './player/TrackingCamera';

import connect from './engine/multiplayer/Connection';
import { PlayerState } from '../server/src/rooms/schema/BattleState';
import NetworkPlayer from './player/NetworkPlayer';

export default class DebugWorld implements IWorld {
    public readonly engine: Engine;

    public readonly scene: THREE.Scene;
    public readonly camera: TrackingCamera;
    public readonly resTracker: ResourceTracker;
    public readonly particleRenderer: QUARKS.BatchedRenderer;

    public connection: Room;

    public players: Map<string, NetworkPlayer> = new Map();

    public readonly player: Player;

    public constructor(engine: Engine) {
        this.engine = engine;

        this.resTracker = new ResourceTracker();
        this.scene = new THREE.Scene();
        this.camera = new TrackingCamera();

        this.particleRenderer = new QUARKS.BatchedRenderer();
        this.scene.add(this.particleRenderer);

        this.player = new Player(this);
        this.scene.add(this.player.obj());

        const light = new THREE.DirectionalLight(0xFFFFFF, 1);
        this.scene.add(light);

        const terrainGeo = new THREE.PlaneGeometry(20, 20, 20, 20);
        const terrainPlane = new THREE.Mesh(terrainGeo, new THREE.MeshPhysicalMaterial());
        terrainPlane.rotation.x = -Math.PI / 2;
        terrainPlane.position.y = 0;

        /*const planeGeometry = terrainPlane.geometry.getAttribute("position");


        for (let i = 0, l = planeGeometry.count; i < l; i++) {
            const y = Math.floor(i / 10);
            const x = i - y * 10;

            if (x === 4 || x === 5) {
                planeGeometry.setZ(i, 0);
            } else {
                planeGeometry.setZ(i, Math.random() * 48 - 24);
            }

            if (y === 0 || y === 24) {
                planeGeometry.setZ(i, -6);
            }
        }
        terrainGeo.computeVertexNormals();*/

        this.scene.add(terrainPlane);

        console.log(connect(this).then((room: Room) => { this.connection = room; }));
    }

    public addPlayer(player: PlayerState, sessionId: string): void {
        const newPlayer = new NetworkPlayer(this, player);
        this.players[sessionId] = newPlayer
        this.scene.add(newPlayer.obj());
    }

    public setPackets() {
        if (this.connection) {
            const position = this.player.obj().position.toArray().map((n) => (Math.floor(n * 10) / 10));
            this.connection.send("update_position", position);
        }
    }

    public mainloop(delta: number) {
        this.player.tick();
        this.particleRenderer.update(delta);
        this.camera.tick();
        this.setPackets();

        for (let id in this.players) {
            const networkPlayer = this.players[id];
            networkPlayer.tick();
        }
    }

    public dispose() {
        this.resTracker.dispose();
    }

    public windowResizeHook(width: number, height: number) {
        this.camera.raw.aspect = width / height;
        this.camera.raw.updateProjectionMatrix();
    }
}