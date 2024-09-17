

export class Color 
{
    r: number;
    g: number;
    b: number;
    constructor(r: number, g: number, b: number)
    {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    toHex() : string
    {
        const toHex = (value: number) => value.toString(16).padStart(2, '0');
        return `#${toHex(this.r)}${toHex(this.g)}${toHex(this.b)}`;
    }
    public  fromHex(hex: string) : Color
    {
        const hexToRgb = (hex: string) => {
            const match = hex.replace(/#/, '').match(/.{1,2}/g);
            if (!match) {
              throw new Error(`Invalid hex color: ${hex}`);
            }
            return match.map((x) => parseInt(x, 16));
          };
          const [r, g, b] = hexToRgb(hex);
          return new Color(r, g, b);
    }
    toString() : string
    {
        return `rgb(${this.r},${this.g},${this.b})`;
    }
    fromString(rgb: string) : Color
    {
        const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (!match) {
          throw new Error(`Invalid rgb color: ${rgb}`);
        }
        const [, r, g, b] = match.map((x) => parseInt(x, 10));
        return new Color(r, g, b);
    }

    toArray(alpha:number) : number[]
    { 
      if(alpha == undefined)
      {
        return [this.r, this.g, this.b];
      }
        return [this.r, this.g, this.b, alpha];
    }
}
// Utility function to linearly interpolate between two values
export function lerp (start: number, end: number, t: number): number {
  return start + (end - start) * t;
};

// Convert RGB to hex
export function rgbToHex (r: number, g: number, b: number) {
  const toHex = (value: number) => value.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export function lerpColorString (startColor: string, endColor: string, t: number): string {
  const start = new Color(0, 0, 0).fromString(startColor);
  const end = new Color(0, 0, 0).fromString(endColor);
  const result = lerpColor(start, end, t);
  return result.toString();
}


// Function to perform color lerp
export function lerpColor(startColor: Color, endColor: Color, t: number): Color {

  // Interpolate each color component
  const r = Math.round(lerp(startColor.r, endColor.r, t));
  const g = Math.round(lerp(startColor.g, endColor.g, t));
  const b = Math.round(lerp(startColor.b, endColor.b, t));

  // Convert back to hex
  return new Color(r, g, b);
};


