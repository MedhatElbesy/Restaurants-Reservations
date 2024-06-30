import { Image } from "react-bootstrap";

export function ExpandedImage({ image, onClose }) {
  return (
    <div className="expanded-image">
      <Image src={image.image} fluid />
      <div className="close text-danger" onClick={onClose}>
        X
      </div>
    </div>
  );
}
