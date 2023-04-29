import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from '../../components/NavBar/Navbar'
import Cards from '../../components/Cards/Cards'
import { getBooks, alphabeticalOrder, resetFilters, filterByCategory, filterByAuthor, } from "../../Redux/actions";
import Searchbar from "../../components/SearchBar/Searchbar";
import Footer from "../../components/Footer/Footer";
import Filters from "../../components/Filters/Filters";
import style from "./Books.module.css"
import Order from "../../components/Order/Order";
import Paginado from "../../components/Paginado/Paginado";
import { setCart } from "../../Redux/actions/localStorage";
import { useAuth0 } from "@auth0/auth0-react";
import { Loader } from "../../components/Loader/Loader";


export default function Books() {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.books)
    const genreFilter = useSelector(state => state.filters.category);
    const authorFilter = useSelector(state => state.filters.author);
    const orderType = useSelector(state => state.order);
    const cart= useSelector(state=> state.cart)
    const favorites = useSelector(state => state.dbUser.Books)
    const arrayFavorites = []
    favorites?.map(item => {
        arrayFavorites.push(item.title)
    })
    
    setCart('cart', cart)
    const {user} = useAuth0()
    const[loader, setLoader]= useState(false)

    const [currentPage, setCurrentPage] = useState(1)
    const booksForPage = 12;
    const lastBook = currentPage * booksForPage;
    const firstBook = lastBook - booksForPage;
    const currentBooks = books.slice(firstBook, lastBook);
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(books.length / booksForPage); i++) {
        pageNumber.push(i)

    }

    useEffect(() => {
             setLoader(true)      
             setTimeout(() => {
                setLoader(false);
              },320);
             dispatch(filterByCategory(genreFilter))
            dispatch(filterByAuthor(authorFilter))
            dispatch(alphabeticalOrder(orderType))
           
    }, [])

    return (
        <div class='container  h-auto'>
            <Navbar />

      
            {
            loader ?
               <Loader/>
            :
            <>            
           
            <Searchbar setCurrentPage={setCurrentPage} />
            <div class='d-flex mx-auto align-items-center justify-content-between' style={{ width: "80%", height: '50px', borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0", padding: '0 10px 0 7px' }}>
                <Filters setCurrentPage={setCurrentPage} />
                <Order setCurrentPage={setCurrentPage} />
            </div>
            <div class="mx-auto" style={{ width: "80%", marginBottom: '40px' }}>
            {currentBooks.length >0  ? 
             <Cards books={currentBooks} favorites={arrayFavorites} />
             :
             loader && <p style={{fontWeight: 'bold', border: 'none', fontFamily: 'Work Sans, sans-serif', fontSize:'30px', margin:'50px auto'}}>Sorry, we could not find any books matching your criteria</p>
            }
            </div>
            <div class="d-flex justify-content-around">
               <Paginado
                booksPerPage={booksForPage}
                numberBooks={books.length}
                setPage={setCurrentPage}
                currentPage={currentPage}
                currentBooks={currentBooks}
                indexFirstBook={firstBook}
                />
            </div>
                </>
 }
            

            <Footer />

        </div>
    )
}