import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import noImage from '../../images/icon-image-not-found.webp'
import style from '../Card/Card.module.css';
import { BsCartPlus } from 'react-icons/bs';

import { addToCart } from "../../Redux/actions";



function Card(props) {
    const dispatch = useDispatch();
    const [isFav, setIsFav] = useState(false)
    // add useSelector in initialState with myFavorites

    // const {bookId} = useParams();

    function handleFavorites() {
        if (isFav) {
            setIsFav(false);
        } else {
            setIsFav(true);
        }
    }

    const handleAddToCart = () =>{
        dispatch(addToCart(props))
    }

    return (

        <div class="m-3 d-inline-block shadow-lg " style={{ width: "180px", height: "350px", padding: "10px" }}>
            <Link style={{ color: "black", textDecoration: "none" }} to={`/bookDetail/${props.bookId}`}>
                {/* {isFav ? (
            <button class="d-block w-1 justify-content-end align-items-start" onClick={handleFavorites}>❤️</button>
        ) : (
            <button class="d-block w-1 align-items-start justify-content-end" onClick={handleFavorites}>🤍</button>
        )} */}
                <div class="d-flex flex-column">

                    <div class="bg-light" style={{ width: "140px", height: "200px", margin: "0 auto", backgroundColor: "black" }}>
                        {props.image ? <img style={{ width: "140px", height: "200px" }} src={props.image} alt="book" />
                            : <img style={{ width: "140px", height: "200px" }} src={props.noImage} alt="not found" />
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
                        {props.name}
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

                        }} class="text-xs ">{props.author}</p>
                        <p style={{ fontSize: "13px", color: "#088000" }}><small>{props.categories}</small></p>
                    </div>
                </div>
            </Link>
            <button onClick={handleAddToCart} > <BsCartPlus /> </button>
        </div>
    )
}

export default Card;