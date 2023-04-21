
import { useSelector, useDispatch } from 'react-redux'
import { deleteOneBook, deleteCart, addOneCopy, deleteOneCopy } from "../../Redux/actions"
import { useNavigate } from "react-router-dom"
import style from '../Sidebar/Sidebar.module.css'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { useEffect } from 'react';


export const Sidebar = ({ onClose, isOpen }) => {
  const cart = useSelector(state => state.cart) //[] array de objetos{'bookId','bookName':,'quantity',price}
  console.log(cart);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // función para vaciar por completo el cart
  const handleClose = () => {
    dispatch(deleteCart())
  }

  //Elimina un elemento del carrito con todas sus copias
  const deleteThisBook = (id) => {
    dispatch(deleteOneBook(id))
  }

  //agrega una copia de un elemento agregado

  const addCopy = (id) => {
    dispatch(addOneCopy(id))
    console.log(id);
  }

  //Elimina una copia de un elemento del carrito 
  const deleteCopy = (id) => {
    dispatch(deleteOneCopy(id))
  }

  const goToBuy = () => {
    navigate('/cart')
  }

  return (
    <div style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}>
      <div className={style.sidebar}>
        <button type="button" class="btn-close" aria-label="Close" onClick={onClose}>
          x
        </button>
        <h2 id="offcanvasDarkLabel" style={{ fontSize: '20px', }}>Your ShopCart</h2>
        <div class='d-flex flex-column border ' style={{ overflow: 'auto', height: '370px', backgroundColor: '#f3f3f3' }}  >
          {cart?.map((item, index) => {
            return (
              <div key={index} class='d-flex ' style={{ margin: "5px 5px 5px 5px", height: '80px', backgroundColor: '#f9f9f9', boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.3)' }}>
                <img src={item.image} alt='not found' style={{ width: '50px', height: '75px' }} />
                <div class='w-100' style={{ marginLeft: '10px' }}>
                  <div class='d-flex' >
                    <h4 class='w-100' style={{ fontSize: '13px', marginLeft: '50px' }} >{item.title}</h4>
                  </div>
                  <div class='d-flex' >
                    <div class=''>
                      <h5 style={{ fontSize: '15px' }}>Subtotal: ${item.subtotal}</h5>
                      <div class='d-flex'>
                        <h6 class='mx-2'>: {item.quantity}</h6>
                        <div class=''>
                          {item.quantity > 1 ? (

                            <AiOutlineMinus
                              onClick={() => { deleteCopy(item.bookId) }}
                              class='mx-3'
                              style={{ marginBottom: '5px', cursor: 'pointer', fontSize: '24px' }}
                            />

                          ) :
                            <AiOutlineMinus
                              class='mx-3'
                              style={{ marginBottom: '5px', color: 'gray', fontSize: '20px' }}
                            />
                          }
                          <AiOutlinePlus class='mx-3' onClick={() => { addCopy(item.bookId) }} style={{ marginBottom: '5px', cursor: 'pointer' }} />
                        </div>
                      </div>
                    </div>
                    <BsTrash style={{ marginLeft: '85px', marginTop: '15px', cursor: 'pointer' }} onClick={() => { deleteThisBook(item.id) }} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <button type="button" onClick={goToBuy} class="btn btn-outline-success" style={{ margin: '20px 0 0 150px' }}>
          Go to cart
        </button>
        <button type="button" onClick={handleClose} class="btn btn-outline-success" style={{ margin: '20px 0 0 150px' }}>
          Clear cart
        </button>
      </div>
    </div>
  )
}


