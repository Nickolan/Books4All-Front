import React from "react";
import "./CartDetail.css";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import {
  addOneCopy,
  deleteOneBook,
  deleteOneCopy,
  getBookDetail,
} from "../../Redux/actions";
import { PayButton } from "../PayButton/PayButton";
import { setCart } from "../../Redux/actions/localStorage";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
// import { removeBookFromCart } from "../actions/cartActions";


export default function CartDetail() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  setCart("cart", cart);
  const bookTitle = useSelector((state) => state.bookDetail);
  console.log(bookTitle);

  let totalAmount = cart.reduce(
    (accumulator, book1) => accumulator + Number(book1.subtotal),
    0
  );
  totalAmount = totalAmount.toFixed(2);

  let totalCopy = cart.reduce(
    (accumulator, book1) => accumulator + Number(book1.quantity),
    0
  );

  const addCopy = (id, stock, quantity) => {
    if (stock > quantity) {
      dispatch(addOneCopy(id))
    }
    else {
      toast.info('You have reached the limit of available units')
    }
  }

  const deleteCopy = (id) => {
    dispatch(deleteOneCopy(id));
  };
  const deleteThisBook = (id) => {
    dispatch(deleteOneBook(id));
    dispatch(getBookDetail(id));

    toast(`You removed ${bookTitle.map((b) => b.title)} from the cart !`, {
      position: "bottom-right",
      style: {
        background: "linear-gradient(97deg, rgba(33,30,31,1) 0%, #5c5c5f 5%)",
        color: "white",
      },
      progressBar: {
        backgroundColor: "red",
      },
      autoClose: 2500,
      closeOnClick: true,
    });
  };

  return (
    <div className="container-xl ">
      <div className="cart-container">
        {cart.length === 0 ? (
          <p>There are no books in your shopping cart</p>
        ) : (
          <div className="allContainer">
            <div className="books-container">
              <div className="cardHeader">
                <h1 className="titleCarrito">Your cart</h1>
                <p>
                  TOTAL ({totalCopy} books) <span>${totalAmount}</span>
                </p>
                <p>
                  The items in your cart are not reserved. Finish the purchase
                  process now to get hold of them.
                </p>
              </div>

              {cart.map((book) => (
                <div className="book-card" key={book.bookId}>
                  <div className="img-cont">
                    <img src={book.image} alt="Not Found" />
                  </div>
                  <div className="infoPrincipal">
                    <div className="book-info">
                      <div className="data">
                        <h2>{book.title}</h2>
                        <div className="data2">
                          <h3>{book.author}</h3>
                          <h3 className="cat">{book.categories}</h3>
                        </div>
                      </div>
                      <div className="quantity">
                        {book.quantity > 1 ? (
                          <AiOutlineMinus
                            onClick={() => {
                              deleteCopy(book.bookId);
                            }}
                            className="down"
                          />
                        ) : (
                          <AiOutlineMinus className="inactiveDown" />
                        )}
                        <span class="mx-3">{book.quantity}</span>
                        <AiOutlinePlus
                          onClick={() => {
                            addCopy(book.bookId, book.stock, book.quantity);
                          }}
                          className="up"
                        />
                      </div>
                    </div>
                    <div>
                      <div class="d-flex">
                        <p className="book-price">${book.subtotal}</p>
                      </div>

                      <div className="deleteButton">
                        <BsTrash
                          onClick={() => {
                            deleteThisBook(book.id);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div class="d-flex flex-column" className="cart-summary">

              <div className="orderSummary">
                <p>Order summary</p>
                <div className="priceSummary">
                  <span>{totalCopy} products</span>
                  <span>${totalAmount}</span>
                </div>
                <div className="delivery">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div class="border" className="total">
                  <span>Total</span>
                  <span>${totalAmount}</span>
                </div>
                <PayButton cart={cart}>Checkout</PayButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
