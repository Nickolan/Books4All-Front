
// import { useEffect, useState } from "react";
import Navbar from "../../components/NavBar/Navbar";
// import { fetchData } from "../../components/services/api";
import { ShoppingCartButton } from "../../components/ShoppingCartButton/ShoppingCartButton";
import {useSelector, useDispatch}from 'react-redux'
import { deleteOneBook } from "../../Redux/actions";
import { Link } from "react-router-dom";



export default function Cart(){
//   const [books, setBooks] = useState({})
//   const fetchBooks = async ()=>{
//     const booksArray = await fetchData();
//     setBooks(booksArray);
//   }
    const dispatch= useDispatch()
    const cart= useSelector(state=>state.cart)
    const name= cart.map((book)=>book.bookName)
    const price= []
    const cartPrice= cart.map((book)=>((book.price)))
    const id= cart.map((book)=>book.bookId)
    price.push(cartPrice)

    const handleClose=(id)=>{
        dispatch(deleteOneBook(id))
      }

//   useEffect(()=>
//     {
//       try{
//       fetchBooks();
//       }catch (error){
//         console.log(error)
//     }
//     },[]
//   );
    return(
        <>
        <div className='container-xl bg-white'>
        <Navbar/>
        <div className="mt-4">
        <Link to='/books' >
            <img class="BookDetail_backButton__i1i5t" src="https://res.cloudinary.com/dvldakcin/image/upload/v1681620387/Countries/back_lblp4n.png"/>
       </Link>

        </div>
            <div className="flex-row mt-5 border rounded p-4 w-50 align-content-center">
          
       
              
               {
                name.map((name,index)=>
                  
                <p key={index}>(1) {name} <button  type="button" class="btn btn-dark " onClick={()=>handleClose(id[index])}>X</button></p>
                )
            } 
                         {/* <h5>{JSON.stringify(books)}</h5> */}
             <hr />
             <h6 className="p-2 w-25 mt-2">Total: U$S {price.length && price[0].reduce((a,b)=> Math.floor(Number(a)+Number(b)),0)}</h6>
         
            </div>
        </div>
        
        </>
    )
}