import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';


const CardSlick = ({children}) => {
    
    const NextArrow = (props) => {
        const { onClick } = props;
        return (
          <div className="custom-arrow next-arrow" onClick={onClick}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        );
      }
      
    const PrevArrow = (props) => {
        const { onClick } = props;
        return (
          <div className="custom-arrow prev-arrow" onClick={onClick}>
             <FontAwesomeIcon icon={faChevronLeft} />
          </div>
        );
      }
    
   const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (
    <Slider {...settings}>
   {children}
    </Slider>
  );
};

export default CardSlick;

