import React from "react";
import "./CartDetail.css";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../NavBar/Navbar";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { addOneCopy, deleteOneBook, deleteOneCopy } from "../../Redux/actions";
import Footer from "../Footer/Footer";
import { PayButton } from "../PayButton/PayButton";
import { setCart } from "../../Redux/actions/localStorage";

// import { removeBookFromCart } from "../actions/cartActions";

export default function CartDetail(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  setCart("cart", cart);

  let totalAmount = cart.reduce(
    (accumulator, book1) => accumulator + Number(book1.subtotal),
    0
  );
  totalAmount = totalAmount.toFixed(2);

  let totalCopy = cart.reduce(
    (accumulator, book1) => accumulator + Number(book1.quantity),
    0
  );

  //agrega una copia de un elemento agregado

  const addCopy = (id) => {
    dispatch(addOneCopy(id));
    console.log(id);
  };

  //Elimina una copia de un elemento del carrito
  const deleteCopy = (id) => {
    dispatch(deleteOneCopy(id));
  };

  const deleteThisBook = (id) => {
    dispatch(deleteOneBook(id));
  };

  return (
    <div className="container-xl bg-white">
      <div className="cart-container">
        <Navbar />

        <h1 className="titleCarrito">Cart</h1>
        {cart.length === 0 ? (
          <p>There are no books in your shopping cart</p>
        ) : (
          <>
            <div className="books-container">
              {cart.map((book) => (
                <div className="book-card" key={book.bookId}>
                  <img src={book.image} alt="no se encontró la imagen" />
                  <div className="book-info">
                    <h2>{book.title}</h2>
                    <h3>{book.author}</h3>

                    <p>{book.categories}</p>
                    <div class="d-flex">
                      <p class="mx-3">Cantidad: {book.quantity}</p>
                      <p className="book-price">
                        subtotal: ${book.subtotal} USD
                      </p>
                      <AiOutlineMinus
                        onClick={() => {
                          deleteCopy(book.bookId);
                        }}
                        class="mx-3"
                        style={{ marginBottom: "5px", cursor: "pointer" }}
                      />
                      <AiOutlinePlus
                        class="mx-3"
                        onClick={() => {
                          addCopy(book.bookId);
                        }}
                        style={{ marginBottom: "5px", cursor: "pointer" }}
                      />
                    </div>
                    {/* <button onClick={() => handleRemoveBook(book.bookId)}> */}

                    <button
                      onClick={() => {
                        deleteThisBook(book.id);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                  {/* <p className="book-price">${book.price}</p> */}
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h2>Cart Detail</h2>
              <p>Titles Total Amount: {cart.length}</p>
              <p>Books Total Amount: {totalCopy}</p>
              <p>Total Due: ${totalAmount} USD</p>
              <PayButton cart={cart}>Checkout</PayButton>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
