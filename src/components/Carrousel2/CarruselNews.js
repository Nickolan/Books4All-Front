import React from "react";
import { useState } from "react";
import './Carrusel.css'
import {FiChevronRight, FiChevronLeft} from 'react-icons/fi'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";



const images = [
    { url: 'https://maldon.es/wp-content/uploads/2016/04/12428422.jpg', title: 'Image 1' },
    { url: 'https://www.sopitas.com/site/wp-content/uploads/2015/04/libro_naranja_mecanica1.jpg', title: 'Image 2' },
    { url: 'https://marketplace.canva.com/EAFI171fL0M/1/0/1003w/canva-portada-de-libro-de-novela-ilustrado-color-azul-aqua-PQeWaiiK0aA.jpg', title: 'Image 3' },
]




export default function Carrusel2(props){

    const books = useSelector((state)=>state.books)

    const slides2 = books.slice(12, 20);

    const slideLeft = () =>{
        var slider3 = document.getElementById("slider2");
        slider3.scrollLeft = slider3.scrollLeft - 500;
    }
    const slideRight = () =>{
        var slider3 = document.getElementById("slider2");
        slider3.scrollLeft = slider3.scrollLeft + 500;
    }

    return(
        <div id="main-slider-container2" >
            <FiChevronLeft size={40} className="slider-icon left" onClick={slideLeft} />

            <div id="slider2" >
                {
                    slides2.map((slide, index)=>{
                        return(
                            <div className="slider-card">
                                <Link to={`/bookDetail/${slide.id}`}>
                                <div className="slider-card-image"><img className="slider-image-card" src={slide.image} alt={index} /></div> 
                                </Link>
                                <p>{slide.title}</p>
                                <p>{slide.authors}</p>
                            </div>
                        )
                    })
                }
            </div>

            <FiChevronRight size={40} className="slider-icon right" onClick={slideRight} />
        </div>
    )
}