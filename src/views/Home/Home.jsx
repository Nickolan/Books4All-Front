import React, { useEffect } from "react";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer/Footer";
import Carrusel1 from "../../components/Carrousel1/CarruselNews";
import Carrusel2 from "../../components/Carrousel2/CarruselNews";
import Carrusel3 from "../../components/Carrousel3/CarruselNews";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, getUserFromDb, getUsers } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";
import { PostUser } from "../../components/PostUser/PostUser";

export default function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const dbUser = useSelector((state) => state.dbUser);
    const { user, logout, isAuthenticated, } = useAuth0();

    useEffect(() => {
        dispatch(getUsers())
        if (user) {
            dispatch(getUserFromDb(user?.nickname))
        }
        dispatch(getBooks())
        .then(() => {
            if (dbUser.active === false) {
              navigate('/UserBlocked')
            }
          });
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