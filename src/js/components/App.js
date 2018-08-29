import React from "react";
import ml5 from "ml5";
import Camera from "./Camera";
import DownloadableImage from "./DownloadableImage";
import {
  MAX_DIMENSIONS,
  getMaxDimensionsRespectingAspectRatio
} from "../utils/dimensions";
import * as MediaUtils from "../utils/mediaUtils";

// Loads the model used to transfer the Screan paint style
const screamStylePromise = ml5.styleTransfer("models/scream");

export default class App extends React.Component {
  /**
   * Reference to the camera component instance
   */
  camera = null;

  state = {
    imageDataUrls: []
  };

  render() {
    return (
      <div>
        <Camera
          width={MAX_DIMENSIONS.width}
          height={MAX_DIMENSIONS.height}
          photoWidth={MAX_DIMENSIONS.width}
          photoHeight={MAX_DIMENSIONS.height}
          ref={camera => (this.camera = camera)}
        />
        <button onClick={this._onNewPhoto}>Take photo</button>
        <ul>{this.state.imageDataUrls.map(this._createPhotoListItem)}</ul>
      </div>
    );
  }

  /**
   * [Private method]
   * Callback to run when the user wants to take a photo
   */
  _onNewPhoto = () => {
    screamStylePromise
      .then(style => style.transfer(this.camera.video))
      .then(result =>
        this.setState(prevState => ({
          imageDataUrls: [...prevState.imageDataUrls, result.src]
        }))
      );
  };

  /**
   * [Private method]
   * Returns a list item component to show a new downloadable image which
   * respects the aspect ratio of the camera
   */
  _createPhotoListItem = (dataUrl, index) => {
    const cameraAspectRatio = MediaUtils.getAspectRatio(this.camera.video);
    const dimensions = getMaxDimensionsRespectingAspectRatio(cameraAspectRatio);

    return (
      <li key={index}>
        <DownloadableImage
          dataUrl={dataUrl}
          alt={`Photo ${index}`}
          width={dimensions.width}
          height={dimensions.height}
          imageName={`Photo ${index}`}
        />
      </li>
    );
  };
}
