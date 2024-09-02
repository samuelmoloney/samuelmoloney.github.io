// focking.ts

import * as THREE from 'three';
import { GUI } from 'dat.gui'


class Boid {
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    acceleration: THREE.Vector3;
  


    maxSpeed: number;

    geometry: THREE.SphereGeometry;
    material: THREE.MeshBasicMaterial;
    mesh: THREE.Mesh;


    constructor({pos = new THREE.Vector3(), vel = new THREE.Vector3(), acc = new THREE.Vector3(), minSpeed = 1, maxSpeed = 10}) {
        this.position =pos;
        this.velocity = vel;
        this.acceleration = acc;

        this.maxSpeed = maxSpeed;

        this.geometry = new THREE.SphereGeometry(0.5);
        this.material = new THREE.MeshBasicMaterial({ color: THREEColorRepresentationHelper.getRandomColor() });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.copy(this.position);

        // apply a random force to each boid
        this.applyForce(new THREE.Vector3(Math.random() * this.maxSpeed, Math.random() *this.maxSpeed, 0.0));
        

        
    }

    applyForce(force: THREE.Vector3): void {
        
        // Convert the 3D force to 2D by ignoring the z component
        const twoDForce = new THREE.Vector3(
        force.x,
        force.y,
        0
    );

        // Clamp the magnitude of the 2D force
        twoDForce.clampLength( 0.0, this.maxSpeed );
        this.acceleration.add(twoDForce);
    }

    update(deltaTime:number): void {
        //this.acceleration.normalize();
        this.velocity.add(this.acceleration.multiplyScalar(deltaTime));
        this.velocity = THREEVector3Helper.limit(this.velocity,0.0, this.maxSpeed);
        this.position.add(this.velocity.multiplyScalar(deltaTime));
        this.acceleration.set(0, 0, 0);
        this.mesh.position.copy(this.position);
    }
}

class THREEColorRepresentationHelper
{
    static  getRandomColor(): number {
        return Math.random() * 0xFFFFFF;
    }
}


class THREEVector3Helper 
{
    static  limit( threeVec3:THREE.Vector3, minSpeed:number,  maxSpeed: number): THREE.Vector3 {
        const length = threeVec3.length();
        if (length > maxSpeed) {
            threeVec3.normalize();
            threeVec3.multiplyScalar(maxSpeed);
        }
        else if (length < minSpeed) {
            threeVec3.normalize();
            threeVec3.multiplyScalar(minSpeed);
        }
        return threeVec3;
    }
}


export class Flock {
    boids: Boid[];
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    cohesionForce: number = 0.1;
    alignmentForce: number = 0.1;
    separationForce: number = 0.1;
    renderer: THREE.WebGLRenderer;
    count: number = 1000;
    width: number = 200;
    height: number = 200;
    Zdepth: number = 200;
    minSpeed: number = 1;
    maxSpeed: number = 10;
    seperationRadius: number = 5;
    cohesionRadius: number = 5;
    alignmentRadius: number = 5;

    private lastTime: number = 0;
    private gui: GUI;


    constructor(scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
        this.boids = [];
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;

    

        this.gui = new GUI({ autoPlace: true });

        // Min Speed
        this.gui.add(this, 'minSpeed', 1, 1000, 0.0001).name('Min Speed');
        // Max Speed
        this.gui.add(this, 'maxSpeed', 1, 1000, 0.0001).name('Max Speed');
        // Radius
        this.gui.add(this, 'seperationRadius', 1, 1000, 0.0001).name('seperationRadius');
        this.gui.add(this, 'cohesionRadius', 1, 1000, 0.0001).name('cohesionRadius');
        this.gui.add(this, 'alignmentRadius', 1, 1000, 0.0001).name('alignmentRadius');

        // Cohesion Force
        this.gui.add(this, 'cohesionForce', 0, 1000, 0.0001)
            .name('Cohesion');
    
        // Alignment Force
        this.gui.add(this, 'alignmentForce', 0, 1000, 0.0001)
            .name('Alignment');
    
        // Separation Force
        this.gui.add(this, 'separationForce', 0, 1000, 0.0001)
            .name('Separation');

        // Initial setup
        this.resetFlock();

        // Set up animation loop
        requestAnimationFrame(() => this.animate());

        
        
    }

    private updateCohesion(value: number): void {
     //  console.log("Cohesion called from onchange" + value);
        this.cohesionForce = value;
    }
    
    private updateAlignment(value: number): void {
        this.alignmentForce = value;
    }
    
    private updateSeparation(value: number): void {
        this.separationForce = value;
    }

    public resetFlock() {

        // Remove all boids from the scene if any
        if(this.boids.length > 0)
        {
            for (let i = 0; i < this.boids.length; i++) {
                this.scene.remove(this.boids[i].mesh);
            }
        }

          // Initialize boids
        for (let i = 0; i < this.count; i++) {

            let randomRadiusPositionX = Math.cos(Math.random() * Math.PI * 2) * this.width;
            let randomRadiusPositionY = Math.sin(Math.random() * Math.PI * 2) * this.height; 

            const boid = new Boid(
                {
                    pos: new THREE.Vector3(randomRadiusPositionX, randomRadiusPositionY, -this.Zdepth),
                }
            );
                

            this.boids.push(boid);
            this.scene.add(boid.mesh);
            
        }
    }

    animate(): void {
        const now = performance.now();
        const deltaTime = (now - this.lastTime) / 1000;

        this.updateBoids(deltaTime);
        this.lastTime = now;
        requestAnimationFrame(() => this.animate());
    }

    updateBoids(deltaTime: number): void {      
      //  console.log("Update Boids called " + deltaTime + " Cohesion: " + this.cohesionForce + " Alignment: " + this.alignmentForce + " Separation: " + this.separationForce); 
        for (const boid of this.boids) {
            this.updateBoidParameters(boid);
            boid.update(deltaTime);
            // Apply rules
            this.cohesion(boid);
            this.separation(boid);
            this.alignment(boid);
            // Apply force to target
            const target = new THREE.Vector3(0, 0, -this.Zdepth);
            boid.applyForce( this.applyForceToTarget(boid, target));
            this.worldWrap(boid);
        }
    }
    private applyForceToTarget(boid: Boid, target: THREE.Vector3): THREE.Vector3 {
        const desired = target.clone().sub(boid.position).normalize().multiplyScalar(this.maxSpeed);
        return desired.sub(boid.velocity);
    }

    private updateBoidParameters(boid: Boid): void {
        
       
        boid.maxSpeed = this.maxSpeed;

    }


    private worldWrap(boid: Boid): void {

        let halfWidth = this.width;
        let halfHeight = this.height;

        if (boid.position.x > halfWidth) {
            boid.position.x = -halfWidth;
        } else if (boid.position.x < -halfWidth) {
            boid.position.x = halfWidth;
        }
    
        if (boid.position.y > halfHeight) {
            boid.position.y = -halfHeight;
        } else if (boid.position.y < -halfHeight) {
            boid.position.y = halfHeight
        }

        boid.position.z = -this.Zdepth;

    }

    private calculateCenter(boids: Boid[]): THREE.Vector3 {
        return boids.reduce((sum, boid) => sum.add(boid.position), new THREE.Vector3()).multiplyScalar(1/boids.length);
    }
    cohesion(boid: Boid): void {   
        const neighbors = this.getNeighbors(boid, this.seperationRadius);
        if (neighbors.length > 0) {
            const center = this.calculateCenter(neighbors);
            
            // Calculate the vector from the boid to the center
            const desired = boid.position.clone().sub(center).normalize();
            
            // Apply force towards the center
            const steer = desired.multiplyScalar(this.cohesionForce);
            boid.applyForce(steer);
        }
    }
    private calculateSeparationForce(boid: Boid, neighbors: Boid[]): THREE.Vector3 {
        const totalForce = new THREE.Vector3();
    
        for (const neighbor of neighbors) {
            if (neighbor === boid) continue;
    
            const diff = boid.position.clone().sub(neighbor.position);
            const distance = diff.length();
            const maxDistance = this.seperationRadius * 2.0;
            const forceMagnitude = (maxDistance - distance) / maxDistance;
    
            if (distance > 0 && distance < maxDistance) {
                const unitDiff = diff.normalize();
                const force = unitDiff.multiplyScalar(forceMagnitude).multiplyScalar(this.separationForce);
                totalForce.add(force);
            }
        }
    
        return totalForce;
    }
    
    separation(boid: Boid): void {
        const neighbors = this.getNeighbors(boid, this.seperationRadius);
        if (neighbors.length > 0) {
            const separationForce = this.calculateSeparationForce(boid, neighbors);
            boid.applyForce(separationForce);
        }
    }

    alignment(boid: Boid): void {
        const neighbors = this.getNeighbors(boid, this.seperationRadius * 2);
        if (neighbors.length > 0) {
            const avgVelocity = neighbors.reduce((sum, neighbor) => sum.add(neighbor.velocity), new THREE.Vector3()).divideScalar(neighbors.length);
            const desired = avgVelocity.clone().sub(boid.velocity).normalize().multiplyScalar(this.alignmentForce);
            boid.applyForce(desired);
        }
    }

    getNeighbors(boid: Boid, radius:number): Boid[] {
        const neighbors: Boid[] = [];
        for (const other of this.boids) {
            if (other !== boid && boid.position.distanceTo(other.position) < radius) {
                neighbors.push(other);
            }
        }
        return neighbors;
    }
}
