

import "./style.css";
import { showPage } from "./script.js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as TWEEN from "@tweenjs/tween.js";

let camera, scene, renderer;
let updateControls = true;

//3d model
const spaceguy = new GLTFLoader();
spaceguy.load(
  "assets/space_boi/test models/something/spaceman3.gltf",
  function (gltf) {
    const spaceMan = gltf.scene;
    scene.add(spaceMan);


    spaceMan.traverse(function(child) {
      if (child.isMesh) {
        child.material.opacity = 1;
        child.material.transparent = true;
        }
    });
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

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
  camera.position.set(0, 8, 12);
  camera.lookAt(scene.position);
  camera.near = 0.1; // the nearest distance to render
  camera.far = 25; // the farthest distance to render
  camera.updateProjectionMatrix();

  //space background
  const spaceTexture = new THREE.TextureLoader().load("assets/images/8k_stars.jpg");
  scene.background = spaceTexture;

  window.addEventListener("resize", onWindowResize);
}
function playHeartbeatAudio() {
  let Avatar_audio = new Audio("assets/Sound/HeartBeat_Loop_120bpm.mp3");
  Avatar_audio.volume = 0.09;
  Avatar_audio.play().catch(() => {});
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
    };
    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    const intersectsProjects = raycaster.intersectObjects([projectsPlanet]);
    const intersectsContact = raycaster.intersectObjects([contactPlanet]);
    const intersectsAvatar = raycaster.intersectObjects([AvatarBox]);


    if (intersectsProjects.length > 0) {
      // user clicked on the planet, animate camera to move towards the planet
      console.log("it clicks");
      updateControls = false;
  
      
      const targetPosition = projectsPlanet.position;
      const startPosition = camera.position;
      const tween = new TWEEN.Tween(startPosition)
        .to(targetPosition, 2000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          camera.position.copy(startPosition);
          camera.lookAt(projectsPlanet.position);
        })
        .onComplete(() => {
          // transition to different page after camera animation is complete
  
          camera.position.set(30, 5, 9);
          controls.target.copy(camera.position);
          camera.position.set(29, 5, 16.5);
          updateControls = true;

          showPage("page-projects");
        })
        .start();
    }
    if (intersectsContact.length > 0) {
      // user clicked on the planet, animate camera to move towards the planet
      console.log("it clicks");
      
      updateControls = false;
        
      const targetPosition = contactPlanet.position;
      const startPosition = camera.position;
      const tween = new TWEEN.Tween(startPosition)
        .to(targetPosition, 2000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          camera.position.copy(startPosition);
          camera.lookAt(contactPlanet.position);
        })
        .onComplete(() => {
          // transition to different page after camera animation is complete
          camera.position.set(30, 5, 9);
          showPage("page-contact");

        })
        .start();
    }
    if (intersectsAvatar.length > 0) {
      // user clicked on the planet, animate camera to move towards the planet
      
      playHeartbeatAudio();
    
      console.log("it clicks");
      updateControls = false;
      
      const targetPosition = AvatarBox.position;
      const startPosition = camera.position;
      const tween = new TWEEN.Tween(startPosition)
        .to(targetPosition, 2000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          camera.position.copy(startPosition);
          camera.lookAt(AvatarBox.position);
        })
        .onComplete(() => {
          // transition to different page after camera animation is complete
    
          camera.position.set(30, 5, 9);
          controls.target.copy(camera.position);
          camera.position.set(30, 5, 14);
          updateControls = true;

          showPage("page-about");
        })
        .start();
    }
    

   
  }
  

  
}

function homebutton() {
  document.addEventListener('page:home', () => {
    camera.position.set(0, 8, 12);
    controls.target.copy(scene.position);
  });
}
homebutton();

function addStar() {
  const stargeometry = new THREE.SphereGeometry(0.025, 24, 24);
  const starmaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(stargeometry, starmaterial);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(1000).fill().forEach(addStar);



const ICON_PLAYING = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 9 3 15 8 15 13 20 13 4 8 9 3 9" fill="currentColor" stroke="none"/><path d="M16 8a5 5 0 0 1 0 8"/><path d="M19.5 5a9 9 0 0 1 0 14"/></svg>';
const ICON_MUTED = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 9 3 15 8 15 13 20 13 4 8 9 3 9" fill="currentColor" stroke="none"/><line x1="17" y1="9" x2="23" y2="15"/><line x1="23" y1="9" x2="17" y2="15"/></svg>';

function music(){
  const background_music = new Audio('/assets/Sound/space-ambience-56265.mp3');
  background_music.volume = 0.10;
  const toggleButton = document.getElementById('toggle-audio');
  const audioHint = document.getElementById('audio-hint');
  let hintTimeout;

  function reflectState() {
    const playing = !background_music.paused;
    toggleButton.innerHTML = playing ? ICON_PLAYING : ICON_MUTED;
    toggleButton.classList.toggle('is-playing', playing);
    toggleButton.classList.toggle('is-muted', !playing);
    toggleButton.setAttribute('aria-label', playing ? 'Mute ambient audio' : 'Play ambient audio');
  }

  function dismissHint() {
    clearTimeout(hintTimeout);
    audioHint.classList.remove('visible');
  }

  function maybeShowHint() {
    if (!background_music.paused) return;
    audioHint.classList.add('visible');
    hintTimeout = setTimeout(dismissHint, 4500);
  }

  background_music.play().then(reflectState).catch(() => {
    reflectState();
    setTimeout(maybeShowHint, 800);
  });
  reflectState();

  toggleButton.addEventListener('click', () => {
    dismissHint();
    if (background_music.paused) {
      background_music.play().then(reflectState).catch(reflectState);
    } else {
      background_music.pause();
      reflectState();
    }
  });
}

music();


//objects
const transparentmaterial = new THREE.MeshPhongMaterial({
  color: 0xFFFFFF,
  transparent: true,
  opacity: 0,
});
const geometry = new THREE.SphereGeometry(0.4, 32, 16, true);
const material = new THREE.MeshPhongMaterial({
  color: 0x000000,
  transparent: true,
  opacity: 1,
  side: THREE.DoubleSide,
});

const projectsPlanet = new THREE.Mesh(geometry, material);
const contactPlanet = new THREE.Mesh(geometry, transparentmaterial);

projectsPlanet.position.set(3.9, 4.3, 0);
contactPlanet.position.set(-3.87, 4.55, -.84);


const Avatargeometry = new THREE.BoxGeometry( 0.8, 2.5, .8);
const Avatarmaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00,
  transparent: true,
  opacity: 0} );
const AvatarBox = new THREE.Mesh( Avatargeometry, Avatarmaterial );
AvatarBox.position.set(0, 1, 0);

const group = new THREE.Group();
group.add( AvatarBox );
group.add( projectsPlanet );
group.add( contactPlanet );
scene.add(group);




// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = true;
controls.maxPolarAngle = Math.PI / 2;


//light source
const pointlight = new THREE.PointLight(0xffffff);
pointlight.position.set(5, 5, 5);
const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(pointlight);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
function Cameraspin() {
  if (updateControls) {
    controls.update();
  }
  controls.autoRotate = true;
  controls.autoRotateSpeed = -1;
}
function animate() {
  requestAnimationFrame(animate);
  Cameraspin();
  planetclicker();
  TWEEN.update();

  renderer.render(scene, camera);
}

window.addEventListener('load', function() {
  document.getElementById('loading-screen').style.display = 'none';
  document.getElementById('bg').style.display = 'block';
});



animate();
