import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from '../../components/NavBar/Navbar'
import Cards from '../../components/Cards/Cards'
import { getBooks, resetFilters } from "../../Redux/actions";
import Searchbar from "../../components/SearchBar/Searchbar";
import Footer from "../../components/Footer/Footer";
import Filters from "../../components/Filters/Filters";

export default function Books(){
    const dispatch = useDispatch();
    const books = useSelector((state)=>state.books)
    
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

    const OnHandlerReset=()=>{
        dispatch(resetFilters())
    }

    useEffect(() => {
        dispatch(getBooks())
        console.log(books);
    }, [])

    return (
        <div className='bg-light text-black border border-dark'>
            <Navbar/>

            <Filters />

            <div class='d-flex mt-1 justify-content-center w-25 bg-dark'>
                <button class='btn btn-transparent text-light'>A-Z</button>
                <button class='btn btn-transparent text-light'>Rating</button>
                <button class='btn btn-transparent text-light'>author A-Z</button>
                <button class='btn btn-transparent text-light'>Genre</button>
                <button onClick={OnHandlerReset}  className="w-1">🔄 </button>
            </div>
            <Searchbar/>
            <div class="container">
            {<Cards books={currentBooks}/>}
            </div>

            <hr />
            <div class="d-flex justify-content-around">
                <button onClick={handlePrev}>◄</button>
                <div><h2>{currentPage}</h2></div>
                <button onClick={handleNext}>►</button>
            </div>

            <Footer/>
            
        </div>
    )
}