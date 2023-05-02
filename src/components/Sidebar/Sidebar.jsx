
import { useSelector, useDispatch } from 'react-redux'
import { deleteOneBook, deleteCart, addOneCopy, deleteOneCopy, sideBar,getBookDetail } from "../../Redux/actions"
import { useNavigate } from "react-router-dom"
import style from '../Sidebar/Sidebar.module.css'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import {toast} from 'react-toastify'
import { getCart } from '../../Redux/actions/localStorage';


export const Sidebar = () => {
  const cart = useSelector(state => state.cart) //[] array de objetos{'bookId','bookName':,'quantity',price}
  const isOpen = useSelector(state => state.sidebarState);
  const dispatch = useDispatch()
  const navigate = useNavigate()
 

  let totalAmount = cart.reduce(
    (accumulator, book1) => accumulator + Number(book1.subtotal),
    0
  );
  totalAmount = totalAmount.toFixed(2);

  // función para vaciar por completo el cart
  const handleClose = () => {
    dispatch(deleteCart())

   toast(`Empty cart !`, { //desde la sidebar
      position: "bottom-right",
      style: {
          background:'linear-gradient(97deg, rgba(33,30,31,1) 0%, #5c5c5f 5%)',
        color: "white",
      },
      progressBar: {
        backgroundColor: "red",
      },
      autoClose: 1500,
      closeOnClick: true,
    }); 

  }
  const closeSidebar = () => {
    dispatch(sideBar())
  }


  //Elimina un elemento del carrito con todas sus copias
  const deleteThisBook = (id) => {
    const deletedBook= cart.find((book)=>{return book.id===id})
    dispatch(deleteOneBook(id));
    const cartLs= (getCart('cart'))
    console.log(cartLs)
    if(!cartLs[1] &&  dispatch(deleteOneBook(id))){ 
      toast(`Empty cart!`, {
        position: "bottom-right",
        style: {
            background:'linear-gradient(97deg, rgba(33,30,31,1) 0%, #5c5c5f 5%)',
          color: "white",
        },
      
      })
    }
   toast(`You removed ${deletedBook.title} from the cart !`, {
      position: "bottom-right",
      style: {
          background:'linear-gradient(97deg, rgba(33,30,31,1) 0%, #5c5c5f 5%)',
        color: "white",
      },
    
    })
  




  }

  //agrega una copia de un elemento agregado

  const addCopy = (id, stock, quantity) => {
    if (stock > quantity) {
      dispatch(addOneCopy(id))
    }
    else {
      toast.info('You have reached the limit of available units')
    }
  }

  //Elimina una copia de un elemento del carrito 
  const deleteCopy = (id) => {
    dispatch(deleteOneCopy(id))

    
  }

  const goToBuy = () => {
    navigate('/cart')
    closeSidebar();
  }

  return (
    <div className={!isOpen ? style.sidebarBack : style.sidebarBackOpen}>
      <div className={style.barContainer}>
        <div className={style.sideBar} >
          <div className={style.barContent}>
            <div className={style.modalColumn1}>
              <div className={style.barHeader}>
                <h4 >My Shopping Cart</h4>
                <button className={style.sideHide} onClick={closeSidebar}>
                  &times;
                </button>
              </div>
              {cart?.map((item, index) => {
                return (
                  <div key={index} className={style.card}>
                    <img src={item.image} alt='not found' />
                    <div className={style.cardDetails}>
                      <div class='d-flex' className={style.title}>
                        <h4><strong>{item.title}</strong></h4>
                        <div className={style.deleteButton}>
                          <BsTrash title="delete this book" onClick={() => { deleteThisBook(item.id) }} />
                        </div>
                      </div>
                      <div className={style.priceContainer}>
                        <div className={style.quantity}>
                          {item.quantity > 1 ? <AiOutlineMinus onClick={() => { deleteCopy(item.bookId) }} className={style.down} />
                            :
                            <AiOutlineMinus className={style.inactiveDown} />
                          }
                          <span>{item.quantity}</span>
                          <AiOutlinePlus onClick={() => { addCopy(item.bookId, item.stock, item.quantity) }} className={style.up} />
                        </div>
                        <div >
                          <h5>${item.subtotal}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className={style.barFooter}>
            <div className={style.total}>
              <span>Total:  </span>
              <span>${totalAmount}</span>
            </div>
            <div className={style.cartButtons}>
              <button onClick={goToBuy} title="Go to cart" type="button" class="btn btn-dark">Go to cart</button>
              <button onClick={handleClose} title='Clear cart' type="button" class="btn btn-secondary">Clear cart</button>
            </div>
            <p>You will see the promotions and shipping cost applied at checkout</p>
          </div>
        </div>
      </div>
    </div>
  )
}


