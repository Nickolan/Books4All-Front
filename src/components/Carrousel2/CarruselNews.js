import React from "react";
import "./Carrusel.css";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useSelector } from "react-redux";
import img_default from "../Carrousel1/img/img_default.jpg";
import { Link } from "react-router-dom";

export default function Carrusel1() {
  const slides = [1];

  const books = useSelector((state) => state.allBooks);

  // const books = books.sort((a, b) => b.rating.localeCompare(a.rating)); es requerido un promedio del rating en el modelo de cada libro que se modifica con cada publicacion

  const images = books.map((book) => book.image).slice(60, 70); //me devuelve un array de las primeras 10 imágenes
  const bookTitle = books.map((book) => book.title).slice(60, 70);
  const bookId = books.map((book) => book.id).slice(60, 70);

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
      <h4>Most Popular (se nesecita un promedio de puntaje por cada libro)</h4>
      <div id="main-slider-container">
        <FiChevronLeft
          size={40}
          className="slider-icon left"
          onClick={slideLeft}
        />

        <div id="slider2" className="h-100">
          {slides.map((slide, index) => {
            return (
              <div className="slider w-25  ">
                {images.map((img, index) => (
                  <Link to={`/bookDetail/${bookId[index]}`}>
                    <img
                      className="slider-card w-50"
                      src={img || img_default}
                      alt={bookTitle[index]}
                      key={index}
                      title={bookTitle[index]}
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
