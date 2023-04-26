import React from "react";
import "./Carrusel.css";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useSelector } from "react-redux";
import img_default from "../Carrousel1/img/img_default.jpg";
import { Link } from "react-router-dom";

export default function Carrusel3() {
  const slides = [1];

  const books = useSelector((state) => state.allBooks);

  const images = books.map((book) => book.image).slice(140, 160); //me devuelve un array de las primeras 10 imágenes
  const bookTitle = books.map((book) => book.title).slice(140, 160);
  const bookId = books.map((book) => book.id).slice(140, 160);

  const slideLeft = () => {
    var slider = document.getElementById("slider3");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider3");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <h4>Book Saves - Best Discounts of the week!</h4>
      <div id="main-slider-container">
        <FiChevronLeft
          size={40}
          className="slider-icon left"
          onClick={slideLeft}
        />

        <div id="slider3" className="h-100">
          {slides.map((slide, index) => {
            return (
              <div className="slider-card ">
                {images.map((img, index) => (
                  <Link to={`/bookDetail/${bookId[index]}`}>
                    <img
                      className="slider-card w-50"
                      src={img || img_default}
                      alt={bookTitle[index]}
                      key={index}
                    />
                  </Link>
                ))}
              </div>
            );
          })}
        </div>

        <FiChevronRight
          size={40}
          className="slider-icon right"
          onClick={slideRight}
        />
      </div>
    </>
  );
}
