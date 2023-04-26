import { useState } from "react";
function BooksList({books}) {
    const [currentPage, setCurrentPage] = useState(1)
    const booksForPage = 12;
    const lastBook = currentPage * booksForPage;
    const firstBook = lastBook - booksForPage;
    const currentBooks = books.slice(firstBook, lastBook);
    const pageNumber = [];
 
    for (let i = 1; i <= Math.ceil(books.length / booksForPage); i++) {
        pageNumber.push(i)
    }
    return (
        <div>
            <div class='d-flex justify-content-around'>
                <div>
                    <h1>BOOKS</h1>
                </div>
                <div class='border border-3 d-flex'>
                    <div>
                        <button
                        key="previous"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        class='btn btn-sm btn-outline-dark mx-1 fw-bold'
                        >
                        &lt;
                        </button>
                    </div>
                    <div>
                        <button
                        key="next"
                        disabled={currentPage === pageNumber.at(-1)}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        class='btn btn-sm btn-outline-dark mx-1 fw-bold'
                        >
                        &gt;
                        </button>
                    </div>
                </div>
            </div>
                <div class="border border-2 border-dark d-flex flex-row justify-content-around">
                    <div>
                        <h3>Title</h3>
                    </div>
                    <div>
                        <h3>ID</h3>
                    </div>
                    <div>
                        <h3>Author</h3>
                    </div>
                    <div>
                        <h3>Price</h3>
                    </div>
                    <div>
                        <h3>Stock</h3>
                    </div>
                    <div>
                        <h3>Picture</h3>
                    </div>
                    <div>
                        <h3>State</h3>
                    </div>
                </div>
                <div>
                    {currentBooks.map((book) => {
                        return(
                            <div className="border border-2 border-dark d-flex flex-row justify-content-around">
                                <div>
                                    <h4>{book.title}</h4>
                                </div>
                                <div>
                                    <h4>{book.id}</h4>
                                </div>
                                <div>
                                    <h4>{book.authors}</h4>
                                </div>
                                <div>
                                    <h4>${book.price}</h4>
                                </div>
                                <div>
                                    <h4>{book.stock}</h4>
                                </div>
                                <div>
                                    <img src={book.image} onError='https://islandpress.org/sites/default/files/default_book_cover_2015.jpg' alt="" />
                                </div>
                                <div>
                                {book.active === true ? <h4>Active</h4> : <h4>Inactive</h4>}
                                {book.active === true ? <button class="btn btn-danger" value={book.name} >Disactivate</button> 
                                : <button class="btn btn-success" value={book.name} >Activate</button>}
                                </div>
                                <div></div>
                            </div>
                        )
                    })}
                </div>
        </div>
    )
}

export default BooksList;