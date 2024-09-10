import p5 from 'p5';
import { NumberHelper } from './utils';

export class Fish {
    segments: Segment[];
    minSize: number = 2;
    maxSize: number = 15;
    lastDirection: p5.Vector = new p5.Vector(1, 0);
    smoothingFactor: number = 0.5;

   

    constructor(position : p5.Vector, segmentCount: number,) {
      this.segments = [];
  
   let randomColor = Math.floor(Math.random() * 155);
      // Initialize segments, starting from head
      for (let i = 0; i < segmentCount; i++) {
        let size = segmentCount - i;
        // map the size so it buldges out at the middle
        size = NumberHelper.mapSize(i, segmentCount, this.minSize, this.maxSize);
        let width = size * 1.5;
        let height = size * 0.5;
        let distance = size * 0.5;
        
        let color = [randomColor, randomColor, randomColor, 100];

        if (i == 0) {
          distance = size * 0.5;  // Head is closer to the next segment
          color[3] = 255;  // Head is opaque
        }
        
        let segment = new Segment(position.copy() , distance , width, height, color);
        this.segments.push(segment);
      } 
      
  
    }
  
    // Update all segments
    update(position : p5.Vector, velocity : p5.Vector, p5instance: p5) {

  
        let direction = velocity.copy().normalize();  // Get the direction of the velocity
       // Smooth the direction change
       let smoothedDirection = p5.Vector.lerp(this.lastDirection, direction, this.smoothingFactor);

       this.lastDirection = smoothedDirection;  // Update the last direction

        this.segments[0].direction = smoothedDirection;  // Update the head's direction
        // Move the head to the new position
        this.segments[0].position = position;

      for (let i = 1; i <  this.segments.length; i++) {
        // Each segment follows the one in front
        this.segments[i].follow(this.segments[i - 1]);

        // animate only the tail
        if( i > this.segments.length * 0.5)
        {
        this.segments[i].animateTailMovement( velocity, p5instance);
        }
   
      }

    }
  
    // Display the fish
    draw(p5instance: p5) {

      
        for (let i = 0; i <  this.segments.length; i++) {
            this.segments[i].draw(p5instance);
          }
  
    }
  }
class Segment {
    position: p5.Vector;
    direction: p5.Vector;
    desiredDistance: number;
    localRotation: number;
    width: number;
    height: number;
    color: number[];
    time: number = 0;

  
    constructor(position : p5.Vector, desiredDistance: number, width: number, height: number, color: number[] = [0, 0, 0,255]) {
      this.position = position;
      this.direction = new p5.Vector(1, 0); 
      this.localRotation = 0;
      this.desiredDistance = desiredDistance;
      this.width = width;
      this.height = height;
      this.color = color;
    }
  
    /// Move this segment to follow the parent segment
    follow(parent: Segment) {
      let target = parent.position.copy();  // Copy parent's position
      let distance = p5.Vector.dist(this.position, target);  // Calculate the distance to the parent

  
      if (distance > this.desiredDistance) {
        let dir = p5.Vector.sub(target, this.position);  // Get the direction to the parent
        dir.setMag(distance - this.desiredDistance);  // Move only the excess distance
        this.position.add(dir);  // Update position
      }
  
      // Update direction to face the parent
      this.direction = p5.Vector.sub(parent.position, this.position).normalize();
    }

    /// Animate the tail movement
    /// FIX: this implementation is just a bunch of random numbers
    animateTailMovement(velocity: p5.Vector,  p5instance : p5): void {

      let mag = velocity.mag();
      let magScale = NumberHelper.map(mag, -0.05, 0.6, 0, 1);

      this.time += p5instance.deltaTime;
      if(this.time > 1000000)
      {
          this.time = 0;
      }
    
     this.localRotation =   NumberHelper.lerp(-0.4 * magScale, 0.8 * magScale,Math.sin(0.01 * this.time)); 
    }
  
    // Display the segment
    draw(p5instance: p5) {
        p5instance.fill(this.color);

        p5instance.push();
        p5instance.translate(this.position.x, this.position.y);
    
        
        p5instance.rotate(this.direction.heading());
        p5instance.rotate(this.localRotation);
   
        p5instance.ellipse(0, 0, this.width, this.height);
       
        p5instance.pop();

    }
    
  }


  