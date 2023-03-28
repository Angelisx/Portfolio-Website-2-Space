import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import Stats from "three/addons/libs/stats.module.js";
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'


let container;
let camera, scene, raycaster, renderer,delta;

const pointer = new THREE.Vector2();
const radius = 100;

init();
function init() {
  const clock = new THREE.Clock();

  // Set up camera and scene
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGL1Renderer({
    canvas: document.querySelector("#bg"),
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.set(0, 5, 9);
  camera.lookAt(scene.position);


  const spaceTexture = new THREE.TextureLoader().load("space.jpg");
  scene.background = spaceTexture;

  container = document.createElement("div");
  document.body.appendChild(container);
  container.appendChild(renderer.domElement);
  window.addEventListener("resize", onWindowResize);
}

function planetclicker() {
  // assuming you have a planet mesh called 'planet'

  // create a raycaster object to detect clicks on the planet
  const raycaster = new THREE.Raycaster();

  // add event listener for mouse clicks
  renderer.domElement.addEventListener("click", onMouseClick, false);

  function onMouseClick(event) {
    // calculate mouse position in normalized device coordinates
    const mouse = {
      x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
      y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1,
    }
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects([planet]);


    if (intersects.length > 0) {
      // user clicked on the planet, animate camera to move towards the planet
      console.log('it clicks')
      window.location.href = 'planet.html';

    }
  }
}








const geometry = new THREE.SphereGeometry(0.5, 32, 16);
const material = new THREE.MeshStandardMaterial({ color: 0xae15d4 });
const planet = new THREE.Mesh(geometry,material);
planet.position.set(3.8, 4.3, 0);
scene.add(planet);

//spaceTexture


// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = true;
controls.maxPolarAngle = Math.PI / 2;



//light source
const pointlight = new THREE.PointLight(0xffffff);
pointlight.position.set(5, 5, 5);
const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(pointlight);

//3d model
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



// //helpers
;

function helpers() {
  const lighthelper = new THREE.PointLightHelper(pointlight);
  const gridhelper = new THREE.GridHelper(200, 50);
  scene.add(lighthelper, gridhelper);
}

// //window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
function Cameraspin() {
  controls.update();

  controls.autoRotate = true;
  controls.autoRotateSpeed = -2;
}
function animate() {
  requestAnimationFrame(animate);
  // group.rotation += 0.005;
  setTimeout(Cameraspin, 1000);
  renderer.render(scene, camera);
  planetclicker();

}

helpers()
animate();
