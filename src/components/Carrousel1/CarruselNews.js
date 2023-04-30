import React from "react";
import "./Carrusel.css";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useSelector } from "react-redux";
import img_default from "../Carrousel1/img/img_default.jpg";
import { Link } from "react-router-dom";

export default function Carrusel1() {
  const slides = [1];

  const books = useSelector((state) => state.allBooks);
  /* 
  order by price- ofertas
  const booksByPrice = books.sort((a, b) => Number(a.price) - Number(b.price));
  console.log(booksByPrice.slice(0, 60));
   */
  let dateNotNull = books.filter((book) => book.date !== null);
  const latestNews = dateNotNull.sort((a, b) => b.date.localeCompare(a.date));
  console.log(latestNews);

  const images = latestNews.map((book) => book.image).slice(6, 25);
  const bookTitle = latestNews.map((book) => book.title).slice(6, 25);

  const bookId = latestNews.map((book) => book.id).slice(6, 25);

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <h4>Latest News</h4>
      <div id="main-slider-container">
        <FiChevronLeft
          size={40}
          className="slider-icon left"
          onClick={slideLeft}
        />

        <div id="slider" className="h-100">
          {slides.map((slide, index) => {
            return (
              <div className="slider-card w-25 ">
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
