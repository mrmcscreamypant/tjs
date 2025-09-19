import * as THREE from 'three';
import * as QUARKS from 'three.quarks';
import { Keys } from '../engine/Input';
import ITickedObject from '../engine/ITickedObject';
import { TeapotGeometry } from 'three/addons/geometries/TeapotGeometry.js';
import steamParticle from '../particles/steam';
import PhysicsObject from '../engine/NewtonObject';
import DebugWorld from '../DebugWorld';

export default class Player extends PhysicsObject implements ITickedObject {
    public readonly world: DebugWorld;
    private readonly mesh: THREE.Mesh;
    private readonly rotor: THREE.Mesh;
    private readonly propRotor: THREE.Mesh;

    public thrust: number = 1;

    constructor(world: DebugWorld) {
        super();
        this.world = world;

        const geom = new TeapotGeometry(0.2, 10);
        const material = new THREE.MeshPhysicalMaterial();
        this.mesh = new THREE.Mesh(geom, material);
        this.mesh.rotation.order = "YXZ";

        const rotorGeom = new THREE.BoxGeometry(1, 0.01, 0.025);
        this.rotor = new THREE.Mesh(rotorGeom, material);
        this.rotor.position.y = 0.2
        this.mesh.add(this.rotor);

        const propGeom = new THREE.BoxGeometry(0.025, 0.12, 0.01);
        this.propRotor = new THREE.Mesh(propGeom, material);
        this.propRotor.position.set(0.4, 0.1, -0.025);
        this.mesh.add(this.propRotor);

        this.mesh.add(steamParticle.emitter);
        steamParticle.emitter.position.set(0.4,0.15,0);
        this.world.particleRenderer.addSystem(steamParticle);
    }

    public obj(): THREE.Mesh {
        return this.mesh;
    }

    public tick() {
        super.tick();

        this.rotor.rotation.y += 1;
        this.propRotor.rotation.z += 0.5;

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

        if (this.world.engine.input.getKey(Keys.A)) {
            this.rotVel.x += 0.01;
        } else if (this.world.engine.input.getKey(Keys.D)) {
            this.rotVel.x -= 0.01;
        }

        if (this.world.engine.input.getKey(Keys.UP_ARROW)) {
            this.thrust += 0.1;
        } else if (this.world.engine.input.getKey(Keys.DOWN_ARROW)) {
            this.thrust -= 0.1;
        }

        this.thrust += (1 - this.thrust) / 4;

        this.rotVel.x *= 0.8;
        this.rotVel.y *= 0.9;
        this.rotVel.z *= 0.8;

        this.mesh.rotation.x *= 0.9;
        this.mesh.rotation.z *= 0.9;

        const vVel = Math.cos(this.mesh.rotation.z + this.mesh.rotation.x) * 0.01 * this.thrust;
        const hVel = Math.sin(this.mesh.rotation.z) * 0.01 * this.thrust;
        const dVel = Math.sin(this.mesh.rotation.x) * 0.01 * this.thrust;

        this.vel.x -= Math.cos(this.mesh.rotation.y) * hVel -
            Math.sin(this.mesh.rotation.y) * dVel;
        this.vel.z += Math.sin(this.mesh.rotation.y) * hVel +
            Math.cos(this.mesh.rotation.y) * dVel;

        this.vel.y += vVel;

        this.vel.multiplyScalar(0.95);

        this.world.camera.target = this.mesh.position.clone().add(
            new THREE.Vector3(
                2 * Math.cos(this.mesh.rotation.y),
                0.5,
                -2 * Math.sin(this.mesh.rotation.y)
            )
        );

        this.world.camera.raw.lookAt(this.mesh.position);
    }
}