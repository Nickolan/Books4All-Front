
import { useSelector, useDispatch } from 'react-redux'
import { deleteOneBook, deleteCart, addOneCopy, deleteOneCopy, sideBar } from "../../Redux/actions"
import { useNavigate } from "react-router-dom"
import style from '../Sidebar/Sidebar.module.css'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';


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
  }
  const closeSidebar = () => {
    dispatch(sideBar())
  }

  //Elimina un elemento del carrito con todas sus copias
  const deleteThisBook = (id) => {
    dispatch(deleteOneBook(id))
  }

  //agrega una copia de un elemento agregado

  const addCopy = (id) => {
    dispatch(addOneCopy(id))
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
                          <BsTrash onClick={() => { deleteThisBook(item.id) }} />
                        </div>
                      </div>
                      <div className={style.priceContainer}>
                        <div className={style.quantity}>
                          {item.quantity > 1 ? <AiOutlineMinus onClick={() => { deleteCopy(item.bookId) }} className={style.down} />
                            :
                            <AiOutlineMinus className={style.inactiveDown} />
                          }
                          <span>{item.quantity}</span>
                          <AiOutlinePlus onClick={() => { addCopy(item.bookId) }} className={style.up} />
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
              <button onClick={goToBuy} type="button" class="btn btn-dark">Go to cart</button>
              <button onClick={handleClose} type="button" class="btn btn-secondary">Clear cart</button>
            </div>
            <p>You will see the promotions and shipping cost applied at checkout</p>
          </div>
        </div>
      </div>
    </div>
  )
}


