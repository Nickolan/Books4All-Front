import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import noImage from '../../images/icon-image-not-found.webp'
import style from '../Card/Card.module.css'

import { BsCartPlus } from 'react-icons/bs';
import { addToCart } from "../../Redux/actions";
import { FavButton } from "../FavButton/FavButton";
import { useAuth0 } from "@auth0/auth0-react";

function Card({ name, author, image, categories, bookId, price, isFav }) {
    const dispatch = useDispatch();
    const { user,  isAuthenticated } = useAuth0();
    // add useSelector in initialState with myFavorites

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

        <div class="m-3 d-inline-block bg-light " style={{ width: "180px", height: "380px", padding: "14px" }}>
            <button onClick={handleClickAddCart} style={{ marginBottom:'5px', marginRight:'2px', border:'none'}}> <BsCartPlus style={{fontSize:'1.1rem', color:'black',backgroundColor:'white'}} /> </button>
            <Link style={{ textDecoration: "none" }} to={`/bookDetail/${bookId}`}>
            
                <div class="d-flex flex-row">
                  <button onClick={handleClickAddCart} style={{ marginBottom:'5px', marginRight:'2px', border:'none', backgroundColor:'transparent'}}> <BsCartPlus style={{fontSize:'1.1rem'}} /> </button>
                  {isAuthenticated && <FavButton name={name} book_id={bookId} isFav={isFav} />}
                </div>
                
                <div class="d-flex flex-column bg-light">


                    <div class="bg-light" style={{ width: "140px", height: "200px", margin: "0 auto" }}>
                        {image ? <img style={{ width: "140px", height: "200px" }} src={image} alt="book" />
                            : <img style={{ width: "140px", height: "200px" }} src={noImage} alt="not found" />
                        }
                    </div>

                    <div style={{ display: "flex", flexDirection: "column"}}>
                    <h5 style={{
                        marginTop: "10px",
                        marginLeft:'3px',
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "14px",
                        color:"black"

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
                            marginLeft:'3px',
                            color:"black"

                        }} class="text-xs ">{author}</p>
                        <p style={{ fontSize: "13px", color: "#088000",  marginLeft:'3px', marginTop:'0' }}><small>{categories}</small></p>
                    </div>
                </div>
            </Link>
            
        </div>
    )
}

export default Card;