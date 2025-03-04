import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);

mesh.castShadow = true;

const groundMesh = new THREE.Mesh(
  new THREE.BoxGeometry(10, 0.5, 50),
  new THREE.MeshStandardMaterial({ color: 0x0000ff })
);

groundMesh.position.z = -3;
groundMesh.position.y = -2;

groundMesh.receiveShadow = true;

const light = new THREE.DirectionalLight(0xffffff, 10);
light.position.z = 3;

light.castShadow = true;

scene.add(mesh, light, groundMesh);

mesh.position.z = -3;
mesh.rotation.z = 1;
mesh.rotation.y = 2;

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(innerWidth, innerHeight);

renderer.render(scene, camera);

renderer.shadowMap.enabled = true;

function animate() {
  mesh.rotation.x += 0.01;
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();
