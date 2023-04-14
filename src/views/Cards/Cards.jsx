import React from "react";
import Card from '../Card/Card'

function Cards({libros}) {
    return (
        <div>
            {
                libros.length > 0 ? libros.map((book, index) => {
                    return <Card
                    key={index}
                    name={book.name}
                    author={book.author}
                    image={book.image}
                    rating={book.rating}
                    />
                }) 
                : null
            }
        </div>
    )
}

export default Cards;