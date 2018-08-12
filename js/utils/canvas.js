/**
 * Utility functions for working with canvas
 * 
 * @author Carlos Domínguez García
 */

import DimensionUtils from "./dimensions";

/**
 * Creates a canvas from the given data URL and dimensions and returns
 * a promise that resolves when the image is painted in the canvas
 * 
 * @param {String} dataUrl Image as data URL to put into the canvas
 * @param {Object} dimensions {width, height} Dimensions of the canvas
 * @returns {Promise} A promise that resolves when the image is loaded into the canvas
 */
function createCanvasFromDataUrl(dataUrl, dimensions) {
  if (!DimensionUtils.areCorrectDimensions(dimensions)) {
    throw new Error(`Invalid dimensions {width: ${dimensions.width} height: ${dimensions.height}}`);
  }
  const image = new Image(dimensions.width, dimensions.height);
  image.src = dataUrl;

  const canvas = document.createElement("canvas");
  canvas.width = dimensions.width;
  canvas.height = dimensions.height;

  const context = canvas.getContext("2d");

  return new Promise(resolve =>
    image.onload = () => {
      context.drawImage(image, 0, 0, dimensions.width, dimensions.height);
      resolve(canvas);
    }
  );
}

// DOM element where we'll put the canvases
const resultsDiv = document.getElementById("results-section");

/**
 * Adds the markup necessary to the page to render the given canvas
 * 
 * @param {HTMLCanvasElement} canvas Canvas to add to the DOM
 */
function addCanvasToView(canvas) {
  const currentCanvasId = resultsDiv.children.length + 1;

  const container = document.createElement("div");
  container.setAttribute("data-id", currentCanvasId);
  container.classList.add("result-container");

  const link = document.createElement("a");
  link.setAttribute("download", `photo_${currentCanvasId}`);
  link.setAttribute("href", canvas.toDataURL());
  link.classList.add("download-image-button");
  link.innerText = `Download photo_${currentCanvasId}`;

  container.appendChild(canvas);
  container.appendChild(link);
  resultsDiv.appendChild(container);
}

export default {
  createCanvasFromDataUrl,
  addCanvasToView
};
