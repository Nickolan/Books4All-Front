import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import noImage from '../../images/icon-image-not-found.webp'
import { BsCartPlus } from 'react-icons/bs';
import { addToCart } from "../../Redux/actions";
import { authorCont, authorStyle, catStyle, imgContainer, imgStyle, linkStyle, noImgStyle, titleStyle, totalContainer } from "./inlineStyles";

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
        <div class="m-3 d-inline-block shadow-lg " style={totalContainer}>
            <Link style={linkStyle} to={`/bookDetail/${bookId}`}>
                {/* {isFav ? (
            <button class="d-block w-1 justify-content-end align-items-start" onClick={handleFavorites}>❤️</button>
        ) : (
            <button class="d-block w-1 align-items-start justify-content-end" onClick={handleFavorites}>🤍</button>
        )} */}
                <div class="d-flex flex-column">
                    <div class="bg-light" style={imgContainer}>
                        {image ? <img style={imgStyle} src={image} alt="book" />
                            : <img style={noImgStyle} src={noImage} alt="not found" />
                        }
                    </div>
                    <h5 style={titleStyle}>{name}</h5>
                    <div style={authorCont}>
                        <p style={authorStyle} class="text-xs ">{author}</p>
                        <p style={catStyle}><small>{categories}</small></p>
                    </div>
                </div>
            </Link>
            <button onClick={handleClickAddCart} > <BsCartPlus /> </button>

        </div>
    )
}

export default Card;