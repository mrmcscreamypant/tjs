import * as THREE from 'three';

export default interface IObject {
    obj(): THREE.Object3D;
}