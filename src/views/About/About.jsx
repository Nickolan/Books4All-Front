import React from "react";
import { integrantes } from "./datos_integrantes";
import {AboutCard} from "../../components/AboutCard/AboutCard";
import { useEffect,useState } from "react";
import { Loader } from "../../components/Loader/Loader";


export default function About(){
  const[loader, setLoader]= useState(false)
  const [datos, setDatos]= useState(integrantes)

  useEffect(()=>{
     setLoader(true)     
   if(integrantes.length){
     setTimeout(()=>{
      setLoader(false);

    },100)
   }
  },[])

return(
        <div className="container-xl">
          {loader ? <Loader/>
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
        </div>
      );
      
      
      
      
      
      



}