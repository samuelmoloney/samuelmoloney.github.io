import p5 from 'p5';

export interface iSceneObject {
    position: p5.Vector;
    
    setup(): void;
    update(dt: number): void;
    draw(p5instance : p5): void;
  }