import Carousel from "react-bootstrap/Carousel";

function MainCarousel() {
  return (
    <>
      <Carousel fade className="main_carousel">
        <Carousel.Item>
          <div id="bg1" className="bg_img" />
        </Carousel.Item>
        <Carousel.Item>
          <div id="bg2" className="bg_img" />
        </Carousel.Item>
        <Carousel.Item>
          <div id="bg3" className="bg_img" />
        </Carousel.Item>
        <Carousel.Item>
          <div id="bg4" className="bg_img" />
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default MainCarousel;
