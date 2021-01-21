import * as THREE from "three";
import * as Tone from "tone";
import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Sphere } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./styles.css";

let scene, camera, renderer;
let geometry, geometry1, material, material1, cube;
let colour, intensity, light;
let ambientLight;
//let mousedown;
//let mouseup;
let synth, synthNotes;

//let raycaster, mouse, intersects;

let sceneHeight, sceneWidth;

let orbit;

let listener, sound, audioLoader;

let clock, delta, interval;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

let startButton = document.getElementById("startButton");
startButton.addEventListener("click", init);

function init() {
  //remove overlay
  let overlay = document.getElementById("overlay");
  overlay.remove();

  sceneWidth = window.innerWidth;
  sceneHeight = window.innerHeight;

  Tone.start();
  //mousedown = false; //no click

  synthNotes = [
    "C4",
    "C#4",
    "D4",
    "D#4",
    "E4",
    "F4",
    "F#4",
    "G4",
    "G#4",
    "A4",
    "A#4",
    "B4"
    //"C5"
  ];

  /*synth = new Tone.MonoSynth().toDestination(); // create an instance of a monosynth and connect it to the master output
  synth.set({
    // set some default settings
    portamento: 0.1, // a bit of glide
    volume: -10, // reduce the level by 10dB

    oscillator: {
      // set the oscillator type to sawtooth
      type: "sawtooth"
    },

    envelope: {
      // set the envelope settings
      attack: 0.005,
      release: 2.0,
      sustain: 0.5
    }
  });
*/

  //create our scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdfdfdf);

  //create camera
  camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.5,
    1000
  );

  camera.position.z = 7;

  //specify our renderer and add it to our document
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // lighting
  colour = 0xffffff;
  intensity = 1;
  light = new THREE.DirectionalLight(colour, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);
  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  // create a box to spin

  const geometry = new THREE.BoxGeometry(0.3, 1.7, 0.2);
  const geometry1 = new THREE.BoxGeometry(0.8, 3, 0.2);

  const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const material1 = new THREE.MeshBasicMaterial({ color: 0xf69a04 });

  const cubeA = new THREE.Mesh(geometry, material);
  cubeA.position.set(0.4, 0.6, 1.2);

  const cubeB = new THREE.Mesh(geometry1, material1);
  cubeB.position.set(0, 0, 1);

  const cubeC = new THREE.Mesh(geometry1, material1);
  cubeC.position.set(0.83, 0, 1);

  const cubeD = new THREE.Mesh(geometry, material);
  cubeD.position.set(1.23, 0.6, 1.2);

  const cubeE = new THREE.Mesh(geometry1, material1);
  cubeE.position.set(1.68, 0, 1);

  const cubeF = new THREE.Mesh(geometry1, material1);
  cubeF.position.set(2.53, 0, 1);

  const cubeG = new THREE.Mesh(geometry, material);
  cubeG.position.set(2.93, 0.6, 1.2);

  const cubeH = new THREE.Mesh(geometry1, material1);
  cubeH.position.set(3.38, 0, 1);

  const cubeI = new THREE.Mesh(geometry, material);
  cubeI.position.set(3.78, 0.6, 1.2);

  const cubeJ = new THREE.Mesh(geometry1, material1);
  cubeJ.position.set(4.23, 0, 1);

  const cubeK = new THREE.Mesh(geometry, material);
  cubeK.position.set(4.63, 0.6, 1.2);

  const cubeL = new THREE.Mesh(geometry1, material1);
  cubeL.position.set(5.1, 0, 1);

  const group = new THREE.Group();
  group.add(cubeA);
  group.add(cubeB);
  group.add(cubeC);
  group.add(cubeD);
  group.add(cubeE);
  group.add(cubeF);
  group.add(cubeG);
  group.add(cubeH);
  group.add(cubeI);
  group.add(cubeJ);
  group.add(cubeK);
  group.add(cubeL);

  scene.add(group);

  const synth = new Tone.Synth().toMaster();
  synth.oscillator.type = "sine";

  synth.triggerAttackRelease(synthNotes[9], "8n");
  synth.triggerAttackRelease(synthNotes[0], "8n");
  synth.triggerAttackRelease(synthNotes[2], "8n");
  synth.triggerAttackRelease(synthNotes[4], "8n");
  synth.triggerAttackRelease(synthNotes[5], "8n");
  synth.triggerAttackRelease(synthNotes[4], "8n");
  synth.triggerAttackRelease(synthNotes[2], "8n");
  synth.triggerAttackRelease(synthNotes[11], "8n");
  synth.triggerAttackRelease(synthNotes[7], "8n");

  synth.triggerAttackRelease(synthNotes[9], "8n");
  synth.triggerAttackRelease(synthNotes[11], "8n");
  synth.triggerAttackRelease(synthNotes[0], "8n");
  synth.triggerAttackRelease(synthNotes[9], "8n");
  synth.triggerAttackRelease(synthNotes[9], "8n");
  synth.triggerAttackRelease(synthNotes[8], "8n");
  synth.triggerAttackRelease(synthNotes[9], "8n");
  synth.triggerAttackRelease(synthNotes[11], "8n");
  synth.triggerAttackRelease(synthNotes[8], "8n");
  synth.triggerAttackRelease(synthNotes[4], "8n");

  synth.triggerAttackRelease(synthNotes[9], "8n");
  synth.triggerAttackRelease(synthNotes[0], "8n");
  synth.triggerAttackRelease(synthNotes[2], "8n");
  synth.triggerAttackRelease(synthNotes[4], "8n");
  synth.triggerAttackRelease(synthNotes[5], "8n");
  synth.triggerAttackRelease(synthNotes[4], "8n");
  synth.triggerAttackRelease(synthNotes[2], "8n");
  synth.triggerAttackRelease(synthNotes[11], "8n");
  synth.triggerAttackRelease(synthNotes[7], "8n");

  synth.triggerAttackRelease(synthNotes[9], "8n");
  synth.triggerAttackRelease(synthNotes[11], "8n");
  synth.triggerAttackRelease(synthNotes[0], "8n");
  synth.triggerAttackRelease(synthNotes[11], "8n");
  synth.triggerAttackRelease(synthNotes[9], "8n");
  synth.triggerAttackRelease(synthNotes[8], "8n");
  synth.triggerAttackRelease(synthNotes[6], "8n");
  synth.triggerAttackRelease(synthNotes[8], "8n");
  synth.triggerAttackRelease(synthNotes[9], "8n");
  synth.triggerAttackRelease(synthNotes[9], "8n");
  synth.triggerAttackRelease(synthNotes[9], "8n");

  //let clicked = false;

  /*cubeA.addEventListener('mousedown', e => {
    clicked = true;
    synth.triggerAttackRelease(synthNotes[0], '8n');
  });
*/

  /*cubeA.mousedown = function onMouseDown(){
  synth.triggerAttackRelease(synthNotes[0], '8n');
  };

  */

  //create the orbit controls instance so we can use the mouse move around our scene
  orbit = new OrbitControls(camera, renderer.domElement);
  orbit.enableZoom = true;

  //sound for single source and single listener

  listener = new THREE.AudioListener();
  camera.add(listener);
  sound = new THREE.PositionalAudio(listener);

  /*audioLoader = new THREE.AudioLoader();
  audioLoader.load("./sounds/CPC_Basic_Drone_Loop.mp3", function (buffer) {
    sound.setBuffer(buffer);
    sound.setRefDistance(10);
    sound.setDirectionalCone(180, 230, 0.1);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();
  }); */

  window.addEventListener("resize", onWindowResize, false);

  play();

  alert("Initialised!");
}

function onWindowResize() {
  //resize & align
  sceneHeight = window.innerHeight;
  sceneWidth = window.innerWidth;
  renderer.setSize(sceneWidth, sceneHeight);
  camera.aspect = sceneWidth / sceneHeight;
  camera.updateProjectionMatrix();
}

// start animating

function play() {
  //using the new setAnimationLoop method which means we are WebXR ready if need be
  renderer.setAnimationLoop(() => {
    update();
    render();
  });
}
// stop animating (not currently used)
function stop() {
  renderer.setAnimationLoop(null);
}

//our update function

function update() {
  orbit.update();
  //update stuff in here
  //delta += clock.getDelta();
  // update the picking ray with the camera and mouse position

  if (delta > interval) {
    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children);
    // The draw or time dependent code are here
    if (intersects.length > 0) {
      for (var i = 0; i < intersects.length; i++) {
        intersects[i].object.material.color.set(0xff0000);
      }
    }
    console.log(intersects);
    delta = delta % interval;
  }
}

// simple render function

function render() {
  renderer.render(scene, camera);
}
