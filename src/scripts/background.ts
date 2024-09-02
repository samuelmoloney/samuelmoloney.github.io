// background.ts

import * as THREE from 'three';

const canvas = document.getElementById("backgroundCanvas") as HTMLCanvasElement;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let cube: THREE.Mesh;

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

    // Add a cube when the page loads
    addCube();
    
    // Set up animation loop
    requestAnimationFrame(draw);

    
}

function draw(): void {
    
    console.log("Draw Called");
    // Render the scene
    renderer.render(scene, camera);
    
    // Request next frame
    requestAnimationFrame(draw);

  
}

// Function to add objects to the scene
function addCube(): void { 
    
    console.log("addCube");
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({color: THREE.Color.NAMES.blue});
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

   
}

// Initialize everything
window.addEventListener("load", init);


// Animate the cube
function animate(): void {
    requestAnimationFrame(animate);
    
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    console.log("Animate");
}

