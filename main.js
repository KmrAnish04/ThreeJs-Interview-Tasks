import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/orbitcontrols';

var sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(20, sizes.width/sizes.height, 1, 100);
camera.position.set(0,0,30);
scene.add(camera);

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(2);
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene,camera);


// Controls
const controls = new OrbitControls(camera, canvas);

// To simulate the 3D Environment
function animate(){
  controls.update();
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}
animate();  
