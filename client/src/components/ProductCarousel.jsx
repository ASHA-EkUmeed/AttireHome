import Carousel from "react-bootstrap/Carousel";
import Banner1 from '../assets/images/banner-1.jpg'
import Banner2 from "../assets/images/banner-2.jpg";

function ProductCarousel() {
  return (
    <>
      <Carousel className="carousel" style={{ marginBottom: "30px" }}>
        {/* First Carousel Item */}
        <Carousel.Item>
          <img
            src={Banner1}
            alt="img"
            style={{ width: "90vw", height: "80vh" }}
          />
          <Carousel.Caption
            style={{
              position: "absolute",
              width: "100%",
              left: "0",
              right: "0",
              bottom: "0",
              background: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <h3>Attire Home </h3>
            <p> We Sell Best Branded Attires.</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Second Carousel Item */}
        <Carousel.Item>
          <img
            src={Banner2}
            alt="img"
            style={{ width: "100vw", height: "80vh" }}
          />

          <Carousel.Caption
            style={{
              position: "absolute",
              width: "100%",
              left: "0",
              right: "0",
              bottom: "0",
              background: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <h3>Our Designs</h3>
            <p> We Sell Best Quality Of All Type Clothes.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default ProductCarousel;
