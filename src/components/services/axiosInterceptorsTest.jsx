import { useEffect, useState } from "react";
import { fetchData } from "./api";

 
export const Test = () =>{
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

    return (
        <h5>{JSON.stringify(books)}</h5>
    )
}