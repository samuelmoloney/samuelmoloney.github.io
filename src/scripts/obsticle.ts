import p5 from "p5";
import { iSceneObject } from "./scene-object";
export class Obsticle implements iSceneObject
{
   position: p5.Vector;
radius: number;

    constructor(x: number, y: number, r: number) {
        this.position = new p5.Vector(x, y);
        this.radius = r;
    }
    setup(): void {
     
    }
    update(dt: number): void {
      
    }

    draw(p5: p5) {
        p5.fill(255, 0, 0, 100);
        p5.ellipse(this.position.x, this.position.y, this.radius * 0.5 , this.radius *0.5);
    }
}