import React from "react";
import "./Carrusel.css";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useSelector } from "react-redux";
import img_default from "../Carrousel1/img/img_default.jpg";
import { Link } from "react-router-dom";

export default function Carrusel1() {
  const slides = [1];
  const books = useSelector((state) => state.allBooks);
  const Orderedbooks = books.sort((a, b) => b.Reviews.length - a.Reviews.length); // es requerido un promedio del rating en el modelo de cada libro que se modifica con cada publicacion
  const bookTitle = Orderedbooks.map((book) => book.title).slice(0, 20);
  const bookId = Orderedbooks.map((book) => book.id).slice(0, 20);

  const slideLeft = () => {
    var slider3 = document.getElementById("slider2");
    slider3.scrollLeft = slider3.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider3 = document.getElementById("slider2");
    slider3.scrollLeft = slider3.scrollLeft + 500;
  };

  return (
    <>
      <h4>Most Popular</h4>
      <div id="main-slider-container">
        <FiChevronLeft
          size={40}
          className="slider-icon left"
          onClick={slideLeft}
        />

        <div id="slider2" className="h-100">
          {slides.map((slide, index) => {
            return (
              <div key={index} className="slider w-25  ">
                {Orderedbooks.map((book, index) => (
                  <Link to={`/bookDetail/${bookId[index]}`}>
                    <img
                      className="slider-card w-50"
                      src={book.image || img_default}
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
