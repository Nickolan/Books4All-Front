import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Card.module.css"


function Card({name, author, image, categories, bookId}) {
    const dispatch = useDispatch();
    const [isFav, setIsFav] = useState(false)
    // add useSelector in initialState with myFavorites

    function handleFavorites() {
        if (isFav) {
            setIsFav(false);
        } else {
            setIsFav(true);
        }
    }

    return (
        <div class="border  d-flex  bg-secondary">
            {/* {isFav ? (
                <button class="d-block w-1 justify-content-end align-items-start" onClick={handleFavorites}>❤️</button>
            ) : (
                <button class="d-block w-1 align-items-start justify-content-end" onClick={handleFavorites}>🤍</button>
            )} */}
            <Link to={`/bookDetail/${bookId}`}>
                <img class="w-100 p-3" src={image} alt="Max-width 40%" />
            </Link>
            <div >
                <h2>Title: {name}</h2> 
                <h2>Author: {author}</h2>
                <h2>Categories: {categories}</h2>
            {/* los nombre title, author y categories tal vez se podrían omitir y que se infiera por el contenido? */}
            </div>
                
        </div>
    )
}

export default Card;