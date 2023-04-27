import React from "react";
import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget'
import {useSelector} from 'react-redux';
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LoginButton/LoginButton";
import { changeTheme } from "../../Redux/actions";
import { setTheme } from "../../Redux/actions/localStorage";

export default function Navbar() {
    const { user, isAuthenticated } = useAuth0();
    const role= useSelector(state=> state.role)
    const theme = useSelector((state) => state.theme);
    setTheme('theme',theme)
    const dispatch= useDispatch()
   

    const onHandlerClick=(event)=>{
        dispatch( changeTheme(event.target.innerHTML))   
    }


    return (

        <nav className='navbar navbar-expand-md navbar-dark bg-dark sticky-top ' >
            <div className="container-fluid ">
                <div className="px-4 ">
                    <Link to='/'>
                        <img src="https://cdn.discordapp.com/attachments/1091730813529374777/1097178558457184286/books4all-low-resolution-logo-white-on-transparent-background.png" width="100" height="40" />
                    </Link>
                </div>
                <button
                    type="button" data-toggle="collapse" data-target="#navbarNav" className="navbar-toggler">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbarNav">
                    <ul className="navbar-nav me-5" style={{ width: '350px', alignItems: 'center', justifyContent: 'space-around', fontFamily: 'Montserrat, sans-serif' }}>
                        <li className="position-relative nav-item active"><Link to="/" className="nav-link" >Home</Link></li>
                        <li className="position-relative nav-item"><Link to="/about" className="nav-link" >About</Link></li>
                        <li className="position-relative nav-item"><Link to="/books" className="nav-link">Books</Link></li>
                  {theme==='dark'&&   <li className="position-relative nav-item"> <button onClick={onHandlerClick} >light</button></li>}
                  {theme==='light'&&    <li className="position-relative nav-item"> <button onClick={onHandlerClick}>dark</button></li>}
                        {isAuthenticated && role.name==='admin' ?  <li className="position-relative nav-item"><Link to="/dashboard" className="nav-link">Dashboard</Link></li>: null}
                        {/*             <li className="nav-item "><Link to="/events" className="nav-link">Events</Link></li>*/}
                        {/*             <li className="nav-item "><Link to="/events" className="nav-link">Events</Link></li>
                        <li className="nav-item "><Link to="/cart" className="nav-link">Cart</Link></li> */}
                        {/* <li className="nav-item "><Link to="/profile" className="nav-link">Profile</Link></li> */}
                        <li className="position-relative">{!isAuthenticated ? <LoginButton /> : <Link to="/profile" className="nav-link">{"myProfile"}</Link>}</li>
                        
                        <CartWidget/>
                    </ul>
                </div>
            </div>
        </nav>  

    );
}
