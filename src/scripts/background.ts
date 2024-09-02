// background.ts

import * as THREE from 'three';
import { Flock } from './flocking';

const canvas = document.getElementById("backgroundCanvas") as HTMLCanvasElement;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;


function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}


function init(): void {
    console.log(" Init ");

    // Create the scene
    scene = new THREE.Scene();
    
    // Create the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create the renderer
    renderer = new THREE.WebGLRenderer({canvas});
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Hooks
    window.addEventListener( 'resize', onWindowResize, false );

    // Create a new instance of Flock
    new Flock(scene, camera, renderer);
    
    // Set up animation loop
    requestAnimationFrame(draw);

    
}

function draw(): void {

    // Render the scene
    renderer.render(scene, camera);

    // Request next frame
    requestAnimationFrame(draw);
}


// Initialize everything
window.addEventListener("load", init);


