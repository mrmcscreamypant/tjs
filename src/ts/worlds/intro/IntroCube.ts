import * as THREE from 'three';
import IObject from '../../engine/IObject';
import IWorld from '../../engine/IWorld';
import ITickedObject from '../../engine/ITickedObject';
import { loadColorTexture } from '../../engine/AssetLoader';
import logoTexture from './logo.jpg';
import sideTexture from './side.jpg';

import DebugWorld from '../../DebugWorld';

export default class IntroCube implements IObject, ITickedObject {
    public world: IWorld;
    public readonly geometry: THREE.BoxGeometry;
    public readonly materials: THREE.MeshBasicMaterial[] = [];
    public readonly mesh: THREE.Mesh;

    private glide: THREE.Vector3 = new THREE.Vector3(2 * Math.PI, 1.5 * Math.PI, 0);
    private glideTarget: THREE.Vector3 = new THREE.Vector3(Math.PI+0.3, 0.1, Math.PI);

    constructor(world: IWorld) {
        this.world = world;

        const track = (o: any): any => (this.world.resTracker.track(o));

        this.geometry = track(new THREE.BoxGeometry(0.2, 0.2, 0.2));

        for (let i = 0; i < 5; i++) {
            this.materials.push(track(new THREE.MeshPhongMaterial(
                { map: loadColorTexture(sideTexture) }
            )));
        }
        this.materials.push(track(new THREE.MeshPhongMaterial(
            { map: loadColorTexture(logoTexture) }
        )));

        this.mesh = track(new THREE.Mesh(this.geometry, this.materials));
    }

    public obj(): THREE.Object3D {
        return this.mesh;
    }

    // I don't want to hear ANY remarks about this function
    public tick() {
        if (this.glide.distanceTo(this.glideTarget) <= 0.01) {
            this.world.engine.activeWorld = new DebugWorld(this.world.engine);
            return;
        }

        const axies: string[] = ["x", "y", "z"];

        for (let axis of axies) {
            //@ts-ignore me being efficent
            this.mesh.rotation[axis] = this.glide[axis];

            //@ts-ignore instead of doing it the 'proper' way
            this.glide[axis] += (this.glideTarget[axis] - this.glide[axis]) / 30;
        }
    }
}