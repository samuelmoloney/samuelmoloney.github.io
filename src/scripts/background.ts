// background.ts

const canvas = document.getElementById("backgroundCanvas") as HTMLCanvasElement;
let ctx: CanvasRenderingContext2D | null;

function init(): void {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new Error("Failed to get 2D drawing context.");
    }
    // Set up animation loop
    requestAnimationFrame(draw);
}

function draw(): void {
    // Clear canvas
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    // Draw background
    drawBackground();
    // Request next frame
    requestAnimationFrame(draw);
}

function drawBackground(): void {
    if (!ctx || typeof ctx.fillStyle === 'undefined') {
        console.error("Canvas context or fillStyle property does not exist.");
        return;
    }
    ctx.fillStyle = "#000000"; // Black color
    ctx.fillRect(50, 50, 200, 200); // Draw a black square
    // Add more shapes or animations as needed
}

// Initialize everything
window.addEventListener("load", init);
