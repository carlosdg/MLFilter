import { MAX_DIMENSIONS } from "./dimensions";

function createVideo() {
  const video = document.createElement("video");
  video.setAttribute("autoplay", "true");
  video.setAttribute("width", MAX_DIMENSIONS.width);
  video.setAttribute("height", MAX_DIMENSIONS.height);

  return video;
}

function addVideoToView(video) {
  document.body.appendChild(video);
}

// Assigns a media source to a video and returns a promise
// that resolves when the stream is loaded
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

function getWithHeightRatio(video) {
  if (video.videoHeight > 0 && video.videoHeight > 0) {
    return video.videoWidth / video.videoHeight;
  } else {
    throw new Error(
      `Invalid dimensions {videoWidth: ${
        video.videoWidth
      }, videoHeight: ${
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