
import { useEffect, useState } from "react";
import Navbar from "../../components/NavBar/Navbar";
import { fetchData } from "../../components/services/api";

export default function Cart(){
  const [books, setBooks] = useState({})
  const fetchBooks = async ()=>{
    const booksArray = await fetchData();
    setBooks(booksArray);
  }


  useEffect(()=>
    {
      try{
      fetchBooks();
      }catch (error){
        console.log(error)
    }
    },[]
  );
    return(
        <div className='container-xl bg-success'>
        <Navbar/>
            <h1>Esta es la ruta Cart</h1>
             <h5>{JSON.stringify(books)}</h5>
        </div>
    )
}