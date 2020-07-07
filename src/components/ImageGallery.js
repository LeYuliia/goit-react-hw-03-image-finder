import React from "react";
import ImageGalleryItem from "./ImageGalleryItem";

const ImageGallery = ({ images, onClick }) => (
  <ul onClick={onClick} className="ImageGallery">
    {images.map(({ id, webformatURL, tags }) => (
      <li key={id} className="ImageGalleryItem">
        <ImageGalleryItem id={id} src={webformatURL} alt={tags} />
      </li>
    ))}
  </ul>
);

export default ImageGallery;
