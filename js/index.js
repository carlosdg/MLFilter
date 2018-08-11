import { MAX_DIMENSIONS } from "./utils/dimensions";
import VideoUtils from "./utils/video";
import CanvasUtils from "./utils/canvas";

document.addEventListener("DOMContentLoaded", () => {
  // Getting DOM elements
  const videoStreamingCamera = VideoUtils.createVideo();
  VideoUtils.addVideoToView(videoStreamingCamera);

  const takePhotoButton = document.getElementById("take-photo-button");

  // Loads the model used to transfer the Screan paint style
  const screamStylePromise = ml5.styleTransfer("models/scream");

  // Requests access to the user camera to stream it in the video element
  // And then add the click event listener to the "Take photo" button to
  // perform the style transfer on that video frame and create a canvas
  // with the resulting data URL
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(stream => VideoUtils.loadStreamInVideo(stream, videoStreamingCamera))
    .then(video => {
      const widthToHeigtRatio = VideoUtils.getWithHeightRatio(video);

      // The canvas width will be the maximum allowed but the height
      // will respect the width to height ratio of the camera (else the canvas
      // will look squeezed)
      const canvasDimensions = { ...MAX_DIMENSIONS };
      canvasDimensions.height /= widthToHeigtRatio;

      // Add event listener to the button to apply the style transfer to
      // the current video frame
      takePhotoButton.addEventListener("click", () =>
        screamStylePromise
          .then(style => style.transfer(video))
          .then(result => CanvasUtils.createCanvasFromDataUrl(result.src, canvasDimensions))
          .then(canvas => CanvasUtils.addCanvasToView(canvas))
      );
    })
    .catch(error => console.error("ERROR: ", error));
});