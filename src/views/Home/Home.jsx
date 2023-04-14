import React from "react";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer/Footer";


export default function Home(){
    return(
    <div>
    
    <div className='container bg-success'>
    <Navbar/>
     <img className='img-fluid max-height: 200px' src="https://pixabay.com/get/gbc883b9f0f1cb88f66daca4b79ea681d974dd08f527f50e576fd842f86f20a36c38ae198f8cb88337179934f8c18cf0b.jpg" alt="Hero"/>
    </div>
    <Footer/>
    </div>
    );
}