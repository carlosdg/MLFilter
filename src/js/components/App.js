import React from "react";

import Camera from "./Camera";
import DownloadableImage from "./DownloadableImage";

import {
  MAX_DIMENSIONS,
  getMaxDimensionsRespectingAspectRatio
} from "../utils/dimensions";
import * as MediaUtils from "../utils/mediaUtils";

export default class App extends React.Component {
  /**
   * Reference to the camera component instance
   */
  camera = null;

  state = {
    imageDataUrls: [],
    cameraPhotoDimensions: {
      ...MAX_DIMENSIONS
    }
  };

  render() {
    return (
      <div>
        <Camera
          width={MAX_DIMENSIONS.width}
          height={MAX_DIMENSIONS.height}
          photoWidth={this.state.cameraPhotoDimensions.width}
          photoHeight={this.state.cameraPhotoDimensions.height}
          ref={camera => (this.camera = camera)}
        />
        <button onClick={this.onNewPhoto}>Take photo</button>
        <ul>{this.state.imageDataUrls.map(this.createPhotoListItem)}</ul>
      </div>
    );
  }

  /**
   * Callback to run when the user wants to take a photo
   */
  onNewPhoto = () => {
    const dataUrl = this.camera.takePhoto();
    this.setState(prevState => ({
      imageDataUrls: [...prevState.imageDataUrls, dataUrl]
    }));
  };

  /**
   * Returns a list item component to show a new downloadable image which
   * respects the aspect ratio of the camera
   */
  createPhotoListItem = (dataUrl, index) => {
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
