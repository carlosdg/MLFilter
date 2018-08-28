import React from "react";

/**
 * Link to download the content of urlToDownload.
 * Note: does not check for same-origin policy
 */
export default props => (
  <a
    className="download-image-link"
    download={props.downloadedFileName}
    href={props.urlToDownload}
  >
    {props.children}
  </a>
);