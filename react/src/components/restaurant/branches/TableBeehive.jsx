import "./Branches.css";

const BeehiveGallery = ({ images }) => {
  return (
    <>
      {images.map((image, index) => (
        <div key={index} className="hex">
          <img src={image} alt={`Table ${index + 1}`} />
        </div>
      ))}
    </>
  );
};

export default BeehiveGallery;
