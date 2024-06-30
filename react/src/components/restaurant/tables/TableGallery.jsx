import { useState } from "react";
import { Image } from "react-bootstrap";

export function TableGallery({ gallery }) {
  const [expandedImage, setExpandedImage] = useState(gallery[0]);
  return (
    <div className="gallery col-8 d-flex justify-content-between">
      <div className="expanded col-10">
        <Image src={expandedImage.image} fluid />;
      </div>
      <div className="images col-2 d-flex justify-content-around align-items-center flex-column">
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
