import React from "react";
import "./CartDetail.css";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../NavBar/Navbar";
// import { removeBookFromCart } from "../actions/cartActions";

export default function CartDetail(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const totalAmount = cart.reduce(
    (accumulator, book1) => accumulator + Number(book1.price), 0 );


  return (
    <div className="cart-container">

        <Navbar/>

      <h1 className='titleCarrito'>Carrito de compras</h1>
      {cart.length === 0 ? (
        <p>No hay libros en el carrito</p>
      ) : (
        <>
          <div className="books-container">
            {
            cart.map((book) => (
              <div className="book-card" key={book.bookId}>
                <img src={book.image} alt="no se encontró la imagen" />
                <div className="book-info">
                  <h2>{book.name}</h2>
                  <h3>{book.author}</h3>
                  <p>{book.categories}</p>
                  {/* <button onClick={() => handleRemoveBook(book.bookId)}> */}
                  <button>
                    Eliminar
                  </button>
                  <p className="book-price">${book.price} USD</p>
                </div>
                {/* <p className="book-price">${book.price}</p> */}
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Resumen del carrito</h2>
            <p>Cantidad de libros: {cart.length}</p>
            <p>Total a pagar: ${totalAmount} USD</p>
            <button>Comprar</button>
          </div>
        </>
      )}
    </div>
  );
}

