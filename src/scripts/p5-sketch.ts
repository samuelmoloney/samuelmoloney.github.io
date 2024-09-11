import p5 from 'p5';
import { Flock } from './flock';

const sketch = (p: p5) => {

    function onWindowResize(){
        const width = window.innerWidth * 0.99;
        const height = window.innerHeight * 0.99;
        p.resizeCanvas(width, height);
    }

    let flock : Flock;

    p.setup = () => {
    // get the full width and height of the window
    const width = window.innerWidth * 0.99;
    const height = window.innerHeight * 0.99;
    // hook for window resizing
    window.addEventListener("resize", onWindowResize);

    p.createCanvas(width, height);
    flock = new Flock(p);

    };


    p.draw = () => {
    // update methods
    flock.update();

    // drawing methods
    p.background(220);
    p.fill(175);
    p.noStroke();

    // TODO: wrap this into a class
    let screenCenter = p.createVector(p.width / 2, p.height / 2);
    let baseScreenSize = p.createVector(p.width, p.height);
    let mouseUV = p.createVector(p.mouseX / p.width, p.mouseY / p.height);
    
    let layerCount = 10;
    let parralaxStrength = 200;
    let innerSize = 0.033;
    
    for (let i = 0; i < layerCount; i++) {  
       
        const layerDepth = i * innerSize; // Increase depth for each layer
        p.push();
         p.fill(100, 100, 100, 15 * i / layerCount);
        // Calculate screen size and position for each layer
        let screenSize = baseScreenSize.copy().mult(1 - layerDepth);  // Shrink screen size
        let parallaxOffset = mouseUV.copy().sub(0.5).mult(layerDepth * parralaxStrength);  // Mouse effect for parallax
        
        // Calculate the position offset
        let position = screenCenter.copy().add(parallaxOffset);
    
        // Translate to the position and draw the rectangle
        p.translate(position.x, position.y);
        p.rectMode(p.CENTER); // Center the rectangle
        p.rect(0, 0, screenSize.x, screenSize.y, 200);
        
        p.pop();
    }


    flock.draw();

  

    };
};

export default sketch;

new p5(sketch);


