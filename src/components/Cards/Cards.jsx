import React from "react";
import Card from '../../components/Card/Card'

function Cards({books, favorites}) {
    return (
        <div class='row'>
        {
            books.length > 0 ? books.map((book, index) => {
                return (
                    <div className="col-md-3" key={index}>
                        <Card
                            key={index}
                            bookId={book.id}
                            name={book.title}
                            author={book.authors}
                            image={book.image}
                            categories={book.categories}
                            price={book.price}
                            isFav={favorites.includes(book.title)}
                        />
                    </div>
                )
            })
                : null
        }
    </div>
    )
}

export default Cards;