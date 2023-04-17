import React, { useEffect } from "react";
import { useState } from "react";
import "./Carrusel.css";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "../../Redux/actions/index";
import img_default from "../Carrousel1/img/img_default.jpg";
import { Link } from "react-router-dom";

/* const images = [
  {
    url: "https://maldon.es/wp-content/uploads/2016/04/12428422.jpg",
    title: "Image 1",
  },
  {
    url: "https://www.sopitas.com/site/wp-content/uploads/2015/04/libro_naranja_mecanica1.jpg",
    title: "Image 2",
  },
  {
    url: "https://marketplace.canva.com/EAFI171fL0M/1/0/1003w/canva-portada-de-libro-de-novela-ilustrado-color-azul-aqua-PQeWaiiK0aA.jpg",
    title: "Image 3",
  },
]; */

export default function Carrusel1(props) {
  const slides = [1];
  const dispatch = useDispatch();

  const books = useSelector((state) => state.images);

  useEffect(() => {
    dispatch(getImages());
    console.log(images);
  }, []);

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
      <h4>Must Read - Our Favorites</h4>
      <div id="main-slider-container">
        <FiChevronLeft
          size={40}
          className="slider-icon left"
          onClick={slideLeft}
        />

        <div id="slider2" className="h-100">
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
