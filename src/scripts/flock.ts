import p5 from "p5";
import { Boid } from "./boid";
import {Quadtree} from "./quad-tree";
import { Rectangle } from "./rectangle";
import { Circle } from "./circle";
import { VectorHelper } from "./utils";

export class Flock {
    private boids: Boid[] = [];
    private boidsCount: number = 100;
    private p5: p5;
    private quadtree: Quadtree = new Quadtree(new Rectangle(0, 0, 0, 0), 0);

    constructor(p5instance: p5) {
        this.p5 = p5instance;
        this.setup();

    }

    setup() {    
       
        for (let i = 0; i < this.boidsCount; i++) {
            let boid = new Boid(VectorHelper.random2DPos(this.p5.width, this.p5.height), this.p5);
            this.boids.push(boid);
        }
        this.refreshQuadtree();
    }

    refreshQuadtree() {
        let boundary = new Rectangle(0, 0, this.p5.width, this.p5.height);
        this.quadtree = new Quadtree(boundary, 1);
        for (let boid of this.boids) {
            this.quadtree.insert(boid);
        }
    }

    update() {
        this.refreshQuadtree();
        for (let boid of this.boids) {
            let range = new Circle(boid.position.x, boid.position.y, boid.sightRadius);
            let neighbors = this.quadtree.query(range);
            if(neighbors !== undefined){

            // remove any boids outside of the cone of vision
            neighbors = neighbors.filter(n => boid.isInCone(n));
                
            let alignment = this.alignment(boid, neighbors);
            let cohesion = this.cohesion(boid, neighbors);
            let separation = this.separation(boid, neighbors);  
            boid.addForce(alignment);
            boid.addForce(cohesion);
            boid.addForce(separation);
            }
            else
            {
            console.log("undefined");
            }
            boid.update();
        }
    }

    draw() {
        for (let boid of this.boids) {
            boid.draw();
        }

       //this.quadtree.draw(this.p5);
    }

    private alignment(boid: Boid, neighbors: Boid[]): p5.Vector {
        if (neighbors.length === 0) return this.p5.createVector();
    
        let sum = this.p5.createVector();
        for (let n of neighbors) {
            sum.add(n.velocity);  // Sum the velocities of all neighbors
        }
        let averageVelocity = sum.div(neighbors.length);  // Calculate average velocity
        averageVelocity.setMag(boid.maxSpeed);  // Set the magnitude to max speed
    
        let steer = p5.Vector.sub(averageVelocity, boid.velocity);  // Steering = Desired - Current Velocity
        steer.limit(boid.maxForce * boid.desiredAlignment);  // Apply the desiredAlignment factor
    
        return steer;
    }

    private cohesion(boid: Boid, neighbors: Boid[]): p5.Vector {
        if (neighbors.length === 0) return this.p5.createVector();
    
        let sum = this.p5.createVector();
        for (let n of neighbors) {
            sum.add(n.position);  // Sum the positions of all neighbors
        }
        let averagePosition = sum.div(neighbors.length);  // Calculate average position
        let desired = p5.Vector.sub(averagePosition, boid.position);  // Vector pointing towards the average position
    
        desired.setMag(boid.maxSpeed);  // Set the magnitude to max speed
        let steer = p5.Vector.sub(desired, boid.velocity);  // Steering = Desired - Current Velocity
        steer.limit(boid.maxForce * boid.desiredCohesion);  // Apply the desiredCohesion factor
    
        return steer;
    }

    private separation(boid: Boid, neighbors: Boid[]): p5.Vector {
        if (neighbors.length === 0) return this.p5.createVector();
    
        let sum = this.p5.createVector();
        let count = 0;
    
        for (let n of neighbors) {
            let d = this.p5.dist(boid.position.x, boid.position.y, n.position.x, n.position.y);
            
            // Only consider neighbors that are very close
            if (d > 0 && d < boid.desiredSeparation) {
                let diff = this.p5.createVector(boid.position.x - n.position.x, boid.position.y - n.position.y);
                diff.normalize();  // Normalize to get direction
                diff.div(d);  // Weight the force by distance (closer boids have stronger effect)
                sum.add(diff);
                count++;
            }
        }
    
        if (count > 0) {
            sum.div(count);  // Average the forces
        }
    
        // Scale to the boid's maximum force and apply
        if (sum.mag() > 0) {
            sum.setMag(boid.maxSpeed);  // Set magnitude to max speed
            sum.sub(boid.velocity);  // Steer towards the desired direction
            sum.limit(boid.maxForce);  // Limit to maximum force
        }
    
        return sum;
    }
}

