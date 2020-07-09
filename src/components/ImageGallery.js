import React from "react";
import ImageGalleryItem from "./ImageGalleryItem";

const ImageGallery = ({ images, onClick: onClickImage }) => (
  <ul className="ImageGallery">
    {images.map(({ id, webformatURL, tags }) => (
      <li
        key={id}
        onClick={() => onClickImage(id)}
        className="ImageGalleryItem"
      >
        <ImageGalleryItem id={id} src={webformatURL} alt={tags} />
      </li>
    ))}
  </ul>
);

export default ImageGallery;
