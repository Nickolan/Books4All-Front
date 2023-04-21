
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
    <div style={{transform:isOpen? 'translateX(0)':'translateX(100%)'}}>
      <div className={style.sidebar}>
        <div className='d-flex justify-content-center' style={{marginBottom:'10px'}}>
        <button type="button" class="btn-close" style={{ color:'white', borderRadius:'50%',fontSize: '30px'}} aria-label="Close" onClick={onClose}>
          x
        </button>
        </div>
        <h2 id="offcanvasDarkLabel" style={{ fontSize: '20px', color:'white'}}>Shopping Cart</h2>
        <div class='d-flex flex-column border p-0' style={{ overflow: 'auto', height: '500px', marginBottom:'5px', backgroundColor: '#ffffffcb' }}  >
          {cart?.map((item, index) => {
            return (
              <div key={index} style={{ margin: "5px 5px 5px 5px", height: '150px', backgroundColor: '#ffffff', boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.3)' , padding:'15px'}}>
                <div className='d-flex flex-start '>
                <img src={item.image} alt='not found' style={{ width: '60px' }} />
                <div className='d-flex justify-content-lg-start flex-column'>
                    <h4 class='w-100' style={{ fontSize: '13px',marginTop:'5px', marginRight:'60px'}} ><strong>{item.title}</strong></h4>
                        <h6 style={{ marginRight:'10px',fontSize: '16px'}} >Quantity: {item.quantity}</h6>
                      <h5 style={{ fontSize: '15px' }}>Subtotal: ${item.subtotal}</h5>
                </div>
               </div>
               <div>
<div >
</div>
                    <div class='d-flex justify-content-center 'style={{marginLeft:'40px'}}>
                          <AiOutlineMinus
                            onClick={() => { deleteCopy(item.bookId) }}
                            class='mx-3'
                            style={{ marginBottom: '5px', cursor: 'pointer' }}
                          />
                     <AiOutlinePlus class='mx-3' onClick={() => { addCopy(item.bookId) }}  style={{ marginBottom: '5px', cursor: 'pointer' }} />
                    <BsTrash style={{ marginBottom:'5px', marginLeft:'3px', cursor: 'pointer' }} onClick={() => { deleteThisBook(item.id) }} />
                        </div>
                      </div>
               </div>
            )
          })}
        </div>
        <button type="button" onClick={goToBuy} class="btn btn-outline-success" style={{margin:'20px 0 0 150px'}}>
          Go to cart
        </button>
        <button type="button" onClick={handleClose} class="btn btn-outline-success" style={{margin:'20px 0 0 150px'}}>
          Clear cart
        </button>
      </div>
    </div>
  )
}


