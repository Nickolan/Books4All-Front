import React from "react";
import "./CartDetail.css";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";

// import { removeBookFromCart } from "../actions/cartActions";

export default function CartDetail(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log(cart)

  const totalAmount = cart.reduce(
    (accumulator, book1) => accumulator + Number(book1.price), 0 );


  return (
    <div className='container-xl bg-white'>
    <div className="cart-container">

        <Navbar/>

      <h1 className='titleCarrito'>Cart</h1>
      {cart.length === 0 ? (
        <p>There are no books in your shopping cart</p>
      ) : (
        <>
          <div className="books-container">
            {
            cart.map((book) => (
              <div className="book-card" key={book.bookId}>
                <img src={book.image} alt="Image not found" />
                <div className="book-info">
                  <h2>{book.name}</h2>
                  <h3>{book.author}</h3>
                  <p>{book.categories}</p>
                  {/* <button onClick={() => handleRemoveBook(book.bookId)}> */}
                  <button>
                    Remove
                  </button>
                  <p className="book-price">${book.price} USD</p>
                </div>
                {/* <p className="book-price">${book.price}</p> */}
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <p>Books Quantity: {cart.length}</p>
            <p>Total: ${totalAmount} USD</p>
            <button>Checkout</button>
          </div>
        </>
      )}
    </div>
    <Footer />
    </div>
  );
}

