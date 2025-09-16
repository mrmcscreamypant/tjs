import * as THREE from 'three';

const width = window.innerWidth, height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
camera.position.z = 1;

export default camera;