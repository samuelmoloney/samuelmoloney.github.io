
import p5 from 'p5';
import { Fish } from './fish';
import { iSceneObject } from './scene-object';

export class Boid implements iSceneObject {

    position: p5.Vector;
    velocity : p5.Vector;
    acceleration : p5.Vector;
    fov : number = 25;
    sightRadius : number = 60;
    avoidanceRadius : number = 20;
    p5i : p5;

    minSpeed : number = 0.1;
    maxSpeed : number = 0.3;
    desiredSeparation : number = 50;
    desiredAlignment : number = 25;
    desiredCohesion : number = 25;

    private currentSpeed : number ;
    private timer : number = 0;
    private interval : number = 0;
    private fish : Fish ;

    constructor( position : p5.Vector, p5i: p5) {
        // assigning the p5 instance to the p5 property for reference
        this.p5i = p5i;

        // setting the position information
        this.position = position;
        this.velocity = p5i.createVector(0, 0);
        // randomize the velocity for now
        this.velocity = p5i.createVector(p5i.random(-1, 1), p5i.random(-1, 1));
        this.velocity.setMag(p5i.random(0.5,this.maxSpeed));
        this.acceleration = p5i.createVector(0, 0);
        // set the current speed randomly
        this.currentSpeed =     p5i.random(this.minSpeed, this.maxSpeed);
        // create a fish model
        this.fish = new Fish(this.position, 10, p5i);
    
    }
  
    
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

    scare( steering: p5.Vector , intervalMin : number, intervalMax : number) {
        if(steering.mag() == 0)
        {
            return;
        }
        this.acceleration.add(steering);
        this.currentSpeed = this.maxSpeed * 2.0;
        this.interval =  this.p5i.random(intervalMin, intervalMax);
    }

    addForce(force: p5.Vector) {
        this.acceleration.add(force);
    }


    update() 
    {
        let dt = this.p5i.deltaTime;
        this.position.add(this.velocity.mult(dt));
        this.velocity.add(this.acceleration);
        // limit the velocity
        this.velocity.limit( this.currentSpeed);
        this.worldWrap();
        this.acceleration = this.p5i.createVector(0, 0);

        // update the fish model
        this.fish.update(this.position, this.velocity);

        // update the timer
        this.timer += dt;
        if (this.timer > this.interval) {
            this.timer = 0;
            this.interval = this.p5i.random(1000, 5000);
            this.currentSpeed = this.p5i.random(this.minSpeed, this.maxSpeed);
        }

    }

    private  worldWrap() {

        let padding = 100;

        if (this.position.x > this.p5i.width + padding) {
            this.position.x = -padding;
        } else if (this.position.x < -padding) {
            this.position.x = this.p5i.width + padding;
        }
        if (this.position.y > this.p5i.height + padding) {
            this.position.y = -padding;
        } else if (this.position.y < -padding) {
            this.position.y = this.p5i.height + padding;
        }
    }

    draw(): void {
        this.fish.draw();
    }
}
