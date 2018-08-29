// Buffer to store the images so we can
// get their data URL
const canvasBuffer = document.createElement("canvas");

/**
 * Return a data url representing the given media with the given parameters
 *
 * @param {Image | HTMLVideoElement} media The image or video to get the data URL from
 * @param {Object} parameters {width, height} Dimensions of the image
 * @returns {String} The data URL representing the given media
 */
export function mediaToDataUrl(media, { width, height }) {
  canvasBuffer.width = width;
  canvasBuffer.height = height;
  const context = canvasBuffer.getContext("2d");
  context.drawImage(media, 0, 0, width, height);
  return canvasBuffer.toDataURL();
}

/**
 * Assigns a media source to a media element (video or audio)
 *
 * @param {MediaStream} stream Stream to load into the given media element
 * @param {HTMLMediaElement} media Media where the given stream will be loaded (video or audio)
 */
export function loadStreamToMedia(stream, media) {
  // Try to use srcObject. If it doesn't work
  // fallback to use URL.createObjectURL()
  try {
    media.srcObject = stream;
  } catch (_) {
    media.src = URL.createObjectURL(stream);
  }
}

/**
 * Returns the relationship of the width to the height for the given video
 *
 * @param {HTMLVideoElement} video Video to get the width and height from
 */
export function getAspectRatio(video) {
  if (video.videoWidth > 0 && video.videoHeight > 0) {
    return video.videoWidth / video.videoHeight;
  } else {
    throw new Error(
      `Invalid dimensions {videoWidth: ${video.videoWidth}, videoHeight: ${
        video.videoHeight
      }}. They must be numbers greater than 0`
    );
  }
}

/**
 * Given a media's dimensions and an aspect ratio that we want
 * those dimensions to respect, returns dimensions respecting
 * that aspect ratio
 *
 * @param {Object} dimensions Dimensions that want to respect the given aspect ratio
 * @param {Number} aspectRatio Width to height relationship that dimensions need to respect
 * @returns {Object} Dimensions respecting the aspect ratio
 */
export function respectAspectRatio(dimensions, aspectRatio) {
  const result = { ...dimensions };
  
  if (aspectRatio < 1) {
    // Height is larger than width and we don't want to not pass dimensions
    result.height = result.width / aspectRatio;
  } else {
    // Width is larger than height and we don't want to not pass dimensions
    result.width = result.height * aspectRatio;
  }

  return result;
}
