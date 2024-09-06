import { Boid } from "./boid";
import { Circle } from "./circle";

export class Rectangle {
    x: number;
    y: number;
    w: number;
    h: number;

    constructor(x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(boid: Boid): boolean {
        return (
            boid.position.x >= this.x - this.w &&
            boid.position.x < this.x + this.w &&
            boid.position.y >= this.y - this.h &&
            boid.position.y < this.y + this.h
        );
    }

    intersects(range: Circle): boolean {
        return !(
            range.x - range.r > this.x + this.w ||
            range.x + range.r < this.x - this.w ||
            range.y - range.r > this.y + this.h ||
            range.y + range.r < this.y - this.h
        );
    }
}
