import p5 from "p5";
import { Boid } from "./boid";
import {Quadtree} from "./quad-tree";
import { Rectangle } from "./rectangle";
import { Obsticle } from "./obsticle";
import { VectorHelper } from "./utils";
import { Circle } from "./circle";


export class Flock {
    private boids: Boid[] = [];
    private obstacles: Obsticle[] = [];
    private boidsCount: number = 500;
    private p5instance: p5;
    private quadtree: Quadtree = new Quadtree(new Rectangle(0, 0, 0, 0), 0);

    constructor(p5instance: p5) {
        this.p5instance = p5instance;
        this.setup();

    }

    setup() {    
       
        for (let i = 0; i < this.boidsCount; i++) {
            let boid = new Boid(VectorHelper.random2DPos(this.p5instance.width, this.p5instance.height), this.p5instance);
            this.boids.push(boid);
        }
        this.p5instance.mouseClicked = () => {
            this.addAvoidanceObstacle(this.p5instance.mouseX, this.p5instance.mouseY, 200);
        }
        this.refreshQuadtree();
    }

    refreshQuadtree() {
        let boundary = new Rectangle(0, 0, this.p5instance.width, this.p5instance.height);
        this.quadtree = new Quadtree(boundary, 1);
        for (let boid of this.boids) {
            this.quadtree.insert(boid);
        }
        for (let obstacle of this.obstacles) {
            this.quadtree.insert(obstacle);
        }
    }

    addAvoidanceObstacle(x: number, y: number, radius: number) {
        let obstacle = new Obsticle(x, y, radius);
        this.obstacles.push(obstacle);
   
    }

    update() {
        this.refreshQuadtree();


        for (let boid of this.boids) {
            let range = new Circle(boid.position.x, boid.position.y, boid.sightRadius);
            let boidNeighbors = this.quadtree.query<Boid>(range,Boid);
            let obstacles = this.quadtree.query<Obsticle>(range,Obsticle);

            if(boidNeighbors !== undefined)
            {
            // remove any boids outside of the cone of vision
            boidNeighbors = boidNeighbors.filter(n => boid.isInCone(n));
                
            let alignment = this.alignment(boid, boidNeighbors);
            let cohesion = this.cohesion(boid, boidNeighbors);
            let separation = this.separation(boid, boidNeighbors);  
  
            boid.addForce(alignment);
            boid.addForce(cohesion);
            boid.addForce(separation);
            }

            if (obstacles !== undefined) {
                let avoidObstacle = this.avoidObstacle(boid, obstacles);
                boid.addForce(avoidObstacle);
            }
            
      
            boid.update();
        }

        for (let obstacle of this.obstacles) {
            obstacle.update(this.p5instance.deltaTime);
        }
    }

    draw() {
        for (let boid of this.boids) {
            boid.draw(this.p5instance);
        }
        for (let obstacle of this.obstacles) {
            obstacle.draw(this.p5instance);
        }
       //this.quadtree.draw(this.p5instance);
    }

    private avoidObstacle(boid: Boid, obstacles: Obsticle[]): p5.Vector {

        let steer = this.p5instance.createVector();
        for (let obstacle of obstacles) { 
                    
            let obsticleCircle  = new Circle(obstacle.position.x, obstacle.position.y, obstacle.radius * 2.0);
            let boidCircle = new Circle(boid.position.x, boid.position.y, boid.sightRadius);

            if (obsticleCircle.intersectsCircle(boidCircle)) {

                // Calculate the distance between the boid and the obstacle
                let distance = p5.Vector.dist(boid.position, obstacle.position) - obstacle.radius;
            
                // Calculate the direction vector away from the obstacle
                let desired = p5.Vector.sub(boid.position, obstacle.position);
                desired.normalize();
            
                // Scale the force based on the distance (stronger when closer)
                let scale = this.p5instance.map(distance, 0, boid.sightRadius, 1, 0);  // Scale based on actual distance
            
                // Steering force calculation
                 steer = p5.Vector.sub(desired, boid.velocity);
                steer.normalize();
                steer.mult(scale);  // Scale the force by proximity to the obstacle
            
                // Optional: limit the steering force to avoid excessive steering
                steer.limit(boid.maxForce);
              }
        }
        return steer;
    }

    private alignment(boid: Boid, neighbors: Boid[]): p5.Vector {
        if (neighbors.length === 0) return this.p5instance.createVector();
    
        let sum = this.p5instance.createVector();
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
        if (neighbors.length === 0) return this.p5instance.createVector();
    
        let sum = this.p5instance.createVector();
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
        if (neighbors.length === 0) return this.p5instance.createVector();
    
        let sum = this.p5instance.createVector();
        let count = 0;
    
        for (let n of neighbors) {
            let d = this.p5instance.dist(boid.position.x, boid.position.y, n.position.x, n.position.y);
            
            // Only consider neighbors that are very close
            if (d > 0 && d < boid.desiredSeparation) {
                let diff = this.p5instance.createVector(boid.position.x - n.position.x, boid.position.y - n.position.y);
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

