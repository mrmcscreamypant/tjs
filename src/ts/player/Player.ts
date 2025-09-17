import * as THREE from 'three';
import IObject from "../engine/IObject";
import ITickedObject from '../engine/ITickedObject';
import { TeapotGeometry } from 'three/addons/geometries/TeapotGeometry.js';
import IWorld from '../engine/IWorld';

export default class Player implements IObject, ITickedObject {
    public readonly world: IWorld;

    constructor(world: IWorld) {
        this.world = world;
    }

    public obj(): THREE.Object3D {
        const geom = new TeapotGeometry(0.2, 10);
        const material = new THREE.MeshMatcapMaterial();
        const mesh = new THREE.Mesh(geom, material);
        return mesh;
    }

    public tick() {

    }
}