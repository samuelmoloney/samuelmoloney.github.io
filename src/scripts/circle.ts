import { Boid } from "./boid";
import { Rectangle } from "./rectangle";
import { NumberHelper } from "./utils";

export class Circle {
    x: number;
    y: number;
    r: number;

    constructor(x: number, y: number, r: number) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    contains(boid: Boid): boolean {

        const d = NumberHelper.dist(boid.position.x, boid.position.y, this.x, this.y);
        return d <= this.r;
    }

    intersects(range: Rectangle): boolean {
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
}
