import * as THREE from "three";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  100
);
camera.position.set(1, 1, 1);

// const axesHelper = new THREE.AxesHelper(10);
// scene.add(axesHelper);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// パーティクル
// ジオメトリ
const particlesGeometry = new THREE.BufferGeometry();
const count = 10000;

const positionArray = new Float32Array(count * 3);
const colorArray = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) {
  positionArray[i] = (Math.random() - 0.5) * 8;
  colorArray[i] = Math.random();
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positionArray, 3)
);

particlesGeometry.setAttribute(
  "color",
  new THREE.BufferAttribute(colorArray, 3)
);

// マテリアル
const pointsMaterial = new THREE.PointsMaterial({
  size: 0.02,
  vertexColors: true,
  blending: THREE.AdditiveBlending,
});

// メッシュ
const particles = new THREE.Points(particlesGeometry, pointsMaterial);
scene.add(particles);
// コントロール
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function animate() {
  controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

animate();
