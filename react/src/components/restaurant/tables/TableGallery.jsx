import { useState } from "react";
import { Image } from "react-bootstrap";

export function TableGallery({ gallery }) {
  const [expandedImage, setExpandedImage] = useState(gallery[0]);
  return (
    <div className="gallery col-12 col-sm-10 col-md-8 col-lg-8 d-flex flex-column flex-lg-row align-items-center align-items-lg-stretch justify-content-between">
      <div className="expanded col-10">
        <Image src={expandedImage.image} fluid />
      </div>
      <div className="images col-12 mt-lg-0 col-lg-2 d-flex justify-content-evenly align-items-center flex-lg-column">
        {gallery.map((image) => (
          <div
            className={`image ${
              expandedImage.id === image.id ? "selected" : ""
            }`}
            key={image.id}
            onClick={() => setExpandedImage(image)}
          >
            <Image src={image.image} fluid />
          </div>
        ))}
      </div>
    </div>
  );
}
