document.addEventListener("DOMContentLoaded", () => {
  // Video and images maximum dimensions
  const MAX_DIMENSIONS = { width: 300, height: 300 };

  // Getting DOM elements
  const videoStreamingCamera = document.getElementById("video");
  const resultsDiv = document.getElementById("results");
  const takePhotoButton = document.getElementById("take-photo-button");

  // Loads the model used to transfer the Screan paint style
  const screamStylePromise = ml5.styleTransfer("models/scream");

  // Given the source of a new image, creates and adds that new image
  // to the results div
  function addNewImageToResults(src) {
    const newImage = new Image(MAX_DIMENSIONS.width, MAX_DIMENSIONS.height);
    newImage.src = src;
    resultsDiv.appendChild(newImage);
  }

  // Assigns a media source to a video
  function assignStreamToVideo(stream, video) {
    try {
      video.srcObject = stream;
    } catch (error) {
      // Fallback for browsers that doesn't support "srcObject"
      video.src = URL.createObjectURL(stream);
    }
  }

  // Constraint the video to not be greater than MAX_DIMENSIONS
  videoStreamingCamera.width = Math.max(videoStreamingCamera.width, MAX_DIMENSIONS.width);
  videoStreamingCamera.height = Math.max(videoStreamingCamera.height, MAX_DIMENSIONS.height);

  // Requests access to the user camera to stream it in the video element
  // And then add the click event listener to the "Take photo" button to
  // perform the style transfer on that video frame and add the resulting image
  // to the results div
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(stream => assignStreamToVideo(stream, videoStreamingCamera))
    .then(() => {
      const addNewStyledImage = () =>
        screamStylePromise
          .then(style => style.transfer(videoStreamingCamera))
          .then(result => addNewImageToResults(result.src));

      takePhotoButton.addEventListener("click", addNewStyledImage);
    })
    .catch(error => console.error('ERROR: ', error))
});