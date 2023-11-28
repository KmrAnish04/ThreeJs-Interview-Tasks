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
cube.position.set(0,0,0);
cube.castShadow = true;
scene.add(cube);

// Spot Light
// const spotLight = new THREE.SpotLight(undefined, 100, 30, 0.4,1,1);
// spotLight.castShadow = true;
// spotLight.shadow.mapSize.width = 2048; // Improves the shadow quality
// spotLight.shadow.mapSize.height = 2048;
// spotLight.shadow.camera.left = -100
// spotLight.shadow.camera.right = 0
// spotLight.shadow.camera.top = 0
// spotLight.shadow.camera.bottom = -0
// // spotLight.shadow.bias = 0.001; // Adjust the shadow bias
// // spotLight.shadow.radius = -0.001; // Adjust the shadow bias
// spotLight.position.set(-2, 10, 12);
// scene.add(spotLight);

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);
// const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
// scene.add(spotLightCameraHelper);

// Directional Light
const dirLight = new THREE.DirectionalLight(0xffffff, 3);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048; // Improves the shadow quality
dirLight.shadow.mapSize.height = 2048;
dirLight.shadow.bias = 0.0001;
dirLight.shadow.radius = 0.0001;
dirLight.shadow.camera.left = -2
dirLight.shadow.camera.right = 2
dirLight.shadow.camera.top = 2
dirLight.shadow.camera.bottom = -2
dirLight.shadow.camera.near = 1;
dirLight.shadow.camera.far = 30;
dirLight.position.set(-2, 7, -5);
scene.add(dirLight);

// Directional Light Helper
// const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 1);
// scene.add(dirLightHelper);
// const dirLightShadowHelper = new THREE.CameraHelper(dirLight.shadow.camera);
// scene.add(dirLightShadowHelper);


// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 1, 1000);
camera.position.set(0,0,20);
scene.add(camera);

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(2);
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene,camera);


// Controls
const controls = new OrbitControls(camera, canvas);

// Window Resizing or Responsiveness
window.addEventListener('resize', ()=>{
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width/sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);
})

// To simulate the 3D Environment at every frame
function animate(){
  controls.update();
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}
animate();  
