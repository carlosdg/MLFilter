import React from "react";
import DownloadableImage from "./DownloadableImage";

/**
 * Returns a string representation of the local date time
 * from the given milliseconds from Unix time
 */
function millisecondsToLocaleTimeDateString(milliseconds) {
  const date = new Date(milliseconds);
  return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`
}

/**
 * Returns a list item component to show a new downloadable
 */
function createPhotoListItem(imageData, index) {
  return (
    <li key={index} className="result-container">
      <DownloadableImage
        dataUrl={imageData.dataUrl}
        alt={`Photo taken at ${millisecondsToLocaleTimeDateString(imageData.date)}`}
        width={imageData.width}
        height={imageData.height}
        imageName={`Photo taken at ${millisecondsToLocaleTimeDateString(imageData.date)}`}
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
