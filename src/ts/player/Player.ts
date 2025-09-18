import * as THREE from 'three';
import { Keys } from '../engine/Input';
import ITickedObject from '../engine/ITickedObject';
import { TeapotGeometry } from 'three/addons/geometries/TeapotGeometry.js';
import IWorld from '../engine/IWorld';
import PhysicsObject from '../engine/NewtonObject';

export default class Player extends PhysicsObject implements ITickedObject {
    public readonly world: IWorld;
    private readonly mesh: THREE.Mesh;
    private readonly rotor: THREE.Mesh;

    constructor(world: IWorld) {
        super();
        this.world = world;

        const geom = new TeapotGeometry(0.2, 10);
        const material = new THREE.MeshNormalMaterial();
        this.mesh = new THREE.Mesh(geom, material);

        const rotorGeom = new THREE.BoxGeometry(1, 0.01, 0.05);
        this.rotor = new THREE.Mesh(rotorGeom, material);
        this.rotor.position.y = 0.2
        this.mesh.add(this.rotor);
    }

    public obj(): THREE.Mesh {
        return this.mesh;
    }

    public tick() {
        super.tick();

        this.rotor.rotation.y += 1;

        if (this.world.engine.input.getKey(Keys.W)) {
            this.rotVel.z += 0.01;
        } else if (this.world.engine.input.getKey(Keys.S)) {
            this.rotVel.z -= 0.01;
        }

        if (this.world.engine.input.getKey(Keys.LEFT_ARROW)) {
            this.rotVel.y += 0.01;
        } else if (this.world.engine.input.getKey(Keys.RIGHT_ARROW)) {
            this.rotVel.y -= 0.01;
        }

        this.rotVel.x *= 0.9;
        this.rotVel.y *= 0.9;
        this.rotVel.z *= 0.9;

        this.mesh.rotation.x *= 0.9;
        this.mesh.rotation.z *= 0.9;

        const vVel = Math.cos(this.mesh.rotation.z) * 0.01;
        const hVel = Math.sin(this.mesh.rotation.z) * 0.01;

        this.vel.x -= Math.cos(this.mesh.rotation.y) * hVel;
        this.vel.z += Math.sin(this.mesh.rotation.y) * hVel;

        this.vel.y += vVel;

        this.vel.multiplyScalar(0.95);
    }
}