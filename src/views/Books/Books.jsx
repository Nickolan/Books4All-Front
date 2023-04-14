import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from '../../components/NavBar/Navbar'
import Cards from '../Cards/Cards'
import libros from "./ejemplo";


export default function Books(){
    const dispatch = useDispatch();
    const {books, allBooks} = useSelector(state => state)
    
    const [currentPage, setCurrentPage ] = useState(1)
    const booksForPage = 9;
    const lastBook = currentPage * booksForPage;
    const firstBook = lastBook - booksForPage;
    const currentBooks = books.slice(firstBook, lastBook);
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(libros.length / booksForPage) ; i++) {
        pageNumber.push(i)
        
    }

    const paginado = (page) => {
        setCurrentPage(page)
    }

    const handleNext = () => {
        if (currentPage === pageNumber.length) {
            setCurrentPage(currentPage + 0)
        } else {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    useEffect(() => {
        dispatch()
    }, [])

    return (
        <div className='bg-light text-black border border-dark'>
            <Navbar/>

            <div class='d-flex justify-content-center w-25 bg-dark'>
                <button class='btn btn-transparent text-light'>A-Z</button>
                <button class='btn btn-transparent text-light'>Rating</button>
                <button class='btn btn-transparent text-light'>author A-Z</button>
                <button class='btn btn-transparent text-light'>Genre</button>
            </div>
            <section class='articulo justify-content-start'>
                <h2>articulo</h2>
            </section>
            <hr />
            <div class="container">
            {<Cards libros={libros}/>}
            </div>
            <div>
                {currentBooks}
            </div>

            <hr />
            <div class="d-flex justify-content-around">
                <button onClick={handlePrev}>◄</button>
                <div><h2>{currentPage}</h2></div>
                <button onClick={handleNext}>►</button>
            </div>
            <nav>
                {pageNumber.map((number, key) => <div onClick={() => paginado(number)} key={key}>{number}</div>)}
            </nav>

            {/*Footer*/}
            
        </div>
    )
}