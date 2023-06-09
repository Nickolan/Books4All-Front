import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import noImage from '../../images/icon-image-not-found.webp'
import {toast}from 'react-toastify'
import { BsCartPlus } from 'react-icons/bs';
import { addToCart, sideBar } from "../../Redux/actions";
import { FavButton } from "../FavButton/FavButton";
import { useAuth0 } from "@auth0/auth0-react";

function Card({ name, author, image, categories, bookId, price, isFav, stock }) {
    const dispatch = useDispatch();
    const { isAuthenticated } = useAuth0();
    const cart = useSelector((state) => state.cart)

    const handleClickAddCart = (event) => {
        event.preventDefault()
        const buy = cart.find(item => item.bookId === bookId)
        function generarIdUnico() {
            return Math.random().toString(36).substring(2) + Date.now().toString(36);
        }

        const bookInCart = {
            id: generarIdUnico(),
            bookId: bookId,
            quantity: 1,
        }
        if (buy) {
            dispatch(sideBar())
        } else {
            if (stock > 0) {
                dispatch(addToCart(bookInCart))
                dispatch(sideBar())
            }
        }
       
        toast(`You have added ${name} to the cart !`, { //toast desde la vista de books, libro agregado
            position: "bottom-right",
            style: {
                background:'linear-gradient(97deg, rgba(33,30,31,1) 0%, #5c5c5f 5%)',
              color: "white",
            },
            progressBar: {
              backgroundColor: "red",
            },
            autoClose: 1000,
            closeOnClick: true,
          });


    }

    return (

        <div class="m-3 d-inline-block bg-light " style={{ width: "180px", height: "380px", padding: "14px" }}>

            <div class="d-flex flex-row">
                <button onClick={handleClickAddCart} style={{ marginBottom: '5px', marginRight: '2px', border: 'none', backgroundColor: 'transparent' }}> <BsCartPlus style={{ fontSize: '1.1rem' }} /> </button>
                {isAuthenticated && <FavButton name={name} book_id={bookId} isFav={isFav} />}
            </div>
            <Link style={{ textDecoration: "none" }} to={`/bookDetail/${bookId}`}>

                <div class="d-flex flex-column bg-light">


                    <div class="bg-light" style={{ width: "140px", height: "200px", margin: "0 auto" }}>
                        {image ? <img style={{ width: "140px", height: "200px" }} title={name} src={image} alt="book" />
                            : <img style={{ width: "140px", height: "200px" }} src={noImage} alt="not found" />
                        }
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <h5 style={{
                            marginTop: "10px",
                            marginLeft: '3px',
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontSize: "14px",
                            color: "black"

                        }}>
                            {name}
                        </h5>
                        <p style={{
                            fontSize: "13px",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            marginLeft: '3px',
                            color: "black"

                        }} class="text-xs ">{author}</p>
                        <p style={{ fontSize: "13px", color: "#088000", marginLeft: '3px', marginTop: '0' }}><small>{categories}</small></p>
                    </div>
                </div>
            </Link>

        </div>
    )
}

export default Card;