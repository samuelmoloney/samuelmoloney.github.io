
import p5 from 'p5';
import { Fish } from './fish';

export class Boid {
    p5 : p5;
    position : p5.Vector;
    velocity : p5.Vector;
    acceleration : p5.Vector;
    fov : number = 25;
    sightRadius : number = 50;
    maxForce : number = 0.03;
    maxSpeed : number = 0.08;
    desiredSeparation : number = 30;
    desiredAlignment : number = 25;
    desiredCohesion : number = 25;

    // fish model
    fish : Fish ;
    


    getSteeringDirection() : p5.Vector { 

        return this.velocity.copy().normalize();
    }

  // Method to check if another boid is within the boid's cone of vision
  isInCone(other: Boid): boolean {
    const vecToOther = p5.Vector.sub(other.position, this.position);
    const distanceToOther = vecToOther.mag();

    if (distanceToOther > this.sightRadius) {
      return false; // Outside the distance range
    }

    const angleBetween = p5.Vector.angleBetween(this.getSteeringDirection(), vecToOther);

    return angleBetween < this.fov / 2; // Check if within the FOV
  }

    addForce(force: p5.Vector) {
        this.acceleration.add(force);
        this.acceleration.limit(this.maxForce);
    }

    constructor( position : p5.Vector, p5: p5) {
        // assigning the p5 instance to the p5 property for reference
        this.p5 = p5;

        // setting the position information
        this.position = position;
        this.velocity = p5.createVector(0, 0);
        // randomize the velocity for now
        this.velocity = p5.createVector(p5.random(-1, 1), p5.random(-1, 1));
        this.velocity.setMag(p5.random(0.5,this.maxSpeed));
        this.acceleration = p5.createVector(0, 0);
        // create a fish model
        this.fish = new Fish(this.position, 8);
    
    }


    update() 
    {
        let dt = this.p5.deltaTime;
        this.position.add(this.velocity.mult(dt));
        this.velocity.add(this.acceleration.mult(dt));
        this.velocity.limit(this.maxSpeed);
        this.worldWrap();
        this.acceleration = this.p5.createVector(0, 0);

        // update the fish model
        this.fish.update(this.position, this.getSteeringDirection());
    }

    private  worldWrap() {
        if (this.position.x > this.p5.width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = this.p5.width;
        }
        if (this.position.y > this.p5.height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = this.p5.height;
        }
    }

    draw() {
        // draw the fish model
        this.fish.draw(this.p5);
        // this.p5.fill(0);
        // this.p5.ellipse(this.position.x, this.position.y, 5, 5);
    }
}
