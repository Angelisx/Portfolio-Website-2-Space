import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { clamp } from "three/src/math/MathUtils";


// Set up camera and scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(9);
camera.position.setX(0);
camera.position.setY(5);
camera.lookAt(scene.position);




const controls = new OrbitControls (camera, renderer.domElement);
// newcamera.addEventListener( 'change', animate );

controls.autoRotate = true;
controls.enabled = false

controls.maxPolarAngle = Math.PI / 2;


const clock = new THREE.Clock();

// 3d model loader
const loader = new GLTFLoader();

loader.load(
  "assets/space_boi/scene.gltf",
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);




//light source
const pointlight = new THREE.PointLight(0xffffff);
pointlight.position.set(5, 5, 5);

//helpers
const lighthelper = new THREE.PointLightHelper(pointlight);
const gridhelper = new THREE.GridHelper(200, 50);
scene.add(lighthelper, gridhelper);




var tanFOV = Math.tan( ( ( Math.PI / 180 ) * camera.fov / 2 ) );
var windowHeight = window.innerHeight;

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize( event ) {

  camera.aspect = window.innerWidth / window.innerHeight;
  
  // adjust the FOV
  camera.fov = ( 360 / Math.PI ) * Math.atan( tanFOV * ( window.innerHeight / windowHeight ) );
  
  camera.updateProjectionMatrix();
  camera.lookAt( scene.position );

  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.render( scene, camera );
    
}

function animate() {
  requestAnimationFrame(animate);
  // group.rotation += 0.005;

  controls.update();
  controls.autoRotate = true;
  controls.autoRotateSpeed = -2



  renderer.render(scene, camera);
}

animate();
