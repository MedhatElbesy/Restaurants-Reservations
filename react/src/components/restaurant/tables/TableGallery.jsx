import { useState } from "react";
import { Image } from "react-bootstrap";
import { ExpandedImage } from "./ExpandedImage";

export function TableGallery({ gallery }) {
  const [expandedImage, setExpandedImage] = useState(null);

  const handleClose = () => {
    setExpandedImage(null);
  };

  return (
    <>
      {gallery.map((image) => (
        <div
          className={`image ${expandedImage === image ? "expanded" : ""}`}
          key={image.id}
          onClick={() => setExpandedImage(image)}

        >
          <Image src={image.image} fluid />
        </div>
      ))}

      {expandedImage && (
        <ExpandedImage image={expandedImage} onClose={handleClose} />
      )}
    </>
  );
}
