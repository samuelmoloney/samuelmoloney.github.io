
import p5 from "p5";
export class NumberHelper
{
    static  getRandomNumber(min:number, max:number): number {
        return Math.random() * (max - min) + min;
    }

    static dist( x1:number, y1:number, x2:number, y2:number): number {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    static map(value: number, start1: number, stop1: number, start2: number, stop2: number): number {
        return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
      }
      

      static mapSize(index: number, total: number, minSize: number, maxSize: number): number {
        let middle = total / 2;
        let normalizedIndex = Math.abs(index - middle) / middle;
        return this.lerp(maxSize,minSize, 1 - normalizedIndex);  // Inverse relationship for bulge
    }
    static lerp(start: number, stop: number, amt: number): number {
        return start + (stop - start) * amt;
    }
}

export class TypeHelper
{
    public static isType<T>(value: any): value is T {
        return typeof value === 'object' && value !== null;
      }

    
}

export class VectorHelper
{
    static random2DPos(width: number, height: number): p5.Vector {
        return new p5.Vector(
            Math.random() * width,
            Math.random() * height,
        );
    }
}