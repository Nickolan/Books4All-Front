import React, { useEffect } from "react";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer/Footer";
import Carrusel1 from "../../components/Carrousel1/CarruselNews";
import Carrusel2 from "../../components/Carrousel2/CarruselNews";
import Carrusel3 from "../../components/Carrousel3/CarruselNews";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserFromDb } from "../../Redux/actions";
import { instance } from "../../components/services/api";
import { setCart } from "../../Redux/actions/localStorage";
import { PostUser } from "../../components/PostUser/PostUser";

export default function Home() {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    const dbUser = useSelector((state) => state.dbUser);
    const { user, logout, isAuthenticated, } = useAuth0();

   

    PostUser(user, isAuthenticated)


    if (dbUser.active === false) {
        logout()
    }
    useEffect(() =>{
        if (user) {
            dispatch(getUserFromDb(user?.nickname))
        }
    }, [dispatch, user])

    return (
        <div >

            <div className='container'>
                <Navbar />
                <img className='img-fluid' src="https://cdn.discordapp.com/attachments/1091730813529374777/1096446376533033052/books-1281581_1920.jpg" alt="Hero" />
                <div className="p-3">
                    <Carrusel1 />
                </div>
                <div className="p-3">
                    <Carrusel2 />
                </div>
                <div className="p-3">
                    <Carrusel3 />
                </div>
                <Footer />
            </div>
        </div>
    );
}