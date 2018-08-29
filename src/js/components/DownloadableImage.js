import React from "react";
import DownloadLink from "./DownloadLink";

/**
 * Image with a download link.
 * Internally we use a hidden canvas and draw the image there. Then,
 * when the user wants to download the image we use the data URL from
 * the canvas. This way we make sure that the image downloaded have the
 * dimensions that were demanded by parent components
 */
export default class DownloadableImage extends React.Component {
  state = {
    isImageLoaded: false
  };

  render() {
    return (
      <React.Fragment>
        <canvas
          width={this.props.width}
          height={this.props.height}
          ref={canvas => (this.canvas = canvas)}
          hidden
        />
        <img
          src={this.props.dataUrl}
          alt={this.props.alt}
          width={this.props.width}
          height={this.props.height}
          onLoad={this.onImageLoad}
          ref={image => (this.image = image)}
        />
        {this.getDownloadButton()}
      </React.Fragment>
    );
  }

  /**
   * Returns the right component to render as the dowload button
   * depending whether the image has been loaded or not
   */
  getDownloadButton() {
    if (this.state.isImageLoaded) {
      return (
        <DownloadLink
          downloadedFileName={this.props.imageName}
          urlToDownload={this.canvas.toDataURL()}
        >
          {`Download ${this.props.imageName}`}
        </DownloadLink>
      );
    } else {
      return <p>{`"${this.props.imageName}"`} not available yet</p>;
    }
  }

  /**
   * Load the image in the canvas. And set the component state
   * to indicate that the image has been loaded
   */
  onImageLoad = () => {
    this.canvas
      .getContext("2d")
      .drawImage(this.image, 0, 0, this.props.width, this.props.height);

    this.setState({ isImageLoaded: true });
  };
}
