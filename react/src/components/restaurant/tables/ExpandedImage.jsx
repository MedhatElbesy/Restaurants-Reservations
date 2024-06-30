import { Image } from "react-bootstrap";

export function ExpandedImage({ image }) {
  return <Image src={image.image} fluid />;
}
