import React from "react";
import * as MediaUtils from "../utils/mediaUtils";

/**
 * Renders a video showing the stream from the 
 * user camera and allows to take photos
 */
export default class Camera extends React.Component {
  state = {
    isRecording: false,
    errorMessage: null
  };
  
  // Reference to the video DOM element
  video = null;

  /**
   * When the component mounts -> try to assign the stream from the user
   * camera to the video element
   */
  componentDidMount() {
    return navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(cameraStream => this._loadStream(cameraStream))
      .catch(_ => {
        this.setState({
          isRecording: false,
          errorMessage: "Access to camera not granted"
        });
      });
  }

  /**
   * Either render the video or an error message in case the user has not
   * allowed us to access the camera
   */
  render() {
    if (this.state.errorMessage) {
      return (
        <div>
          <p>{this.state.errorMessage}</p>
        </div>
      );
    }
    return (
      <div>
        <video
          ref={video => (this.video = video)}
          className="video"
          autoPlay
          width={this.props.width}
          height={this.props.height}
          role="application"
          aria-label="Camera"
        >
          Cannot show the camera. Maybe it is because this browser doesn't
          support the HTML5 "video" element
        </video>
      </div>
    );
  }

  /**
   * [Private method] Loads the given stream to the video and updates
   * the state accordingly
   *
   * @param {MediaStream} stream Stream to load to the video
   */
  _loadStream = stream => {
    if (!this.state.isRecording) {
      MediaUtils.loadStreamToMedia(stream, this.video);

      this.setState({
        isRecording: true,
        errorMessage: null
      });
    }
  }

  /**
   * Takes a screenshot of the current frame in the video and
   * returns a data URL of the photo taken
   * 
   * @returns {String} Data URL of the photo taken
   */
  takePhoto = () => {
    if (!this.state.isRecording) {
      return null;
    }

    return MediaUtils.mediaToDataUrl(this.video, {
      width: this.props.photoWidth,
      height: this.props.photoHeight
    });
  }
}
