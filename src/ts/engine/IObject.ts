import * as THREE from 'three';
import IWorld from './IWorld';

export default interface IObject {
    obj(): THREE.Object3D;
}