import {useSelector, useDispatch}from 'react-redux'
import { deleteOneBook, getUserFromDb } from "../../Redux/actions";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { setCart } from "../../Redux/actions/localStorage";

export default function Cart(){

    const dispatch= useDispatch()
    const cart= useSelector(state=>state.cart)
    const title= cart.map((book)=>book.title)
    const price= []
    const cartPrice= cart.map((book)=>((book.price)))
    const id= cart.map((book)=>book.bookId)
    const { user } = useAuth0();
    price.push(cartPrice)

    const handleClose=(id)=>{
        dispatch(deleteOneBook(id))
    }
    useEffect(() => {
      dispatch(getUserFromDb(user?.nickname))
    }, [])


    return(
        <>
        <div className='container-xl '>
        <div className="mt-4 ">
        <Link to='/books' >
            <img class="BookDetail_backButton__i1i5t" src="https://res.cloudinary.com/dvldakcin/image/upload/v1681620387/Countries/back_lblp4n.png"/>
       </Link>
        </div>
            <div className="flex-row mt-5 border rounded p-4 w-50 align-content-center ">
            {title.map((title,index)=><p key={index}>(1) {title} <button  type="button" class="btn " onClick={()=>handleClose(id[index])}>X</button></p>)} 
           <hr />
             <h6 className="p-2 w-25 mt-2">Total: U$S {price.length && price[0].reduce((a,b)=> Math.floor(Number(a)+Number(b)),0)}</h6>
          </div>
        </div>
        </>
    )
}