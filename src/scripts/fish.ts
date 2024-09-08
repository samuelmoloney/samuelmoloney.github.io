import p5 from 'p5';
import { NumberHelper } from './utils';

export class Fish {
    segments: Segment[];
    minSize: number = 5;
    maxSize: number = 20;
    lastDirection: p5.Vector = new p5.Vector(1, 0);
    smoothingFactor: number = 0.5;
   

    constructor(position : p5.Vector, segmentCount: number,) {
      this.segments = [];
  
     
      // Initialize segments, starting from head
      for (let i = 0; i < segmentCount; i++) {
        let size = 10 - i;  // Smaller size for the tail
        // map the size so it buldges out at the middle
        size = NumberHelper.mapSize(i, segmentCount, this.minSize, this.maxSize);
        let segment = new Segment(position.copy() , size * 0.4 , size);
        this.segments.push(segment);
      } 
      
    }
  
    // Update all segments
    update(position : p5.Vector, direction : p5.Vector) {
        
        
       // Smooth the direction change
       let smoothedDirection = p5.Vector.lerp(this.lastDirection, direction, this.smoothingFactor);

       this.lastDirection = smoothedDirection;  // Update the last direction


        this.segments[0].direction = smoothedDirection;  // Update the head's direction
        // Move the head to the new position
        this.segments[0].position = position;

      for (let i = 1; i <  this.segments.length; i++) {
        // Each segment follows the one in front
        this.segments[i].follow(this.segments[i - 1]);
      }

    }
  
    // Display the fish
    draw(p5: p5) {

        for (let i = 1; i <  this.segments.length; i++) {
            //console.log("drawing segment " + i + " " +  this.segments[i].position);
            // Each segment follows the one in front
            this.segments[i].draw(p5);
          }

            // draw the head
        p5.fill(0, 255);
        // rotate the head to face the direction
        p5.push();
        p5.translate(this.segments[0].position.x, this.segments[0].position.y);
        p5.rotate(this.segments[0].direction.heading());
        p5.ellipse(0, 0, 20, 20 * 0.5);
        p5.pop();
  
    }
  }
class Segment {
    position: p5.Vector;
    direction: p5.Vector;
    desiredDistance: number;
    size: number;
  
    constructor(position : p5.Vector, desiredDistance: number, size: number = 10) {
      this.position = position;
      this.direction = new p5.Vector(1, 0); 
      this.desiredDistance = desiredDistance;
        this.size = size;

    }
  
    // Move this segment to follow the parent segment
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
  
    // Display the segment
    draw(p5: p5) {
        p5.fill(0, 100);
      
        p5.push();
        p5.translate(this.position.x, this.position.y);
        p5.rotate(this.direction.heading());
        p5.ellipse(0, 0, this.size, this.size * 0.5);
        p5.pop();
        // // Scale the direction to define the size of the triangle
        // let tip = p5.createVector(this.position.x, this.position.y).add(this.direction.copy().mult(this.size));  // Tip of the triangle
    
        // // Perpendicular vectors for the left and right base points
        // let left = p5.createVector(this.position.x, this.position.y).add(
        //     this.direction.copy().rotate(p5.PI / 2).mult(this.size * 0.5)  // Rotate 90 degrees for left
        // );
        
        // let right = p5.createVector(this.position.x, this.position.y).add(
        //     this.direction.copy().rotate(-p5.PI / 2).mult(this.size * 0.5)  // Rotate -90 degrees for right
        // );
    
        // Draw the triangle
        //p5.triangle(tip.x, tip.y, left.x, left.y, right.x, right.y);
    }
    
  }


  