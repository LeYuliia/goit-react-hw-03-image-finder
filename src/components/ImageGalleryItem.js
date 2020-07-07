import React from "react";

const ImageGalleryItem = ({ src, alt, id }) => (
  <img id={id} src={src} alt={alt} className="ImageGalleryItem-image" />
);

export default ImageGalleryItem;
