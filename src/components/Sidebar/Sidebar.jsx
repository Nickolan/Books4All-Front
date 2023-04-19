

import {useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getBookDetail,deleteOneBook, deleteCart } from "../../Redux/actions"
import { Link } from "react-router-dom"
import { countRepes } from "./countEqualsProducts"
import style from '../Sidebar/Sidebar.module.css'

export const Sidebar=({booksAdded, isOpen,onClose})=>{
    const cart= useSelector(state=>state.cart) //[] array de objetos{'bookId','bookName':,'quantity',price}

    const dispatch= useDispatch()
    const name= cart.map((book)=>book.bookName)
    const id= cart.map((book)=>book.bookId)
    const noRepeatName= [...new Set(...name)]
    const price= []
    const cartPrice= cart.map((book)=>((book.price)))
    price.push(cartPrice)

    const handleClose=()=>{
      dispatch(deleteCart())
    }
    const deleteThisBook=(id)=>{
      dispatch(deleteOneBook(id))
      
    }


   
    useEffect(()=>{
        dispatch(getBookDetail(cart))      
    },[]) 

    return(     
       <div style={{transform:isOpen? 'translateX(0)':'translateX(100%)'}}  >
                <div class="offcanvas-header">
                
                </div>
                <div class="offcanvas-body d-flex flex-column" className={style.sidebar}>
                  
                <h2 class="offcanvas-title w-100" id="offcanvasDarkLabel">Cart <button className="btn btn-secondary rounded-3" onClick={onClose} >x</button></h2>
                  {cart?.length? <>
                    {
                      name?.map((name,index)=>
                      
                      <p key={index}>(1) {name}  <button  type="button" class="btn btn-dark "onClick={() => deleteThisBook(id[index])}>x</button> </p>  )
                    }
               
                    <p>Products: {cart?.length}</p>
                    <h6>Total: U$S {price?.length && price[0]?.reduce((a,b)=> Math.floor(Number(a)+Number(b)),0)}</h6>
                    <Link to='/cart' className="btn btn-secondary">Comprar  </Link>
                    <button  type="button" class="btn btn-dark " onClick={handleClose}>vaciar carrito</button>
                  </> : <p>Empty cart</p>
                  }
                  
               </div>                
       </div>

    )
}