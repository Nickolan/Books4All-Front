import React from "react";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer/Footer";
import Carrusel1 from "../../components/Carrousel1/CarruselNews";
import Carrusel2 from "../../components/Carrousel2/CarruselNews";
import Carrusel3 from "../../components/Carrousel3/CarruselNews";


export default function Home(){
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