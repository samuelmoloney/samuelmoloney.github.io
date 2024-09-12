import p5 from 'p5';

export interface iSceneObject {
    position: p5.Vector;
    /// p5 instance object for reference
    p5i : p5;
    
    update(...args: any[]): void;
    draw(...args: any[]): void;
  }