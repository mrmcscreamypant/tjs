import * as THREE from 'three';

export default abstract class GameObject {
    public abstract obj(): THREE.Object3D;
}