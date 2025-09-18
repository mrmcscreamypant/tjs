import * as THREE from 'three';
import IObject from "../engine/IObject";
import ITickedObject from '../engine/ITickedObject';
import { TeapotGeometry } from 'three/addons/geometries/TeapotGeometry.js';
import IWorld from '../engine/IWorld';

export default class Player implements IObject, ITickedObject {
    public readonly world: IWorld;
    private readonly mesh: THREE.Mesh;

    constructor(world: IWorld) {
        this.world = world;

        const geom = new TeapotGeometry(0.2, 10);
        const material = new THREE.MeshMatcapMaterial();
        this.mesh = new THREE.Mesh(geom, material);
    }

    public obj(): THREE.Object3D {
        return this.mesh;
    }

    public tick() {
        this.mesh.rotation.y += 0.1;
        this.mesh.rotation.z += 0.01;
        this.mesh.rotation.x += 0.005;
    }
}