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