import React, { useEffect,useState } from "react";
import Navbar from "../../components/NavBar/Navbar";
import { integrantes } from "./datos_integrantes";
import {AboutCard} from "../../components/AboutCard/AboutCard"
import Footer from "../../components/Footer/Footer";
import { Loader } from "../../components/Loader/Loader";


export default function About(){
  const[loader, setLoader]= useState(false)

  useEffect(()=>{
    setLoader(true)      
    setTimeout(() => {
       setLoader(false);
     }, 150);
  },[])

    return(
        <div className="container-xl  ">
          <Navbar />
          {loader ?
                 <div class="mx-auto d-flex justify-content-center" style={{ width: "80%", marginBottom: '40px',height:'600px', marginTop:'20%' }}>
                 <Loader/>
              </div>
          :
          <>         
          <div className="d-flex justify-content-center ">
            <h1>About Us</h1>
          </div>
          <div className="container mt-2 ">
            <div className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gap-3 justify-content-center">
              {integrantes.map((integrante, index) => {
                return (
                  <div key={index} className="col">
                    <AboutCard
                      name={integrante.name}
                      img={integrante.img}
                      countryImage={integrante.countryImage}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          </>
          }
          <Footer />
        </div>
      );
      
      
      
      
      
      



}