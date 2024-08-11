import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const slideStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const rightArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "32px",
  fontSize: "45px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const leftArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "32px",
  fontSize: "45px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const sliderStyles = {
  position: "relative",
  height: "100%",
};

function ImageComp() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  const [currentIndex, setCurrentIndex] = useState(0);

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products/${id}`);
      const productData = response.data.data;

      if (productData && productData.img) {
        setData(productData);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const slides = [
    { url: data.img && data.img.img1 ? data.img.img1 : "", title: "beach" },
    { url: data.img && data.img.img2 ? data.img.img2 : "", title: "boat" },
    { url: data.img && data.img.img3 ? data.img.img3 : "", title: "forest" },
    { url: data.img && data.img.img4 ? data.img.img4 : "", title: "city" },
    { url: data.img && data.img.img5 ? data.img.img5 : "", title: "italy" },
  ];

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const slideStylesWidthBackground = {
    ...slideStyles,
    backgroundImage: `url(${slides[currentIndex].url})`,
  };

  return (
    <div style={sliderStyles}>
      <div>
        <div onClick={goToPrevious} style={leftArrowStyles}>
          ❰
        </div>
        <div onClick={goToNext} style={rightArrowStyles}>
          ❱
        </div>
      </div>
      <div style={slideStylesWidthBackground}></div>
    </div>
  );
}

export default ImageComp;
