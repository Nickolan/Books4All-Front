import { Link } from "react-router-dom";
function Card({name, author, image, rating}) {
    return (
        <div>
            <Link to='/'>
                <img src={image} alt="Not found" />
                <h2>Title: {name}</h2>
                <h2>Author: {author}</h2>
                <h2>Rating: {rating}</h2>
            </Link>
        </div>
    )
}

export default Card;