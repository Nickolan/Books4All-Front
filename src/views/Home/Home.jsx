import React, { useState, useEffect } from "react";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer/Footer";
import Carrusel1 from "../../components/Carrousel1/CarruselNews";
import Carrusel2 from "../../components/Carrousel2/CarruselNews";
import Carrusel3 from "../../components/Carrousel3/CarruselNews";
import { useAuth0} from "@auth0/auth0-react";
import axios from "axios";
import { getBooks } from "../../Redux/actions";
import { useDispatch } from "react-redux";


export default function Home(){

    const dispatch = useDispatch()

    useEffect(() => {
    dispatch(getBooks())},[])

    const [post, setPost] = useState(false)
    const {  user, isAuthenticated } = useAuth0();
    if(isAuthenticated && !post ){
        axios.post('http://localhost:3001/users', user)
        setPost(true)
    }
    if(!isAuthenticated && post){
        setPost(false)
    }
    return(
    <div >
    
    <div className='container'>
    <Navbar />
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
     <Footer/>
    </div>
    </div>
    );
}