import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

function BranchTables({ branch, restaurantId }) {
  const navigate = useNavigate();
  const settings = {
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
    accumulator.push(...table.images);
    return accumulator;
  }, []);

  function handleShowTables() {
    navigate(`/restaurant/${restaurantId}/branches`, {
      state: { branchId: branch.id, showBranchTables: true },
    });
  }

  return (
    <div className="slider-container w-75 m-auto" onClick={handleShowTables}>
      <Slider {...settings}>
        {allImages.length > 0 &&
          allImages.map((image) => (
            <div
              key={image.id}
              style={{ maxHeight: "400px" }}
              className="d-flex justify-content-center align-items-center"
            >
              <img
                src={
                  image.image
                    ? image.image
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png"
                }
                className="px-1"
                alt="Table"
                style={{ height: "300px", width: "100%", objectFit: "cover" }}
              />
            </div>
          ))}
      </Slider>
    </div>
  );
}

export default BranchTables;
