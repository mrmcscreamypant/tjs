import * as THREE from 'three';
import { Keys } from '../engine/Input';
import ITickedObject from '../engine/ITickedObject';
import { TeapotGeometry } from 'three/addons/geometries/TeapotGeometry.js';
import IWorld from '../engine/IWorld';
import PhysicsObject from '../engine/NewtonObject';

export default class Player extends PhysicsObject implements ITickedObject {
    public readonly world: IWorld;
    private readonly mesh: THREE.Mesh;

    constructor(world: IWorld) {
        super();
        this.world = world;

        const geom = new TeapotGeometry(0.2, 10);
        const material = new THREE.MeshMatcapMaterial();
        this.mesh = new THREE.Mesh(geom, material);
    }

    public obj(): THREE.Mesh {
        return this.mesh;
    }

    public tick() {
        super.tick()

        const direction = this.mesh.getWorldDirection(new THREE.Vector3()).applyAxisAngle(new THREE.Vector3(1,0,0), -Math.PI/2);

        this.applyImpulse(direction.divideScalar(100));

        if (this.world.engine.input.getKey(Keys.LEFT_ARROW)) {
            console.log("foo")
            this.rotVel.x += 1
        }
    }
}