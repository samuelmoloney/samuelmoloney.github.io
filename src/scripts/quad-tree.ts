
import { Rectangle } from "./rectangle";
import { Circle } from "./circle";
import p5 from "p5";
import { iSceneObject } from './scene-object';

export class Quadtree {
    boundary: Rectangle;
    capacity: number;
    depth: number = 0;
    data: iSceneObject[];
    divided: boolean;
    northeast?: Quadtree;
    northwest?: Quadtree;
    southeast?: Quadtree;
    southwest?: Quadtree;
    p5?: p5;
  
    constructor(boundary: Rectangle, capacity: number, depth: number = 0) {
      this.boundary = boundary;
      this.capacity = capacity;
      this.data = [];
      this.divided = false;
      this.depth = depth;
        
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
  
      this.northeast = new Quadtree(ne, this.capacity, this.depth + 1);
      this.northwest = new Quadtree(nw, this.capacity, this.depth + 1);
      this.southeast = new Quadtree(se, this.capacity, this.depth + 1);
      this.southwest = new Quadtree(sw, this.capacity, this.depth + 1);
  
      this.divided = true;
    }
  
    // Insert a boid into the quadtree
    insert(sceneObject: iSceneObject): boolean {
      // Ensure boid is within boundary
      if (!this.boundary.contains(sceneObject.position.x, sceneObject.position.y)) {
        return false;
      }
  
      // If capacity is not reached, add boid here
      if (this.data.length < this.capacity) {
        this.data.push(sceneObject);
        return true;
      } else {
        // Subdivide if not already subdivided
        if (!this.divided) {
          this.subdivide();
        }
  
        // Insert into appropriate quadrant
        if (this.northeast?.insert(sceneObject)) {
          return true;
        } else if (this.northwest?.insert(sceneObject)) {
          return true;
        } else if (this.southeast?.insert(sceneObject)) {
          return true;
        } else if (this.southwest?.insert(sceneObject)) {
          return true;
        }
      }
  
      return false; // If no quadrant accepted the boid
    }
  
// Query any type of objects within a circular range
query<T extends iSceneObject>(
  range: Circle, 
  typeConstructor: new (...args: any[]) => T, // Constructor function for the type T
  found: T[] = []
): T[] {
  // Check if the range intersects with the boundary
  if (!this.boundary.intersects(range)) {
    return found;
  }

  // Check all items in this quadtree node
  for (let item of this.data) {
    // Check if the item is of type T using the constructor
    if (item instanceof typeConstructor) {
      if (range.contains(item.position)) {
        found.push(item as T);
      }
    }
  }

  // Recurse into children if divided
  if (this.divided) {
    this.northwest?.query(range, typeConstructor, found);
    this.northeast?.query(range, typeConstructor, found);
    this.southwest?.query(range, typeConstructor, found);
    this.southeast?.query(range, typeConstructor, found);
  }

  return found;
}
    
    draw(p5: p5): void {


        let normalizedValue = this.depth / 5;
   
        
        // Draw the boundary of this quadtree
        p5.strokeWeight(2 * normalizedValue);
        p5.stroke( 236, 223, 204 ,(255 * normalizedValue) * 0.1);
        p5.noFill();
        p5.rectMode(p5.CENTER);
        p5.rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);
        // draw each boundary point
      
        // larger dots the smaller the quadtree
        // inverse log
        
        p5.strokeWeight(3 * normalizedValue);
        // left top
        p5.point(this.boundary.x - this.boundary.w, this.boundary.y - this.boundary.h);
        // right top
        p5.point(this.boundary.x + this.boundary.w, this.boundary.y - this.boundary.h);
        // left bottom
        p5.point(this.boundary.x - this.boundary.w, this.boundary.y + this.boundary.h);
        // right bottom
        p5.point(this.boundary.x + this.boundary.w, this.boundary.y + this.boundary.h);



      
        // Recursively draw the subdivisions if the quadtree is divided
        if (this.divided) {
          this.northeast?.draw(p5);
          this.northwest?.draw(p5);
          this.southeast?.draw(p5);
          this.southwest?.draw(p5);
        }
      }
 
  }