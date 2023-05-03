import React from "react";
import { Link } from "react-router-dom";

const BoghtCards = ({ id, date, books }) => {
  let totalAmount = books.reduce(
    (accumulator, book1) => accumulator + Number(book1.subtotal),
    0
  );
  console.log(books);
  return (
    <div class="mt-4 mb-4 p-4">
      <div>
        <p>#Order: {id}</p>
        <p>Date: {date.slice(0, 10)}</p>
      </div>
      <div>
        {books?.map((book, index) => {
        
          return (
            <div key={index} class="d-flex border-bottom mw-75 mt-2">
              <Link
                style={{ textDecoration: "none" }}
                to={`/bookDetail/${book.bookId}`}
              >
                <div>
                  <img
                    src={book.image}
                    alt=""
                    style={{ width: "50px", height: "70px", margin: "10px" }}
                  />
                </div>
                <div class="d-flex">
                  <div
                    class=" d-flex flex-column justify-content-center align-items-center"
                    style={{ width: "300px" }}
                  >
                    <p>Book</p>
                    <p>{book.title}</p>
                  </div>
                  <div
                    class=" d-flex flex-column justify-content-center align-items-center"
                    style={{ width: "200px" }}
                  >
                    <p>Price</p>
                    <p>${book.price}</p>
                  </div>
                  <div
                    class=" d-flex flex-column justify-content-center align-items-center"
                    style={{ width: "150px" }}
                  >
                    <p>Quantity</p>
                    <p>{book.quantity}</p>
                  </div>
                  <div
                    class=" d-flex flex-column justify-content-center align-items-center"
                    style={{ width: "150px" }}
                  >
                    <p>subtotal</p>
                    <p>${book.subtotal}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div>
        <p>Total: ${totalAmount }</p>
      </div>
    </div>
  );
};

export default BoghtCards;
