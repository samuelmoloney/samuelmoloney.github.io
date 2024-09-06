import { Boid } from "./boid";
import { Rectangle } from "./rectangle";
import { Circle } from "./circle";

import p5 from "p5";

export class Quadtree {
    boundary: Rectangle;
    capacity: number;
    boids: Boid[];
    divided: boolean;
    northeast?: Quadtree;
    northwest?: Quadtree;
    southeast?: Quadtree;
    southwest?: Quadtree;
    p5?: p5;
  
    constructor(boundary: Rectangle, capacity: number,) {
      this.boundary = boundary;
      this.capacity = capacity;
      this.boids = [];
      this.divided = false;
        
    }
  
    // Subdivide the quadtree into four quadrants
    subdivide(): void {
      const x = this.boundary.x;
      const y = this.boundary.y;
      const w = this.boundary.w / 2;
      const h = this.boundary.h / 2;
  
      // Correct quadrant boundaries
      const ne = new Rectangle(x + w, y - h, w, h);
      const nw = new Rectangle(x - w, y - h, w, h);
      const se = new Rectangle(x + w, y + h, w, h);
      const sw = new Rectangle(x - w, y + h, w, h);
  
      this.northeast = new Quadtree(ne, this.capacity);
      this.northwest = new Quadtree(nw, this.capacity);
      this.southeast = new Quadtree(se, this.capacity);
      this.southwest = new Quadtree(sw, this.capacity);
  
      this.divided = true;
    }
  
    // Insert a boid into the quadtree
    insert(boid: Boid): boolean {
      // Ensure boid is within boundary
      if (!this.boundary.contains(boid)) {
        return false;
      }
  
      // If capacity is not reached, add boid here
      if (this.boids.length < this.capacity) {
        this.boids.push(boid);
        return true;
      } else {
        // Subdivide if not already subdivided
        if (!this.divided) {
          this.subdivide();
        }
  
        // Insert into appropriate quadrant
        if (this.northeast?.insert(boid)) {
          return true;
        } else if (this.northwest?.insert(boid)) {
          return true;
        } else if (this.southeast?.insert(boid)) {
          return true;
        } else if (this.southwest?.insert(boid)) {
          return true;
        }
      }
  
      return false; // If no quadrant accepted the boid
    }
  
    // Query boids in a circular range
    query(range: Circle, found: Boid[] = []): Boid[] {
      if (!this.boundary.intersects(range)) {
        return found;
      }
  
      for (let boid of this.boids) {
        if (range.contains(boid)) {
          found.push(boid);
        }
      }
  
      if (this.divided) {
        this.northwest?.query(range, found);
        this.northeast?.query(range, found);
        this.southwest?.query(range, found);
        this.southeast?.query(range, found);
      }
  
      return found;
    }
    
    draw(p5: p5): void {
        // the smaller the boundary the brighter the color
        let brightness = p5.map(0, this.boundary.w, 50, 255, 0);
        // Draw the boundary of this quadtree
        p5.stroke( 0, 255, 0, 25);
        p5.noFill();
        p5.rectMode(p5.CENTER);
        p5.rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);
      
        // Recursively draw the subdivisions if the quadtree is divided
        if (this.divided) {
          this.northeast?.draw(p5);
          this.northwest?.draw(p5);
          this.southeast?.draw(p5);
          this.southwest?.draw(p5);
        }
      }
 
  }