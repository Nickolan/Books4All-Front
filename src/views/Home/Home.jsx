import React, { useState, useEffect } from "react";
import Carrusel1 from "../../components/Carrousel1/CarruselNews";
import Carrusel2 from "../../components/Carrousel2/CarruselNews";
import Carrusel3 from "../../components/Carrousel3/CarruselNews";
import { useAuth0} from "@auth0/auth0-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, getUserFromDb } from "../../Redux/actions";
import { instance } from "../../components/services/api";
import { setCart } from "../../Redux/actions/localStorage";
import { PostUser } from "../../components/PostUser/PostUser";

export default function Home(){
    const dispatch= useDispatch()
    const cart=useSelector(state=>state.cart)
    const {  user, isAuthenticated } = useAuth0();
   
    PostUser(user, isAuthenticated)

    useEffect(()=>{
        dispatch(getBooks())
        if (user) {
            dispatch(getUserFromDb(user?.nickname))
        }
    },[dispatch, user])

    return(
    <div >
    
    <div className='container'>
     <img className='img-fluid' src="https://cdn.discordapp.com/attachments/1091730813529374777/1096446376533033052/books-1281581_1920.jpg" alt="Hero"/>
     <div className="p-3">
     <Carrusel1/>
     </div>
     <div className="p-3">
     <Carrusel2/>
     </div>
     <div className="p-3">
     <Carrusel3/>
     </div>
    </div>
    </div>
    );
}