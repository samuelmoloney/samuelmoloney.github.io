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

    contains(x :number, y :number ): boolean {
        return (
            x >= this.x - this.w &&
           x < this.x + this.w &&
            y >= this.y - this.h &&
            y < this.y + this.h
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
