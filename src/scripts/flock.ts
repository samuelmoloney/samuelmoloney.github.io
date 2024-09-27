import p5 from "p5";
import { Boid } from "./boid";
import {Quadtree} from "./quad-tree";
import { Rectangle } from "./rectangle";
import { Obstacle } from "./obstacle";
import { VectorHelper } from "./utils";
import { Circle } from "./circle";


export class Flock {
    private boids: Boid[] = [];
    private obstacles: Obstacle[] = [];
    private boidsCount: number;
    private clickObstacle: Obstacle;
    private p5i: p5;
    private quadtree: Quadtree = new Quadtree(new Rectangle(0, 0, 0, 0), 0);

    constructor(p5i: p5) {
        this.p5i = p5i;
        this.boidsCount = this.calculateBoidCountFromScreenSize();  
        this.clickObstacle = new Obstacle(0, 0, 0, this.p5i);
        this.setup();

    }

    setup() {    
      
        this.addAvoidanceObstacle(this.clickObstacle);
        for (let i = 0; i < this.boidsCount; i++) {
            let boid = new Boid(VectorHelper.random2DPos(this.p5i.width, this.p5i.height), this.p5i);
            this.boids.push(boid);
        }

        // TODO: move this to a class it shouldnt be the flock's responsibility
        this.p5i.mouseDragged = () => {
            this.clickObstacle.position = this.p5i.createVector(this.p5i.mouseX, this.p5i.mouseY);
            this.clickObstacle.radius = 400;
        }
        this.p5i.mousePressed = () => {
            this.clickObstacle.position = this.p5i.createVector(this.p5i.mouseX, this.p5i.mouseY);
            this.clickObstacle.radius = 400;
        }
        // on mouse release, remove the obstacle
        this.p5i.mouseReleased = () => {
            this.clickObstacle.position = this.p5i.createVector(0, 0);
            this.clickObstacle.radius = 0;
        }
        this.p5i.touchStarted = () => {
            this.clickObstacle.position = this.p5i.createVector(this.p5i.mouseX, this.p5i.mouseY);
            this.clickObstacle.radius = 400;
        }
        this.p5i.touchMoved = () => {
            this.clickObstacle.position = this.p5i.createVector(this.p5i.mouseX, this.p5i.mouseY);
            this.clickObstacle.radius = 400;
        }
        this.p5i.touchEnded = () => {
            this.clickObstacle.position = this.p5i.createVector(0, 0);
            this.clickObstacle.radius = 0;
        }

        this.refreshQuadtree();
    }

    refreshQuadtree() {
        let boundary = new Rectangle(0, 0, this.p5i.width, this.p5i.height);
        this.quadtree = new Quadtree(boundary, 1);
        for (let boid of this.boids) {
            this.quadtree.insert(boid);
        }
        for (let obstacle of this.obstacles) {
            this.quadtree.insert(obstacle);
        }
    }

    addAvoidanceObstacle( obstacle : Obstacle) {

        this.obstacles.push(obstacle);   
    }

    update() {
        this.refreshQuadtree();


        for (let boid of this.boids) {
            let range = new Circle(boid.position.x, boid.position.y, boid.sightRadius);
            let boidNeighbors = this.quadtree.query<Boid>(range,Boid);
            let obstacles = this.quadtree.query<Obstacle>(range,Obstacle);

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
                boid.scare(this.avoidObstacle(boid, obstacles), 100, 500);
           
            }
            
      
            boid.update();
        }

        for (let obstacle of this.obstacles) {
            obstacle.update();
        }
    }

    draw() {
        for (let boid of this.boids) {
            boid.draw();
        }
        for (let obstacle of this.obstacles) {
            obstacle.draw();
        }
       this.quadtree.draw(this.p5i);
    }

    private calculateBoidCountFromScreenSize(): number {
        let minDimension = Math.min(this.p5i.width, this.p5i.height);
        return Math.floor(minDimension / 20);
    }

    private avoidObstacle(boid: Boid, obstacles: Obstacle[]): p5.Vector {

        let steer = this.p5i.createVector();
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
                let scale = this.p5i.map(distance, 0, boid.sightRadius, 1, 0);  // Scale based on actual distance
            
                // Steering force calculation
                 steer = p5.Vector.sub(desired, boid.velocity);
                steer.normalize();
                steer.mult(scale);  // Scale the force by proximity to the obstacle

              }
        }
        return steer;
    }

    private alignment(boid: Boid, neighbors: Boid[]): p5.Vector {
        if (neighbors.length === 0) return this.p5i.createVector();
    
        let sum = this.p5i.createVector();
        for (let n of neighbors) {
            sum.add(n.velocity);  // Sum the velocities of all neighbors
        }
        let averageVelocity = sum.div(neighbors.length);  // Calculate average velocity
        averageVelocity.setMag(boid.maxSpeed);  // Set the magnitude to max speed
    
        let steer = p5.Vector.sub(averageVelocity, boid.velocity);  // Steering = Desired - Current Velocity
        steer.limit(boid.maxSpeed * boid.desiredAlignment);  // Apply the desiredAlignment factor
    
        return steer;
    }

    private cohesion(boid: Boid, neighbors: Boid[]): p5.Vector {
        if (neighbors.length === 0) return this.p5i.createVector();
    
        let sum = this.p5i.createVector();
        for (let n of neighbors) {
            sum.add(n.position);  // Sum the positions of all neighbors
        }
        let averagePosition = sum.div(neighbors.length);  // Calculate average position
        let desired = p5.Vector.sub(averagePosition, boid.position);  // Vector pointing towards the average position
    
        desired.setMag(boid.maxSpeed);  // Set the magnitude to max speed
        let steer = p5.Vector.sub(desired, boid.velocity);  // Steering = Desired - Current Velocity
        steer.limit(boid.maxSpeed * boid.desiredCohesion);  // Apply the desiredCohesion factor
    
        return steer;
    }

    private separation(boid: Boid, neighbors: Boid[]): p5.Vector {
        if (neighbors.length === 0) return this.p5i.createVector();
    
        let sum = this.p5i.createVector();
        let count = 0;
    
        for (let n of neighbors) {
            let d = this.p5i.dist(boid.position.x, boid.position.y, n.position.x, n.position.y);
            
            // Only consider neighbors that are very close
            if (d > 0 && d < boid.desiredSeparation) {
                let diff = this.p5i.createVector(boid.position.x - n.position.x, boid.position.y - n.position.y);
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
            sum.limit(boid.maxSpeed);  // Limit to maximum force
        }
    
        return sum;
    }
}

