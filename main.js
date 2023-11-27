import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/orbitcontrols';

var sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Scene
const scene = new THREE.Scene();

// Plane Object
const planeGeometry = new THREE.PlaneGeometry(10,10, 20, 20);
const planeMaterial = new THREE.MeshStandardMaterial({side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.position.set(0, -1.1, 0);
plane.rotation.x = Math.PI/2;
scene.add(plane);

// Cube Object
const cubeGeometry = new THREE.BoxGeometry(2,2,2,20,20,20);
const cubeMaterial = new THREE.MeshStandardMaterial({color: '#d61c3b'});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0,0,2);
cube.castShadow = true;
scene.add(cube);

// Spot Light
const spotLight = new THREE.SpotLight(undefined, 100, 30, 0.5,1,1);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024; // Improves the shadow
spotLight.shadow.mapSize.height = 1024;
spotLight.position.set(-2, 10, 10);
scene.add(spotLight);


// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 1, 1000);
camera.position.set(0,0,20);
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

// To simulate the 3D Environment at every frame
// To simulate the 3D Environment at every frame
function animate(){
  controls.update();
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}
animate();  