import p5 from 'p5';
import { Flock } from './flock';

const sketch = (p: p5) => {

    function onWindowResize(){
        const width = window.innerWidth;
        const height = window.innerHeight;
        p.resizeCanvas(width, height);
    }

    let flock : Flock;

    p.setup = () => {
    // get the full width and height of the window
    const width = window.innerWidth;
    const height = window.innerHeight;
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
    flock.draw();
    
    p.ellipse(p.mouseX, p.mouseY, 50, 50);
    };
};

export default sketch;

new p5(sketch);



