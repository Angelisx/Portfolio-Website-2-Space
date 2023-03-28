import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import Stats from "three/addons/libs/stats.module.js";
import * as TWEEN from '@tweenjs/tween.js';


let container;
let camera, scene, raycaster, renderer,delta;

const pointer = new THREE.Vector2();
const radius = 100;
let updateControls = true;

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
  // camera.near = 0.1; // the nearest distance to render
  // camera.far = 30; // the farthest distance to render
  camera.updateProjectionMatrix();




  //space background
  const spaceTexture = new THREE.TextureLoader().load("space.jpg");
  scene.background = spaceTexture;


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
    const intersectsProjects = raycaster.intersectObjects([projectsPlanet]);
    const intersectsContact = raycaster.intersectObjects([contactPlanet]);


    if (intersectsProjects.length > 0) {
      // user clicked on the planet, animate camera to move towards the planet
      console.log('it clicks')
      
      updateControls = false;

      const targetPosition = projectsPlanet.position
      const startPosition = camera.position
      const tween = new TWEEN.Tween(startPosition)
      .to(targetPosition, 2000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        camera.position.copy(startPosition);
        camera.lookAt(projectsPlanet.position);
      })
      .onComplete(() => {
        // transition to different page after camera animation is complete

        camera.position.set(0, 5, 9);
      })
      .start();
    }
    if (intersectsContact.length > 0) {
      // user clicked on the planet, animate camera to move towards the planet
      console.log('it clicks')
      
      updateControls = false;

      const targetPosition = contactPlanet.position
      const startPosition = camera.position
      const tween = new TWEEN.Tween(startPosition)
      .to(targetPosition, 2000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        camera.position.copy(startPosition);
        camera.lookAt(contactPlanet.position);
      })
      .onComplete(() => {
        // transition to different page after camera animation is complete
        window.location.href = 'ContactPlanet.html';
      })
      .start();
    }
  }
}





//objects
const transparentmaterial = new THREE.MeshPhongMaterial({ color: 0x000000 ,transparent: true, opacity: 0,});
const geometry = new THREE.SphereGeometry(0.5, 32, 16, true);
const material = new THREE.MeshPhongMaterial({ color: 0x000000 ,transparent: true, opacity: 1,  side: THREE.DoubleSide});
const projectsPlanet = new THREE.Mesh(geometry,material);
const contactPlanet = new THREE.Mesh(geometry,transparentmaterial);

projectsPlanet.position.set(3.8, 4.3, 0);
contactPlanet.position.set(-3.6, 3.9, 0);

scene.add(contactPlanet,projectsPlanet);







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



//helpers
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
  if (updateControls) {
    controls.update();
  }
  controls.autoRotate = false;
  controls.autoRotateSpeed = -2;
}
function animate() {
  requestAnimationFrame(animate);
  // group.rotation += 0.005;
  setTimeout(Cameraspin, 1000);
  renderer.render(scene, camera);
  planetclicker();
  TWEEN.update();
}

helpers()
animate();
