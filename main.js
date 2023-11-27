import * as THREE from 'three'
import road1 from '/img/road1.jpg'; // Import Image Texture File

// Window Sizes
var sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Scene
const scene = new THREE.Scene();

// Texture Loader
const textureLoader = new THREE.TextureLoader();

// Plane Object
const planeGeometry = new THREE.PlaneGeometry(10,20, 20, 20);
const planeMaterial = new THREE.MeshStandardMaterial({map: textureLoader.load(road1), side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.position.set(0, -1.10, 0);
scene.add(plane);

// Cube Object
const cubeGeometry = new THREE.BoxGeometry(2,2,2,20,20,20);
const cubeMaterial = new THREE.MeshStandardMaterial({color: '#d61c3b'});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0,0,2);
cube.castShadow = true;
scene.add(cube);

// Spot Light
const spotLight = new THREE.SpotLight(undefined, 100, 30, 0.4,1,1);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024; // Improves the shadow quality
spotLight.shadow.mapSize.height = 1024;
spotLight.position.set(-2, 10, 20);
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


// Button Types
const KEY_BTN={
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight'
}

// Variables for smooth motion
const targetPosition = new THREE.Vector3();
const speed = 0.1; // value for the desired speed

// Handle keyboard input
const handleKeyDown = (event) => {
  switch (event.key) {
    case KEY_BTN.LEFT:
      console.log("Left Arrow Key Pressed");
      targetPosition.x = Math.max(targetPosition.x - 1, -4); // using min and max value for smooth cube movements
      break;
      case KEY_BTN.RIGHT:
      console.log("Right Arrow Key Pressed");
      targetPosition.x = Math.min(targetPosition.x + 1, 4); 
      break;
  }
};


// Add event listener for keydown
document.addEventListener('keydown', handleKeyDown);


// To simulate the 3D Environment at every frame
function animate(){
  cube.position.lerp(targetPosition, speed); // Smoothly move the cube towards the target position
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}
animate();  


// Code Ends Here