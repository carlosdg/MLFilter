/**
 * Utility functions for working with video
 *
 * @author Carlos Domínguez García
 */

import { MAX_DIMENSIONS } from "./dimensions";

/**
 * Creates a video element
 *
 * @returns a new video element
 */
function createVideo() {
  const video = document.createElement("video");
  video.setAttribute("autoplay", "true");
  video.setAttribute("width", MAX_DIMENSIONS.width);
  video.setAttribute("height", MAX_DIMENSIONS.height);
  video.setAttribute('role', 'application');
  video.setAttribute('aria-label', 'Camera');
  video.classList.add("video");

  return video;
}

// Container where to add video elements
const videoContainer = document.getElementById("video-container");

/**
 * Adds the markup necessary to the page to render the given video
 *
 * @param {HTMLVideoElement} video Video to add to the page
 */
function addVideoToView(video) {
  videoContainer.appendChild(video);
}

/**
 * Assigns a media source to a video and returns a promise
 * that resolves when the stream is loaded
 *
 * @param {*} stream Stream to load into the given video
 * @param {*} video Video where the given stream will be loaded
 * @returns {Promise} Resolves when the stream is loaded in the given video
 */
function loadStreamInVideo(stream, video) {
  try {
    video.srcObject = stream;
  } catch (_) {
    // Fallback for browsers that doesn't support "srcObject"
    video.src = URL.createObjectURL(stream);
  }

  return new Promise(resolve =>
    video.addEventListener("loadeddata", event => resolve(event.target), {
      once: true
    })
  );
}

/**
 * Returns the videoWidth / videoHeight of the given video
 *
 * @param {*} video Video to get the width and height from
 */
function getWithHeightRatio(video) {
  if (video.videoHeight > 0 && video.videoHeight > 0) {
    return video.videoWidth / video.videoHeight;
  } else {
    throw new Error(
      `Invalid dimensions {videoWidth: ${video.videoWidth}, videoHeight: ${
        video.videoHeight
      }}. They must be numbers greater than 0`
    );
  }
}

export default {
  createVideo,
  addVideoToView,
  loadStreamInVideo,
  getWithHeightRatio
};
