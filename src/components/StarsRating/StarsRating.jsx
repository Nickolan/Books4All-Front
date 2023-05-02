import React, { useState } from "react";
import {AiFillStar, AiOutlineStar} from 'react-icons/ai';
import style from './StarsRating.module.css';

const StarsRating = (props) => {

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const handleRatingChange = (event) => {
        setRating(event.target.value);
        if (props.onChange) {
            props.onChange(event);
        }
    }


    return(
        <div className={style.starsContainer} value={props.value}>
            {
                [...Array(5)].map((star, i)=>{

                    const ratingValue = i + 1 ;

                    return (
                    <label>
                        <input 
                        type="radio" 
                        name="rating" 
                        className={style.inputRatio}
                        value={ratingValue} 
                        // onClick={ ()=> setRating(ratingValue) }
                        onClick={handleRatingChange}
                        checked={ratingValue === props.value}
                        />
                        <AiFillStar 
                        className={style.star} 
                        color={ ratingValue <= (hover || rating) ? "#ffc107" : "e4e5e9" } 
                        onMouseEnter={ ()=> setHover(ratingValue) }
                        onMouseLeave={ ()=> setHover(null) }
                        value={ratingValue}
                        />
                    </label>
                    )
                })
            }
        </div>
    )
}

export default StarsRating;

