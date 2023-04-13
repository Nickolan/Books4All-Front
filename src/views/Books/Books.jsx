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

    for (let i = 1; i <= Math.ceil(books.length / booksForPage) ; i++) {
        pageNumber.push(i)
        
    }

    const paginado = (page) => {
        setCurrentPage(page)
    }

    return (
        <div>
            <Navbar/>

            <div>
                <button>A-Z</button>
                <button>Rating</button>
                <button>author A-Z</button>
                <button>Genre</button>
            </div>
            <hr />

            {<Cards libros={libros}/>}
            <div>
                {currentBooks}
            </div>

            <hr />
            <div><h2>{currentPage}</h2></div>
            <nav>
                {pageNumber.map((number, key) => <div onClick={() => paginado(number)} key={key}>{number}</div>)}
            </nav>
        </div>
    )
}