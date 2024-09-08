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
    flock.draw();

    };
};

export default sketch;

new p5(sketch);



