import React from "react";
import DownloadableImage from "./DownloadableImage";

/**
 * Returns a list item component to show a new downloadable
 */
function createPhotoListItem(imageData, index) {
  return (
    <li key={index} className="result-container">
      <DownloadableImage
        dataUrl={imageData.dataUrl}
        alt={`Photo ${index}`}
        width={imageData.width}
        height={imageData.height}
        imageName={`Photo ${index}`}
      />
    </li>
  );
}

/**
 * List of downloadable images
 */
export default props => (
  <ul className="result-list container">
    {props.imageData.map(createPhotoListItem)}
  </ul>
);
