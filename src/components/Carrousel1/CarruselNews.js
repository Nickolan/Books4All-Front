import React from "react";
import "./Carrusel.css";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useSelector } from "react-redux";
import img_default from "../Carrousel1/img/img_default.jpg";
import { Link } from "react-router-dom";

export default function Carrusel1() {
  const slides = [1];

  const books = useSelector((state) => state.allBooks);

  let dateNotNull = books.filter((book) => book.date !== null);
  const latestNews = dateNotNull.sort((a, b) => b.date.localeCompare(a.date));
  const bookTitle = latestNews.map((book) => book.title).slice(0, 20);

  const bookId = latestNews.map((book) => book.id).slice(0, 20);

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
              <div className="slider w-25 ">
                {latestNews.map((book, index) => (
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
