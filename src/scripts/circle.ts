import { Boid } from "./boid";
import { Rectangle } from "./rectangle";
import { NumberHelper } from "./utils";
import p5 from "p5";

export class Circle {
    x: number;
    y: number;
    r: number;

    constructor(x: number, y: number, r: number) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    contains(position: p5.Vector): boolean {

        const d = NumberHelper.dist(position.x, position.y, this.x, this.y);
        return d <= this.r;
    }

    intersectsRectangle(range: Rectangle): boolean {
        const xDist = Math.abs(range.x - this.x);
        const yDist = Math.abs(range.y - this.y);
        
        const r = this.r;
        const w = range.w / 2;
        const h = range.h / 2;
        
        const edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);
        
        if (xDist > (r + w) || yDist > (r + h)) return false;
        if (xDist <= w || yDist <= h) return true;
        
        return edges <= Math.pow(r, 2);
    }

    intersectsCircle(other: Circle): boolean {
        const d = NumberHelper.dist(this.x, this.y, other.x, other.y);
        return d <= this.r + other.r;
    }

    draw(p5: p5) {
        p5.fill(255, 0, 0, 100);
        p5.ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }
}
