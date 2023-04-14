import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
        <div class="border border-dark d-flex col bg-secondary">
            {/* {isFav ? (
                <button class="d-block w-1 justify-content-end align-items-start" onClick={handleFavorites}>❤️</button>
            ) : (
                <button class="d-block w-1 align-items-start justify-content-end" onClick={handleFavorites}>🤍</button>
            )} */}
            <Link to={`/bookDetail/${bookId}`}>
                <img class="w-100 p-3" src={image} alt="Max-width 40%" />
            </Link>
                <h2>Title: {name}</h2>
                <h2>Author: {author}</h2>
                <h2>Categories: {categories}</h2>
                
        </div>
    )
}

export default Card;