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
const resultsList = document.getElementById("result-list");

/**
 * Creates a link to download the content of href.
 * Note: does not check for same-origin policy
 * 
 * @param {String} href URL with the content to download
 * @param {Object} options {downloadedFileName: <String> name that the downloaded 
 * file will be given, linkName: <String> name of the link}
 */
function createDownloadLink(href, {downloadedFileName = 'download', linkName = 'download'} = {}) {
  const link = document.createElement("a");
  link.setAttribute("download", downloadedFileName);
  link.setAttribute("href", href);
  link.classList.add("download-image-link");
  link.innerText = linkName;

  return link;
}

/**
 * Adds the markup necessary to the page to render the given canvas
 * 
 * @param {HTMLCanvasElement} canvas Canvas to add to the DOM
 */
function addCanvasToView(canvas) {
  const imageId = resultsList.children.length + 1;
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", `Photo ${imageId} after applying the filter`);

  const container = document.createElement("li");
  container.classList.add("result-container");

  const downloadLink = createDownloadLink(canvas.toDataURL(), {
    downloadedFileName: `photo_${imageId}`,
    linkName: `Download Photo ${imageId}`
  });

  container.appendChild(canvas);
  container.appendChild(downloadLink);
  resultsList.appendChild(container);
}

export default {
  createCanvasFromDataUrl,
  addCanvasToView
};
