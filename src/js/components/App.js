import React from "react";
import ml5 from "ml5";
import Camera from "./Camera";
import DownloadableImageList from "./DownloadableImageList";
import {
  MAX_DIMENSIONS,
  getMaxDimensionsRespectingAspectRatio
} from "../utils/dimensions";
import * as MediaUtils from "../utils/mediaUtils";

export default class App extends React.Component {
  constructor(args) {
    super(...args);

    this.state = {
      imageData: []
    };

    // Reference to the camera component instance
    this.camera = null;

    // Promise used for transfering the Scream style to photos.
    // Initialized when component mounts
    this.screamStylePromise = null;
  }

  componentDidMount() {
    // Loads the model used to transfer the Scream paint style
    this.screamStylePromise = ml5.styleTransfer("models/scream");
  }

  render() {
    return (
      <div className="centered">
        <Camera
          width={MAX_DIMENSIONS.width}
          height={MAX_DIMENSIONS.height}
          photoWidth={MAX_DIMENSIONS.width}
          photoHeight={MAX_DIMENSIONS.height}
          ref={camera => (this.camera = camera)}
          className="container"
        />
        <button onClick={this._onNewPhoto} className="button">
          Take photo
        </button>
        <DownloadableImageList imageData={this.state.imageData}/>
      </div>
    );
  }

  /**
   * [Private method]
   * Callback to run when the user wants to take a photo:
   * gets the current frame on the camera, applies the style
   * transer and updates the component state
   */
  _onNewPhoto = () => {
    this.screamStylePromise
      .then(style => style.transfer(this.camera.video))
      .then(result => {
        const cameraAspectRatio = MediaUtils.getAspectRatio(this.camera.video);
        const dimensions = getMaxDimensionsRespectingAspectRatio(cameraAspectRatio);
        const newImageData = {
          dataUrl: result.src,
          width: dimensions.width,
          height: dimensions.height,
        }

        this.setState(prevState => ({
          imageData: [...prevState.imageData, newImageData]
        }));
      });
  };
}
