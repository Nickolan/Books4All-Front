import React from "react";
import Card from '../../components/Card/Card'

function Cards({books}) {
    return (
        <div class='grid col'>
            {
                books.length > 0 ? books.map((book, index) => {
                    return <Card
                    key={index}
                    bookId={book.id}
                    name={book.title}
                    author={book.authors}
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