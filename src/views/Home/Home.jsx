import React, { useState, useEffect } from "react";
import Carrusel1 from "../../components/Carrousel1/CarruselNews";
import Carrusel2 from "../../components/Carrousel2/CarruselNews";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, getUserFromDb, getUsers } from "../../Redux/actions";
import { Loader } from "../../components/Loader/Loader";

export default function Home() {
    const dispatch = useDispatch()
    const books = useSelector((state) => state.books);
    const { user } = useAuth0();
    const[loader, setLoader]= useState(false)

    useEffect(() => {
    setLoader(true)    
        dispatch(getUsers())
        if (user) {
            dispatch(getUserFromDb(user?.nickname))
        }
        dispatch(getBooks())
         if(books){
            setTimeout(()=>{
                setLoader(false);
            },100)
        
         }
       }, [dispatch, user])

    return (
        <div >
            <div className='container'>
                {
                loader ? <Loader/>
                  : 
                <>
                <img className='img-fluid' src="https://cdn.discordapp.com/attachments/1091730813529374777/1096446376533033052/books-1281581_1920.jpg" alt="Hero" />
                <div className="p-3">
                    <Carrusel1 />
                </div>
                <div className="p-3">
                    <Carrusel2 />
                </div>
                {/* <div className="p-3">
                    <Carrusel3 />
                </div> */}
            
            </>

                }
            </div>
        </div>
    );
}