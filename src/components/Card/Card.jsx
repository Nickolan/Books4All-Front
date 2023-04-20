import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import noImage from '../../images/icon-image-not-found.webp'
import style from '../Card/Card.module.css'

import { BsCartPlus } from 'react-icons/bs';
import { addToCart } from "../../Redux/actions";

function Card({ name, author, image, categories, bookId, price }) {
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

    const handleClickAddCart = (event) => {
        function generarIdUnico() {
            return Math.random().toString(36).substring(2) + Date.now().toString(36);
        }

        const bookInCart = {
            id: generarIdUnico(),
            bookId: bookId,
            quantity: 1,
        }
        dispatch(addToCart(bookInCart))

    }

    
    return (

        <div class="m-3 d-inline-block shadow-lg " style={{ width: "180px", height: "350px", padding: "10px" }}>
            <Link style={{ color: "black", textDecoration: "none" }} to={`/bookDetail/${bookId}`}>
                {/* {isFav ? (
            <button class="d-block w-1 justify-content-end align-items-start" onClick={handleFavorites}>❤️</button>
        ) : (
            <button class="d-block w-1 align-items-start justify-content-end" onClick={handleFavorites}>🤍</button>
        )} */}
                <div class="d-flex flex-column">

                    <div class="bg-light" style={{ width: "140px", height: "200px", margin: "0 auto", backgroundColor: "black" }}>
                        {image ? <img style={{ width: "140px", height: "200px" }} src={image} alt="book" />
                            : <img style={{ width: "140px", height: "200px" }} src={noImage} alt="not found" />
                        }
                    </div>

                    <h5 style={{
                        marginTop: "10px",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "14px",

                    }}>
                        {name}
                    </h5>
                    <div style={{ display: "flex", flexDirection: "column", }}>
                        <p style={{
                            fontSize: "13px",
                            marginTop: "10px",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",

                        }} class="text-xs ">{author}</p>
                        <p style={{ fontSize: "13px", color: "#088000" }}><small>{categories}</small></p>
                    </div>
                </div>
            </Link>
            <button onClick={handleClickAddCart} > <BsCartPlus /> </button>
        </div>
    )
}

export default Card;