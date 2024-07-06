import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

function BranchTables({ branch, restaurantId }) {
  const navigate = useNavigate();
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    initialSlide: 1,
  };

  const allImages = branch.tables.reduce((accumulator, table) => {
    accumulator.push(...table.images.map((image) => image));
    return accumulator;
  }, []);

  function handelShowTables() {
    navigate(`/restaurant/${restaurantId}/branches`, {
      state: { branchId: 2, showBranchTables: true },
    });
  }

  return (
    <div className="slider-container w-75 m-auto" onClick={handelShowTables}>
      <Slider {...settings}>
        {allImages.length > 0 &&
          allImages.map((image) => (
            <div
              key={image.id}
              style={{ maxHeight: "400px" }}
              className="d-flex justify-content-center align-items-center"
            >
              <img
                src={image.image}
                className="px-1"
                alt=""
                style={{ height: "300px", width: "100%", objectFit: "cover" }}
              />
            </div>
          ))}
      </Slider>
    </div>
  );
}

export default BranchTables;
