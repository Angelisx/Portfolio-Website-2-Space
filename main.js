import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import Stats from "three/addons/libs/stats.module.js";

let container, stats;
let camera, scene, raycaster, renderer;

let INTERSECTED;
let theta = 0;

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
  camera.position.setZ(9);
  camera.position.setX(0);
  camera.position.setY(5);
  camera.lookAt(scene.position);

  container = document.createElement("div");
  document.body.appendChild(container);


 
  raycaster = new THREE.Raycaster();

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  stats = new Stats();
  container.appendChild(stats.dom);

  document.addEventListener("mousemove", onPointerMove);

  //

  window.addEventListener("resize", onWindowResize);
}

function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}



function render() {

  theta += 0.1;

  camera.lookAt( scene.position );

  camera.updateMatrixWorld();

  // find intersections

  raycaster.setFromCamera( pointer, camera );

  const intersects = raycaster.intersectObjects( scene.children, false );

  if ( intersects.length > 0 ) {

    if ( INTERSECTED != intersects[ 0 ].object ) {

      if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

      INTERSECTED = intersects[ 0 ].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      INTERSECTED.material.emissive.setHex( 0xff0000 );

    }

  } else {

    if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

    INTERSECTED = null;

  }



}


const spheregeometry = new THREE.SphereGeometry( 0.5, 32, 16 );
const spherematerial = new THREE.MeshStandardMaterial( { color: 0xae15d4} );
const sphere = new THREE.Mesh( spheregeometry, spherematerial );
sphere.position.set(3.8,4.3,0);
scene.add( sphere )















//spaceTexture
const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = true;
controls.maxPolarAngle = Math.PI / 2;

//square
// const geometry = new THREE.BoxGeometry(3, 3, 3);
// const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
// const cube = new THREE.Mesh(geometry, material);
// cube.position.y = 1.5;
// scene.add(cube);



//light source

  const pointlight = new THREE.PointLight(0xffffff);
  pointlight.position.set(5, 5, 5);
  const light = new THREE.AmbientLight( 0x404040 ); // soft white light
  scene.add( pointlight );

function model() {
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
}
// //helpers
// const lighthelper = new THREE.PointLightHelper(pointlight);
// const gridhelper = new THREE.GridHelper(200, 50);
// scene.add(lighthelper, gridhelper);

// //window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
function Cameraspin() {
  controls.update();

  controls.autoRotate = false;
  controls.autoRotateSpeed = -2;
}
function animate() {
  requestAnimationFrame(animate);
  // group.rotation += 0.005;
  setTimeout(Cameraspin, 1000);
  renderer.render(scene, camera);
  stats.update();
  model();
  render();
  Light();

}

animate();
