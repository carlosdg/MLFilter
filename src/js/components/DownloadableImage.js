import React from "react";
import DownloadLink from "./DownloadLink";

/**
 * Image with a download link
 */
export default class DownloadableImage extends React.Component {
  state = {
    isImageLoaded: false
  };

  render() {
    return (
      <React.Fragment>
        <img
          src={this.props.dataUrl}
          alt={this.props.alt}
          width={this.props.width}
          height={this.props.height}
          onLoad={this.onImageLoad}
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
          urlToDownload={this.props.dataUrl}
        >
          {`Download ${this.props.imageName}`}
        </DownloadLink>
      );
    } else {
      return <p>{`"${this.props.imageName}"`} not available yet</p>;
    }
  }

  /**
   * Sets the component state to indicate that the image has been loaded
   */
  onImageLoad = () => this.setState({isImageLoaded: true})
}
