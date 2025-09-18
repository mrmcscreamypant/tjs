import * as THREE from 'three';

export default abstract class Object {
    public abstract obj(): THREE.Object3D;
}