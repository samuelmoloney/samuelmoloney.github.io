import p5 from "p5";
import { iSceneObject } from "./scene-object";
export class Obstacle implements iSceneObject
{
   position: p5.Vector;
radius: number;
private currentRadius: number = 0;
private time: number = 0;

    constructor(x: number, y: number, r: number) {
        this.position = new p5.Vector(x, y);
        this.radius = r;
        this.currentRadius = r;
    }
    setup(): void {
     
    }
    update(dt: number): void {
        
            this.time += dt;
            // pulse the radius of the obstacle
            this.currentRadius =  this.radius + 100 * Math.sin(0.005 * this.time );

            if( this.time > 1000000)
            {
                this.time = 0;
            }

      
    }

    draw(p5: p5) {
        p5.fill(255, 255, 255, 50);
        p5.ellipse(this.position.x, this.position.y,  this.currentRadius*0.5 ,  this.currentRadius*0.5);
    }
}