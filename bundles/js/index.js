/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_register_service_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/register_service_worker */ \"./js/utils/register_service_worker.js\");\n/* harmony import */ var _utils_dimensions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/dimensions */ \"./js/utils/dimensions.js\");\n/* harmony import */ var _utils_video__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/video */ \"./js/utils/video.js\");\n/* harmony import */ var _utils_canvas__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/canvas */ \"./js/utils/canvas.js\");\n\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  // Register service worker\n  Object(_utils_register_service_worker__WEBPACK_IMPORTED_MODULE_0__[\"registerServiceWorker\"])();\n\n  // Getting DOM elements\n  const videoStreamingCamera = _utils_video__WEBPACK_IMPORTED_MODULE_2__[\"default\"].createVideo();\n  _utils_video__WEBPACK_IMPORTED_MODULE_2__[\"default\"].addVideoToView(videoStreamingCamera);\n\n  const takePhotoButton = document.getElementById(\"take-photo-button\");\n\n  // Loads the model used to transfer the Screan paint style\n  const screamStylePromise = ml5.styleTransfer(\"models/scream\");\n\n  // Requests access to the user camera to stream it in the video element\n  // And then add the click event listener to the \"Take photo\" button to\n  // perform the style transfer on that video frame and create a canvas\n  // with the resulting data URL\n  navigator.mediaDevices\n    .getUserMedia({ video: true, audio: false })\n    .then(stream => _utils_video__WEBPACK_IMPORTED_MODULE_2__[\"default\"].loadStreamInVideo(stream, videoStreamingCamera))\n    .then(video => {\n      // Add event listener to the button. On click we apply the style transfer\n      // and render the image with the appropiate dimensions\n      takePhotoButton.addEventListener(\"click\", () => {\n        // Get the camera width-height ratio\n        const widthToHeigtRatio = _utils_video__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getWithHeightRatio(video);\n\n        // The canvas dimensions will be the maximum allowed but respecting\n        // the width-height ratio of the camera (else the canvas\n        // will look squeezed)\n        const canvasDimensions = { ..._utils_dimensions__WEBPACK_IMPORTED_MODULE_1__[\"MAX_DIMENSIONS\"] };\n        if (widthToHeigtRatio > 1) {\n          // The camera is wider, need to reduce the height\n          canvasDimensions.height /= widthToHeigtRatio;\n        } else {\n          // The camera is higher, need to reduce the width\n          canvasDimensions.width *= widthToHeigtRatio;\n        }\n\n        screamStylePromise\n          .then(style => style.transfer(video))\n          .then(result => _utils_canvas__WEBPACK_IMPORTED_MODULE_3__[\"default\"].createCanvasFromDataUrl(result.src, canvasDimensions))\n          .then(canvas => _utils_canvas__WEBPACK_IMPORTED_MODULE_3__[\"default\"].addCanvasToView(canvas));\n      });\n    })\n    .catch(error => console.error(\"ERROR: \", error));\n});\n\n\n//# sourceURL=webpack:///./js/index.js?");

/***/ }),

/***/ "./js/utils/canvas.js":
/*!****************************!*\
  !*** ./js/utils/canvas.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dimensions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dimensions */ \"./js/utils/dimensions.js\");\n/**\n * Utility functions for working with canvas\n * \n * @author Carlos Domínguez García\n */\n\n\n\n/**\n * Creates a canvas from the given data URL and dimensions and returns\n * a promise that resolves when the image is painted in the canvas\n * \n * @param {String} dataUrl Image as data URL to put into the canvas\n * @param {Object} dimensions {width, height} Dimensions of the canvas\n * @returns {Promise} A promise that resolves when the image is loaded into the canvas\n */\nfunction createCanvasFromDataUrl(dataUrl, dimensions) {\n  if (!_dimensions__WEBPACK_IMPORTED_MODULE_0__[\"default\"].areCorrectDimensions(dimensions)) {\n    throw new Error(`Invalid dimensions {width: ${dimensions.width} height: ${dimensions.height}}`);\n  }\n  const image = new Image(dimensions.width, dimensions.height);\n  image.src = dataUrl;\n\n  const canvas = document.createElement(\"canvas\");\n  canvas.width = dimensions.width;\n  canvas.height = dimensions.height;\n\n  const context = canvas.getContext(\"2d\");\n\n  return new Promise(resolve =>\n    image.onload = () => {\n      context.drawImage(image, 0, 0, dimensions.width, dimensions.height);\n      resolve(canvas);\n    }\n  );\n}\n\n// DOM element where we'll put the canvases\nconst resultsList = document.getElementById(\"result-list\");\n\n/**\n * Creates a link to download the content of href.\n * Note: does not check for same-origin policy\n * \n * @param {String} href URL with the content to download\n * @param {Object} options {downloadedFileName: <String> name that the downloaded \n * file will be given, linkName: <String> name of the link}\n */\nfunction createDownloadLink(href, {downloadedFileName = 'download', linkName = 'download'} = {}) {\n  const link = document.createElement(\"a\");\n  link.setAttribute(\"download\", downloadedFileName);\n  link.setAttribute(\"href\", href);\n  link.classList.add(\"download-image-link\");\n  link.innerText = linkName;\n\n  return link;\n}\n\n/**\n * Adds the markup necessary to the page to render the given canvas\n * \n * @param {HTMLCanvasElement} canvas Canvas to add to the DOM\n */\nfunction addCanvasToView(canvas) {\n  const imageId = resultsList.children.length + 1;\n  canvas.setAttribute(\"role\", \"img\");\n  canvas.setAttribute(\"aria-label\", `Photo ${imageId} after applying the filter`);\n\n  const container = document.createElement(\"li\");\n  container.classList.add(\"result-container\");\n\n  const downloadLink = createDownloadLink(canvas.toDataURL(), {\n    downloadedFileName: `photo_${imageId}`,\n    linkName: `Download Photo ${imageId}`\n  });\n\n  container.appendChild(canvas);\n  container.appendChild(downloadLink);\n  resultsList.appendChild(container);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  createCanvasFromDataUrl,\n  addCanvasToView\n});\n\n\n//# sourceURL=webpack:///./js/utils/canvas.js?");

/***/ }),

/***/ "./js/utils/dimensions.js":
/*!********************************!*\
  !*** ./js/utils/dimensions.js ***!
  \********************************/
/*! exports provided: MAX_DIMENSIONS, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MAX_DIMENSIONS\", function() { return MAX_DIMENSIONS; });\n/**\n * Utility functions for dimensions\n * \n * @author Carlos Domínguez García\n */\n\n/** \n * Video and images maximum dimensions. If we were to allow\n * arbitrary large video or images the app would be much slower\n */\nconst MAX_DIMENSIONS = { width: 300, height: 300 };\n\n/**\n * Returns whether the given dimensions are in the right bounds or not\n * \n * @param {Object} dimensions {width, height} Dimensions to check\n * @returns Whether the given dimensions are in the right bounds or not\n */\nfunction areCorrectDimensions(dimensions) {\n  return (\n    dimensions.width > 0 &&\n    dimensions.width <= MAX_DIMENSIONS.width &&\n    dimensions.height > 0 &&\n    dimensions.height <= MAX_DIMENSIONS.height\n  );\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  MAX_DIMENSIONS,\n  areCorrectDimensions\n});\n\n//# sourceURL=webpack:///./js/utils/dimensions.js?");

/***/ }),

/***/ "./js/utils/register_service_worker.js":
/*!*********************************************!*\
  !*** ./js/utils/register_service_worker.js ***!
  \*********************************************/
/*! exports provided: registerServiceWorker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"registerServiceWorker\", function() { return registerServiceWorker; });\nfunction registerServiceWorker() {\n  if ('serviceWorker' in navigator) {\n    navigator.serviceWorker.register('service_worker.js')\n  }\n}\n\n\n//# sourceURL=webpack:///./js/utils/register_service_worker.js?");

/***/ }),

/***/ "./js/utils/video.js":
/*!***************************!*\
  !*** ./js/utils/video.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dimensions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dimensions */ \"./js/utils/dimensions.js\");\n/**\n * Utility functions for working with video\n *\n * @author Carlos Domínguez García\n */\n\n\n\n/**\n * Creates a video element\n *\n * @returns a new video element\n */\nfunction createVideo() {\n  const video = document.createElement(\"video\");\n  video.setAttribute(\"autoplay\", \"true\");\n  video.setAttribute(\"width\", _dimensions__WEBPACK_IMPORTED_MODULE_0__[\"MAX_DIMENSIONS\"].width);\n  video.setAttribute(\"height\", _dimensions__WEBPACK_IMPORTED_MODULE_0__[\"MAX_DIMENSIONS\"].height);\n  video.setAttribute('role', 'application');\n  video.setAttribute('aria-label', 'Camera');\n  video.classList.add(\"video\");\n\n  return video;\n}\n\n// Container where to add video elements\nconst videoContainer = document.getElementById(\"video-container\");\n\n/**\n * Adds the markup necessary to the page to render the given video\n *\n * @param {HTMLVideoElement} video Video to add to the page\n */\nfunction addVideoToView(video) {\n  videoContainer.appendChild(video);\n}\n\n/**\n * Assigns a media source to a video and returns a promise\n * that resolves when the stream is loaded\n *\n * @param {*} stream Stream to load into the given video\n * @param {*} video Video where the given stream will be loaded\n * @returns {Promise} Resolves when the stream is loaded in the given video\n */\nfunction loadStreamInVideo(stream, video) {\n  try {\n    video.srcObject = stream;\n  } catch (_) {\n    // Fallback for browsers that doesn't support \"srcObject\"\n    video.src = URL.createObjectURL(stream);\n  }\n\n  return new Promise(resolve =>\n    video.addEventListener(\"loadeddata\", event => resolve(event.target), {\n      once: true\n    })\n  );\n}\n\n/**\n * Returns the videoWidth / videoHeight of the given video\n *\n * @param {*} video Video to get the width and height from\n */\nfunction getWithHeightRatio(video) {\n  if (video.videoHeight > 0 && video.videoHeight > 0) {\n    return video.videoWidth / video.videoHeight;\n  } else {\n    throw new Error(\n      `Invalid dimensions {videoWidth: ${video.videoWidth}, videoHeight: ${\n        video.videoHeight\n      }}. They must be numbers greater than 0`\n    );\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  createVideo,\n  addVideoToView,\n  loadStreamInVideo,\n  getWithHeightRatio\n});\n\n\n//# sourceURL=webpack:///./js/utils/video.js?");

/***/ })

/******/ });