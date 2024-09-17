/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/boid.ts":
/*!*****************************!*\
  !*** ./src/scripts/boid.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Boid: () => (/* binding */ Boid)\n/* harmony export */ });\n/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! p5 */ \"./node_modules/p5/lib/p5.min.js\");\n/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(p5__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _fish__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fish */ \"./src/scripts/fish.ts\");\n\n\nclass Boid {\n    constructor(position, p5i) {\n        this.fov = 25;\n        this.sightRadius = 60;\n        this.avoidanceRadius = 20;\n        this.minSpeed = 0.1;\n        this.maxSpeed = 0.3;\n        this.desiredSeparation = 50;\n        this.desiredAlignment = 25;\n        this.desiredCohesion = 25;\n        this.timer = 0;\n        this.interval = 0;\n        // assigning the p5 instance to the p5 property for reference\n        this.p5i = p5i;\n        // setting the position information\n        this.position = position;\n        this.velocity = p5i.createVector(0, 0);\n        // randomize the velocity for now\n        this.velocity = p5i.createVector(p5i.random(-1, 1), p5i.random(-1, 1));\n        this.velocity.setMag(p5i.random(0.5, this.maxSpeed));\n        this.acceleration = p5i.createVector(0, 0);\n        // set the current speed randomly\n        this.currentSpeed = p5i.random(this.minSpeed, this.maxSpeed);\n        // create a fish model\n        this.fish = new _fish__WEBPACK_IMPORTED_MODULE_1__.Fish(this.position, 10, p5i);\n    }\n    getSteeringDirection() {\n        return this.velocity.copy().normalize();\n    }\n    // Method to check if another boid is within the boid's cone of vision\n    isInCone(other) {\n        const vecToOther = p5__WEBPACK_IMPORTED_MODULE_0___default().Vector.sub(other.position, this.position);\n        const distanceToOther = vecToOther.mag();\n        if (distanceToOther > this.sightRadius) {\n            return false; // Outside the distance range\n        }\n        const angleBetween = p5__WEBPACK_IMPORTED_MODULE_0___default().Vector.angleBetween(this.getSteeringDirection(), vecToOther);\n        return angleBetween < this.fov / 2; // Check if within the FOV\n    }\n    scare(steering, intervalMin, intervalMax) {\n        if (steering.mag() == 0) {\n            return;\n        }\n        this.acceleration.add(steering);\n        this.currentSpeed = this.maxSpeed * 2.0;\n        this.interval = this.p5i.random(intervalMin, intervalMax);\n    }\n    addForce(force) {\n        this.acceleration.add(force);\n    }\n    update() {\n        let dt = this.p5i.deltaTime;\n        this.position.add(this.velocity.mult(dt));\n        this.velocity.add(this.acceleration);\n        // limit the velocity\n        this.velocity.limit(this.currentSpeed);\n        this.worldWrap();\n        this.acceleration = this.p5i.createVector(0, 0);\n        // update the fish model\n        this.fish.update(this.position, this.velocity);\n        // update the timer\n        this.timer += dt;\n        if (this.timer > this.interval) {\n            this.timer = 0;\n            this.interval = this.p5i.random(1000, 5000);\n            this.currentSpeed = this.p5i.random(this.minSpeed, this.maxSpeed);\n        }\n    }\n    worldWrap() {\n        let padding = 100;\n        if (this.position.x > this.p5i.width + padding) {\n            this.position.x = -padding;\n        }\n        else if (this.position.x < -padding) {\n            this.position.x = this.p5i.width + padding;\n        }\n        if (this.position.y > this.p5i.height + padding) {\n            this.position.y = -padding;\n        }\n        else if (this.position.y < -padding) {\n            this.position.y = this.p5i.height + padding;\n        }\n    }\n    draw() {\n        this.fish.draw();\n    }\n}\n\n\n//# sourceURL=webpack://samuelmoloney.github.io/./src/scripts/boid.ts?");

/***/ }),

/***/ "./src/scripts/circle.ts":
/*!*******************************!*\
  !*** ./src/scripts/circle.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Circle: () => (/* binding */ Circle)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/scripts/utils.ts\");\n\nclass Circle {\n    constructor(x, y, r) {\n        this.x = x;\n        this.y = y;\n        this.r = r;\n    }\n    contains(position) {\n        const d = _utils__WEBPACK_IMPORTED_MODULE_0__.NumberHelper.dist(position.x, position.y, this.x, this.y);\n        return d <= this.r;\n    }\n    intersectsRectangle(range) {\n        const xDist = Math.abs(range.x - this.x);\n        const yDist = Math.abs(range.y - this.y);\n        const r = this.r;\n        const w = range.w / 2;\n        const h = range.h / 2;\n        const edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);\n        if (xDist > (r + w) || yDist > (r + h))\n            return false;\n        if (xDist <= w || yDist <= h)\n            return true;\n        return edges <= Math.pow(r, 2);\n    }\n    intersectsCircle(other) {\n        const d = _utils__WEBPACK_IMPORTED_MODULE_0__.NumberHelper.dist(this.x, this.y, other.x, other.y);\n        return d <= this.r + other.r;\n    }\n    draw(p5) {\n        p5.fill(255, 0, 0, 100);\n        p5.ellipse(this.x, this.y, this.r * 2, this.r * 2);\n    }\n}\n\n\n//# sourceURL=webpack://samuelmoloney.github.io/./src/scripts/circle.ts?");

/***/ }),

/***/ "./src/scripts/fish.ts":
/*!*****************************!*\
  !*** ./src/scripts/fish.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Fish: () => (/* binding */ Fish)\n/* harmony export */ });\n/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! p5 */ \"./node_modules/p5/lib/p5.min.js\");\n/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(p5__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ \"./src/scripts/utils.ts\");\n/* harmony import */ var _utils_lerpColor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/lerpColor */ \"./src/utils/lerpColor.ts\");\n\n\n\nclass Fish {\n    constructor(position, segmentCount, p5i) {\n        this.minSize = 2;\n        this.maxSize = 15;\n        this.position = new (p5__WEBPACK_IMPORTED_MODULE_0___default().Vector)(0, 0);\n        this.lastDirection = new (p5__WEBPACK_IMPORTED_MODULE_0___default().Vector)(1, 0);\n        this.smoothingFactor = 0.5;\n        this.segments = [];\n        this.p5i = p5i;\n        this.position = position;\n        let rand = Math.random();\n        //(24, 28, 20)\n        let startColor = new _utils_lerpColor__WEBPACK_IMPORTED_MODULE_2__.Color(24, 28, 20);\n        let endColor = new _utils_lerpColor__WEBPACK_IMPORTED_MODULE_2__.Color(236, 223, 204);\n        let randomColor = (0,_utils_lerpColor__WEBPACK_IMPORTED_MODULE_2__.lerpColor)(startColor, endColor, rand);\n        // Initialize segments, starting from head\n        for (let i = 0; i < segmentCount; i++) {\n            let size = segmentCount - i;\n            // map the size so it buldges out at the middle\n            size = _utils__WEBPACK_IMPORTED_MODULE_1__.NumberHelper.mapSize(i, segmentCount, this.minSize, this.maxSize);\n            let width = size * 1.5;\n            let height = size * 0.5;\n            let distance = size * 0.5;\n            // let color = randomColor;\n            if (i == 0) {\n                distance = size * 0.5; // Head is closer to the next segment\n            }\n            let segment = new Segment(this.position.copy(), distance, width, height, randomColor.toArray(i == 0 ? 255 : 100));\n            this.segments.push(segment);\n        }\n    }\n    // Update all segments\n    update(position, velocity) {\n        this.position = position;\n        let direction = velocity.copy().normalize(); // Get the direction of the velocity\n        // Smooth the direction change\n        let smoothedDirection = p5__WEBPACK_IMPORTED_MODULE_0___default().Vector.lerp(this.lastDirection, direction, this.smoothingFactor);\n        this.lastDirection = smoothedDirection; // Update the last direction\n        this.segments[0].direction = smoothedDirection; // Update the head's direction\n        // Move the head to the new position\n        this.segments[0].position = this.position;\n        for (let i = 1; i < this.segments.length; i++) {\n            // Each segment follows the one in front\n            this.segments[i].follow(this.segments[i - 1]);\n            // animate only the tail\n            if (i > this.segments.length * 0.5) {\n                this.segments[i].animateTailMovement(velocity, this.p5i);\n            }\n        }\n    }\n    // Display the fish\n    draw() {\n        for (let i = 0; i < this.segments.length; i++) {\n            this.segments[i].draw(this.p5i);\n        }\n    }\n}\nclass Segment {\n    constructor(position, desiredDistance, width, height, color = [0, 0, 0, 255]) {\n        this.time = 0;\n        this.position = position;\n        this.direction = new (p5__WEBPACK_IMPORTED_MODULE_0___default().Vector)(1, 0);\n        this.localRotation = 0;\n        this.desiredDistance = desiredDistance;\n        this.width = width;\n        this.height = height;\n        this.color = color;\n    }\n    /// Move this segment to follow the parent segment\n    follow(parent) {\n        let target = parent.position.copy(); // Copy parent's position\n        let distance = p5__WEBPACK_IMPORTED_MODULE_0___default().Vector.dist(this.position, target); // Calculate the distance to the parent\n        if (distance > this.desiredDistance) {\n            let dir = p5__WEBPACK_IMPORTED_MODULE_0___default().Vector.sub(target, this.position); // Get the direction to the parent\n            dir.setMag(distance - this.desiredDistance); // Move only the excess distance\n            this.position.add(dir); // Update position\n        }\n        // Update direction to face the parent\n        this.direction = p5__WEBPACK_IMPORTED_MODULE_0___default().Vector.sub(parent.position, this.position).normalize();\n    }\n    /// Animate the tail movement\n    /// FIX: this implementation is just a bunch of random numbers\n    animateTailMovement(velocity, p5instance) {\n        let mag = velocity.mag();\n        let magScale = _utils__WEBPACK_IMPORTED_MODULE_1__.NumberHelper.map(mag, -0.05, 0.6, 0, 1);\n        this.time += p5instance.deltaTime;\n        if (this.time > 1000000) {\n            this.time = 0;\n        }\n        this.localRotation = _utils__WEBPACK_IMPORTED_MODULE_1__.NumberHelper.lerp(-0.4 * magScale, 0.8 * magScale, Math.sin(0.01 * this.time));\n    }\n    // Display the segment\n    draw(p5instance) {\n        p5instance.fill(this.color);\n        p5instance.push();\n        p5instance.translate(this.position.x, this.position.y);\n        p5instance.rotate(this.direction.heading());\n        p5instance.rotate(this.localRotation);\n        p5instance.ellipse(0, 0, this.width, this.height);\n        p5instance.pop();\n    }\n}\n\n\n//# sourceURL=webpack://samuelmoloney.github.io/./src/scripts/fish.ts?");

/***/ }),

/***/ "./src/scripts/flock.ts":
/*!******************************!*\
  !*** ./src/scripts/flock.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Flock: () => (/* binding */ Flock)\n/* harmony export */ });\n/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! p5 */ \"./node_modules/p5/lib/p5.min.js\");\n/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(p5__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _boid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./boid */ \"./src/scripts/boid.ts\");\n/* harmony import */ var _quad_tree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./quad-tree */ \"./src/scripts/quad-tree.ts\");\n/* harmony import */ var _rectangle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rectangle */ \"./src/scripts/rectangle.ts\");\n/* harmony import */ var _obstacle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./obstacle */ \"./src/scripts/obstacle.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ \"./src/scripts/utils.ts\");\n/* harmony import */ var _circle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./circle */ \"./src/scripts/circle.ts\");\n\n\n\n\n\n\n\nclass Flock {\n    constructor(p5i) {\n        this.boids = [];\n        this.obstacles = [];\n        this.quadtree = new _quad_tree__WEBPACK_IMPORTED_MODULE_2__.Quadtree(new _rectangle__WEBPACK_IMPORTED_MODULE_3__.Rectangle(0, 0, 0, 0), 0);\n        this.p5i = p5i;\n        this.boidsCount = this.calculateBoidCountFromScreenSize();\n        this.clickObstacle = new _obstacle__WEBPACK_IMPORTED_MODULE_4__.Obstacle(0, 0, 0, this.p5i);\n        this.setup();\n    }\n    setup() {\n        this.addAvoidanceObstacle(this.clickObstacle);\n        for (let i = 0; i < this.boidsCount; i++) {\n            let boid = new _boid__WEBPACK_IMPORTED_MODULE_1__.Boid(_utils__WEBPACK_IMPORTED_MODULE_5__.VectorHelper.random2DPos(this.p5i.width, this.p5i.height), this.p5i);\n            this.boids.push(boid);\n        }\n        this.p5i.mouseDragged = () => {\n            this.clickObstacle.position = this.p5i.createVector(this.p5i.mouseX, this.p5i.mouseY);\n            this.clickObstacle.radius = 400;\n        };\n        this.p5i.mousePressed = () => {\n            this.clickObstacle.position = this.p5i.createVector(this.p5i.mouseX, this.p5i.mouseY);\n            this.clickObstacle.radius = 400;\n        };\n        // on mouse release, remove the obstacle\n        this.p5i.mouseReleased = () => {\n            this.clickObstacle.position = this.p5i.createVector(0, 0);\n            this.clickObstacle.radius = 0;\n        };\n        this.refreshQuadtree();\n    }\n    refreshQuadtree() {\n        let boundary = new _rectangle__WEBPACK_IMPORTED_MODULE_3__.Rectangle(0, 0, this.p5i.width, this.p5i.height);\n        this.quadtree = new _quad_tree__WEBPACK_IMPORTED_MODULE_2__.Quadtree(boundary, 1);\n        for (let boid of this.boids) {\n            this.quadtree.insert(boid);\n        }\n        for (let obstacle of this.obstacles) {\n            this.quadtree.insert(obstacle);\n        }\n    }\n    addAvoidanceObstacle(obstacle) {\n        this.obstacles.push(obstacle);\n    }\n    update() {\n        this.refreshQuadtree();\n        for (let boid of this.boids) {\n            let range = new _circle__WEBPACK_IMPORTED_MODULE_6__.Circle(boid.position.x, boid.position.y, boid.sightRadius);\n            let boidNeighbors = this.quadtree.query(range, _boid__WEBPACK_IMPORTED_MODULE_1__.Boid);\n            let obstacles = this.quadtree.query(range, _obstacle__WEBPACK_IMPORTED_MODULE_4__.Obstacle);\n            if (boidNeighbors !== undefined) {\n                // remove any boids outside of the cone of vision\n                boidNeighbors = boidNeighbors.filter(n => boid.isInCone(n));\n                let alignment = this.alignment(boid, boidNeighbors);\n                let cohesion = this.cohesion(boid, boidNeighbors);\n                let separation = this.separation(boid, boidNeighbors);\n                boid.addForce(alignment);\n                boid.addForce(cohesion);\n                boid.addForce(separation);\n            }\n            if (obstacles !== undefined) {\n                boid.scare(this.avoidObstacle(boid, obstacles), 100, 500);\n            }\n            boid.update();\n        }\n        for (let obstacle of this.obstacles) {\n            obstacle.update();\n        }\n    }\n    draw() {\n        for (let boid of this.boids) {\n            boid.draw();\n        }\n        for (let obstacle of this.obstacles) {\n            obstacle.draw();\n        }\n        this.quadtree.draw(this.p5i);\n    }\n    calculateBoidCountFromScreenSize() {\n        let minDimension = Math.min(this.p5i.width, this.p5i.height);\n        return Math.floor(minDimension / 10);\n    }\n    avoidObstacle(boid, obstacles) {\n        let steer = this.p5i.createVector();\n        for (let obstacle of obstacles) {\n            let obsticleCircle = new _circle__WEBPACK_IMPORTED_MODULE_6__.Circle(obstacle.position.x, obstacle.position.y, obstacle.radius * 2.0);\n            let boidCircle = new _circle__WEBPACK_IMPORTED_MODULE_6__.Circle(boid.position.x, boid.position.y, boid.sightRadius);\n            if (obsticleCircle.intersectsCircle(boidCircle)) {\n                // Calculate the distance between the boid and the obstacle\n                let distance = p5__WEBPACK_IMPORTED_MODULE_0___default().Vector.dist(boid.position, obstacle.position) - obstacle.radius;\n                // Calculate the direction vector away from the obstacle\n                let desired = p5__WEBPACK_IMPORTED_MODULE_0___default().Vector.sub(boid.position, obstacle.position);\n                desired.normalize();\n                // Scale the force based on the distance (stronger when closer)\n                let scale = this.p5i.map(distance, 0, boid.sightRadius, 1, 0); // Scale based on actual distance\n                // Steering force calculation\n                steer = p5__WEBPACK_IMPORTED_MODULE_0___default().Vector.sub(desired, boid.velocity);\n                steer.normalize();\n                steer.mult(scale); // Scale the force by proximity to the obstacle\n            }\n        }\n        return steer;\n    }\n    alignment(boid, neighbors) {\n        if (neighbors.length === 0)\n            return this.p5i.createVector();\n        let sum = this.p5i.createVector();\n        for (let n of neighbors) {\n            sum.add(n.velocity); // Sum the velocities of all neighbors\n        }\n        let averageVelocity = sum.div(neighbors.length); // Calculate average velocity\n        averageVelocity.setMag(boid.maxSpeed); // Set the magnitude to max speed\n        let steer = p5__WEBPACK_IMPORTED_MODULE_0___default().Vector.sub(averageVelocity, boid.velocity); // Steering = Desired - Current Velocity\n        steer.limit(boid.maxSpeed * boid.desiredAlignment); // Apply the desiredAlignment factor\n        return steer;\n    }\n    cohesion(boid, neighbors) {\n        if (neighbors.length === 0)\n            return this.p5i.createVector();\n        let sum = this.p5i.createVector();\n        for (let n of neighbors) {\n            sum.add(n.position); // Sum the positions of all neighbors\n        }\n        let averagePosition = sum.div(neighbors.length); // Calculate average position\n        let desired = p5__WEBPACK_IMPORTED_MODULE_0___default().Vector.sub(averagePosition, boid.position); // Vector pointing towards the average position\n        desired.setMag(boid.maxSpeed); // Set the magnitude to max speed\n        let steer = p5__WEBPACK_IMPORTED_MODULE_0___default().Vector.sub(desired, boid.velocity); // Steering = Desired - Current Velocity\n        steer.limit(boid.maxSpeed * boid.desiredCohesion); // Apply the desiredCohesion factor\n        return steer;\n    }\n    separation(boid, neighbors) {\n        if (neighbors.length === 0)\n            return this.p5i.createVector();\n        let sum = this.p5i.createVector();\n        let count = 0;\n        for (let n of neighbors) {\n            let d = this.p5i.dist(boid.position.x, boid.position.y, n.position.x, n.position.y);\n            // Only consider neighbors that are very close\n            if (d > 0 && d < boid.desiredSeparation) {\n                let diff = this.p5i.createVector(boid.position.x - n.position.x, boid.position.y - n.position.y);\n                diff.normalize(); // Normalize to get direction\n                diff.div(d); // Weight the force by distance (closer boids have stronger effect)\n                sum.add(diff);\n                count++;\n            }\n        }\n        if (count > 0) {\n            sum.div(count); // Average the forces\n        }\n        // Scale to the boid's maximum force and apply\n        if (sum.mag() > 0) {\n            sum.setMag(boid.maxSpeed); // Set magnitude to max speed\n            sum.sub(boid.velocity); // Steer towards the desired direction\n            sum.limit(boid.maxSpeed); // Limit to maximum force\n        }\n        return sum;\n    }\n}\n\n\n//# sourceURL=webpack://samuelmoloney.github.io/./src/scripts/flock.ts?");

/***/ }),

/***/ "./src/scripts/obstacle.ts":
/*!*********************************!*\
  !*** ./src/scripts/obstacle.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Obstacle: () => (/* binding */ Obstacle)\n/* harmony export */ });\n/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! p5 */ \"./node_modules/p5/lib/p5.min.js\");\n/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(p5__WEBPACK_IMPORTED_MODULE_0__);\n\nclass Obstacle {\n    constructor(x, y, r, p5i) {\n        this.currentRadius = 0;\n        this.time = 0;\n        this.position = new (p5__WEBPACK_IMPORTED_MODULE_0___default().Vector)(x, y);\n        this.radius = r;\n        this.currentRadius = r;\n        this.p5i = p5i;\n    }\n    update() {\n        this.time += this.p5i.deltaTime;\n        // pulse the radius of the obstacle\n        this.currentRadius = this.radius + 100 * Math.sin(0.005 * this.time);\n        if (this.time > 1000000) {\n            this.time = 0;\n        }\n    }\n    draw() {\n        this.p5i.fill(255, 255, 255, 50);\n        this.p5i.ellipse(this.position.x, this.position.y, this.currentRadius * 0.5, this.currentRadius * 0.5);\n    }\n}\n\n\n//# sourceURL=webpack://samuelmoloney.github.io/./src/scripts/obstacle.ts?");

/***/ }),

/***/ "./src/scripts/p5-sketch.ts":
/*!**********************************!*\
  !*** ./src/scripts/p5-sketch.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! p5 */ \"./node_modules/p5/lib/p5.min.js\");\n/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(p5__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _flock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./flock */ \"./src/scripts/flock.ts\");\n\n\nconst sketch = (p) => {\n    function onWindowResize() {\n        const width = window.innerWidth;\n        const height = window.innerHeight;\n        p.resizeCanvas(width, height);\n    }\n    let flock;\n    p.setup = () => {\n        // get the full width and height of the window\n        const width = window.innerWidth;\n        const height = window.innerHeight;\n        let canvas = p.createCanvas(width, height).parent(\"backgroundCanvas\");\n        flock = new _flock__WEBPACK_IMPORTED_MODULE_1__.Flock(p);\n        // hook for window resizing\n        window.addEventListener(\"resize\", onWindowResize);\n    };\n    p.draw = () => {\n        // update methods\n        flock.update();\n        // drawing methods\n        p.background(236, 223, 204);\n        p.fill(175);\n        p.noStroke();\n        // TODO: wrap this into a class\n        let screenCenter = p.createVector(p.width / 2, p.height / 2);\n        let baseScreenSize = p.createVector(p.width, p.height);\n        let mouseUV = p.createVector(p.mouseX / p.width, p.mouseY / p.height);\n        let layerCount = 10;\n        let parralaxStrength = 200;\n        let innerSize = 0.033;\n        for (let i = 0; i < layerCount; i++) {\n            const layerDepth = i * innerSize; // Increase depth for each layer\n            p.push();\n            p.fill(24, 28, 20, 20 * i / layerCount);\n            // Calculate screen size and position for each layer\n            let screenSize = baseScreenSize.copy().mult(1 - layerDepth); // Shrink screen size\n            let parallaxOffset = mouseUV.copy().sub(0.5).mult(layerDepth * parralaxStrength); // Mouse effect for parallax\n            // Calculate the position offset\n            let position = screenCenter.copy().add(parallaxOffset);\n            // Translate to the position and draw the rectangle\n            p.translate(position.x, position.y);\n            p.rectMode(p.CENTER); // Center the rectangle\n            p.rect(0, 0, screenSize.x, screenSize.y, 200);\n            p.pop();\n        }\n        flock.draw();\n    };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sketch);\nnew (p5__WEBPACK_IMPORTED_MODULE_0___default())(sketch);\n\n\n//# sourceURL=webpack://samuelmoloney.github.io/./src/scripts/p5-sketch.ts?");

/***/ }),

/***/ "./src/scripts/quad-tree.ts":
/*!**********************************!*\
  !*** ./src/scripts/quad-tree.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Quadtree: () => (/* binding */ Quadtree)\n/* harmony export */ });\n/* harmony import */ var _rectangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rectangle */ \"./src/scripts/rectangle.ts\");\n\nclass Quadtree {\n    constructor(boundary, capacity, depth = 0) {\n        this.depth = 0;\n        this.boundary = boundary;\n        this.capacity = capacity;\n        this.data = [];\n        this.divided = false;\n        this.depth = depth;\n    }\n    // Subdivide the quadtree into four quadrants\n    subdivide() {\n        const x = this.boundary.x;\n        const y = this.boundary.y;\n        const w = this.boundary.w / 2;\n        const h = this.boundary.h / 2;\n        // Correct quadrant boundaries\n        const ne = new _rectangle__WEBPACK_IMPORTED_MODULE_0__.Rectangle(x + w, y - h, w, h);\n        const nw = new _rectangle__WEBPACK_IMPORTED_MODULE_0__.Rectangle(x - w, y - h, w, h);\n        const se = new _rectangle__WEBPACK_IMPORTED_MODULE_0__.Rectangle(x + w, y + h, w, h);\n        const sw = new _rectangle__WEBPACK_IMPORTED_MODULE_0__.Rectangle(x - w, y + h, w, h);\n        this.northeast = new Quadtree(ne, this.capacity, this.depth + 1);\n        this.northwest = new Quadtree(nw, this.capacity, this.depth + 1);\n        this.southeast = new Quadtree(se, this.capacity, this.depth + 1);\n        this.southwest = new Quadtree(sw, this.capacity, this.depth + 1);\n        this.divided = true;\n    }\n    // Insert a boid into the quadtree\n    insert(sceneObject) {\n        var _a, _b, _c, _d;\n        // Ensure boid is within boundary\n        if (!this.boundary.contains(sceneObject.position.x, sceneObject.position.y)) {\n            return false;\n        }\n        // If capacity is not reached, add boid here\n        if (this.data.length < this.capacity) {\n            this.data.push(sceneObject);\n            return true;\n        }\n        else {\n            // Subdivide if not already subdivided\n            if (!this.divided) {\n                this.subdivide();\n            }\n            // Insert into appropriate quadrant\n            if ((_a = this.northeast) === null || _a === void 0 ? void 0 : _a.insert(sceneObject)) {\n                return true;\n            }\n            else if ((_b = this.northwest) === null || _b === void 0 ? void 0 : _b.insert(sceneObject)) {\n                return true;\n            }\n            else if ((_c = this.southeast) === null || _c === void 0 ? void 0 : _c.insert(sceneObject)) {\n                return true;\n            }\n            else if ((_d = this.southwest) === null || _d === void 0 ? void 0 : _d.insert(sceneObject)) {\n                return true;\n            }\n        }\n        return false; // If no quadrant accepted the boid\n    }\n    // Query any type of objects within a circular range\n    query(range, typeConstructor, // Constructor function for the type T\n    found = []) {\n        var _a, _b, _c, _d;\n        // Check if the range intersects with the boundary\n        if (!this.boundary.intersects(range)) {\n            return found;\n        }\n        // Check all items in this quadtree node\n        for (let item of this.data) {\n            // Check if the item is of type T using the constructor\n            if (item instanceof typeConstructor) {\n                if (range.contains(item.position)) {\n                    found.push(item);\n                }\n            }\n        }\n        // Recurse into children if divided\n        if (this.divided) {\n            (_a = this.northwest) === null || _a === void 0 ? void 0 : _a.query(range, typeConstructor, found);\n            (_b = this.northeast) === null || _b === void 0 ? void 0 : _b.query(range, typeConstructor, found);\n            (_c = this.southwest) === null || _c === void 0 ? void 0 : _c.query(range, typeConstructor, found);\n            (_d = this.southeast) === null || _d === void 0 ? void 0 : _d.query(range, typeConstructor, found);\n        }\n        return found;\n    }\n    draw(p5) {\n        var _a, _b, _c, _d;\n        let normalizedValue = this.depth / 5;\n        // Draw the boundary of this quadtree\n        p5.strokeWeight(2 * normalizedValue);\n        p5.stroke(236, 223, 204, (255 * normalizedValue) * 0.1);\n        p5.noFill();\n        p5.rectMode(p5.CENTER);\n        p5.rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);\n        // draw each boundary point\n        // larger dots the smaller the quadtree\n        // inverse log\n        p5.strokeWeight(3 * normalizedValue);\n        // left top\n        p5.point(this.boundary.x - this.boundary.w, this.boundary.y - this.boundary.h);\n        // right top\n        p5.point(this.boundary.x + this.boundary.w, this.boundary.y - this.boundary.h);\n        // left bottom\n        p5.point(this.boundary.x - this.boundary.w, this.boundary.y + this.boundary.h);\n        // right bottom\n        p5.point(this.boundary.x + this.boundary.w, this.boundary.y + this.boundary.h);\n        // Recursively draw the subdivisions if the quadtree is divided\n        if (this.divided) {\n            (_a = this.northeast) === null || _a === void 0 ? void 0 : _a.draw(p5);\n            (_b = this.northwest) === null || _b === void 0 ? void 0 : _b.draw(p5);\n            (_c = this.southeast) === null || _c === void 0 ? void 0 : _c.draw(p5);\n            (_d = this.southwest) === null || _d === void 0 ? void 0 : _d.draw(p5);\n        }\n    }\n}\n\n\n//# sourceURL=webpack://samuelmoloney.github.io/./src/scripts/quad-tree.ts?");

/***/ }),

/***/ "./src/scripts/rectangle.ts":
/*!**********************************!*\
  !*** ./src/scripts/rectangle.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Rectangle: () => (/* binding */ Rectangle)\n/* harmony export */ });\nclass Rectangle {\n    constructor(x, y, w, h) {\n        this.x = x;\n        this.y = y;\n        this.w = w;\n        this.h = h;\n    }\n    contains(x, y) {\n        return (x >= this.x - this.w &&\n            x < this.x + this.w &&\n            y >= this.y - this.h &&\n            y < this.y + this.h);\n    }\n    intersects(range) {\n        return !(range.x - range.r > this.x + this.w ||\n            range.x + range.r < this.x - this.w ||\n            range.y - range.r > this.y + this.h ||\n            range.y + range.r < this.y - this.h);\n    }\n}\n\n\n//# sourceURL=webpack://samuelmoloney.github.io/./src/scripts/rectangle.ts?");

/***/ }),

/***/ "./src/scripts/utils.ts":
/*!******************************!*\
  !*** ./src/scripts/utils.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   NumberHelper: () => (/* binding */ NumberHelper),\n/* harmony export */   TypeHelper: () => (/* binding */ TypeHelper),\n/* harmony export */   VectorHelper: () => (/* binding */ VectorHelper)\n/* harmony export */ });\n/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! p5 */ \"./node_modules/p5/lib/p5.min.js\");\n/* harmony import */ var p5__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(p5__WEBPACK_IMPORTED_MODULE_0__);\n\nclass NumberHelper {\n    static getRandomNumber(min, max) {\n        return Math.random() * (max - min) + min;\n    }\n    static dist(x1, y1, x2, y2) {\n        return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));\n    }\n    static map(value, start1, stop1, start2, stop2) {\n        return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;\n    }\n    static mapSize(index, total, minSize, maxSize) {\n        let middle = total / 2;\n        let normalizedIndex = Math.abs(index - middle) / middle;\n        return this.lerp(maxSize, minSize, 1 - normalizedIndex); // Inverse relationship for bulge\n    }\n    static lerp(start, stop, amt) {\n        return start + (stop - start) * amt;\n    }\n}\nclass TypeHelper {\n    static isType(value) {\n        return typeof value === 'object' && value !== null;\n    }\n}\nclass VectorHelper {\n    static random2DPos(width, height) {\n        return new (p5__WEBPACK_IMPORTED_MODULE_0___default().Vector)(Math.random() * width, Math.random() * height);\n    }\n}\n\n\n//# sourceURL=webpack://samuelmoloney.github.io/./src/scripts/utils.ts?");

/***/ }),

/***/ "./src/utils/lerpColor.ts":
/*!********************************!*\
  !*** ./src/utils/lerpColor.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Color: () => (/* binding */ Color),\n/* harmony export */   lerp: () => (/* binding */ lerp),\n/* harmony export */   lerpColor: () => (/* binding */ lerpColor),\n/* harmony export */   lerpColorString: () => (/* binding */ lerpColorString),\n/* harmony export */   rgbToHex: () => (/* binding */ rgbToHex)\n/* harmony export */ });\nclass Color {\n    constructor(r, g, b) {\n        this.r = r;\n        this.g = g;\n        this.b = b;\n    }\n    toHex() {\n        const toHex = (value) => value.toString(16).padStart(2, '0');\n        return `#${toHex(this.r)}${toHex(this.g)}${toHex(this.b)}`;\n    }\n    fromHex(hex) {\n        const hexToRgb = (hex) => {\n            const match = hex.replace(/#/, '').match(/.{1,2}/g);\n            if (!match) {\n                throw new Error(`Invalid hex color: ${hex}`);\n            }\n            return match.map((x) => parseInt(x, 16));\n        };\n        const [r, g, b] = hexToRgb(hex);\n        return new Color(r, g, b);\n    }\n    toString() {\n        return `rgb(${this.r},${this.g},${this.b})`;\n    }\n    fromString(rgb) {\n        const match = rgb.match(/rgb\\((\\d+),\\s*(\\d+),\\s*(\\d+)\\)/);\n        if (!match) {\n            throw new Error(`Invalid rgb color: ${rgb}`);\n        }\n        const [, r, g, b] = match.map((x) => parseInt(x, 10));\n        return new Color(r, g, b);\n    }\n    toArray(alpha) {\n        if (alpha == undefined) {\n            return [this.r, this.g, this.b];\n        }\n        return [this.r, this.g, this.b, alpha];\n    }\n}\n// Utility function to linearly interpolate between two values\nfunction lerp(start, end, t) {\n    return start + (end - start) * t;\n}\n;\n// Convert RGB to hex\nfunction rgbToHex(r, g, b) {\n    const toHex = (value) => value.toString(16).padStart(2, '0');\n    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;\n}\n;\nfunction lerpColorString(startColor, endColor, t) {\n    const start = new Color(0, 0, 0).fromString(startColor);\n    const end = new Color(0, 0, 0).fromString(endColor);\n    const result = lerpColor(start, end, t);\n    return result.toString();\n}\n// Function to perform color lerp\nfunction lerpColor(startColor, endColor, t) {\n    // Interpolate each color component\n    const r = Math.round(lerp(startColor.r, endColor.r, t));\n    const g = Math.round(lerp(startColor.g, endColor.g, t));\n    const b = Math.round(lerp(startColor.b, endColor.b, t));\n    // Convert back to hex\n    return new Color(r, g, b);\n}\n;\n\n\n//# sourceURL=webpack://samuelmoloney.github.io/./src/utils/lerpColor.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"background": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunksamuelmoloney_github_io"] = self["webpackChunksamuelmoloney_github_io"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./src/scripts/p5-sketch.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;