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

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Color: () => (/* reexport safe */ _lerpColor_ts__WEBPACK_IMPORTED_MODULE_0__.Color),\n/* harmony export */   lerpColor: () => (/* reexport safe */ _lerpColor_ts__WEBPACK_IMPORTED_MODULE_0__.lerpColor),\n/* harmony export */   lerpColorString: () => (/* reexport safe */ _lerpColor_ts__WEBPACK_IMPORTED_MODULE_0__.lerpColorString)\n/* harmony export */ });\n/* harmony import */ var _lerpColor_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lerpColor.ts */ \"./src/utils/lerpColor.ts\");\n\n\n\n//# sourceURL=webpack://samuelmoloney.github.io/./src/utils/index.ts?");

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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/utils/index.ts");
/******/ 	
/******/ })()
;