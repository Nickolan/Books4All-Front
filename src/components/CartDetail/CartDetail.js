import React from "react";
import "./CartDetail.css";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../NavBar/Navbar";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { addOneCopy, deleteOneBook, deleteOneCopy } from "../../Redux/actions";
// import { removeBookFromCart } from "../actions/cartActions";

export default function CartDetail(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  let totalAmount = cart.reduce(
    (accumulator, book1) => accumulator + Number(book1.subtotal), 0);
  totalAmount = totalAmount.toFixed(2)

  let totalCopy = cart.reduce(
    (accumulator, book1) => accumulator + Number(book1.quantity), 0);

  //agrega una copia de un elemento agregado

  const addCopy = (id) => {
    dispatch(addOneCopy(id))
    console.log(id);
  }

  //Elimina una copia de un elemento del carrito 
  const deleteCopy = (id) => {
    dispatch(deleteOneCopy(id))
  }

  const deleteThisBook = (id) => {
    dispatch(deleteOneBook(id))
  }


  return (
    <div className="cart-container">

      <Navbar />

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
                    <h2>{book.title}</h2>
                    <h3>{book.author}</h3>

                    <p>{book.categories}</p>
                    <div class='d-flex'>
                      <p class='mx-3'>Cantidad: {book.quantity}</p>
                      <p className="book-price">subtotal: ${book.subtotal} USD</p>
                      <AiOutlineMinus
                        onClick={() => { deleteCopy(book.bookId) }}
                        class='mx-3'
                        style={{ marginBottom: '5px', cursor: 'pointer' }}
                      />
                      <AiOutlinePlus class='mx-3' onClick={() => { addCopy(book.bookId) }} style={{ marginBottom: '5px', cursor: 'pointer' }} />
                    </div>
                    {/* <button onClick={() => handleRemoveBook(book.bookId)}> */}

                    <button onClick={()=>{deleteThisBook(book.id)}}>
                      Eliminar
                    </button>

                  </div>
                  {/* <p className="book-price">${book.price}</p> */}
                </div>
              ))}
          </div>
          <div className="cart-summary">
            <h2>Resumen del carrito</h2>
            <p>Cantidad de libros: {cart.length}</p>
            <p>Total de copias: {totalCopy}</p>
            <p>Total a pagar: ${totalAmount} USD</p>
            <button>Comprar</button>
          </div>
        </>
      )}
    </div>
  );
}

