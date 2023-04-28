import React from "react";
import { integrantes } from "./datos_integrantes";
import {AboutCard} from "../../components/AboutCard/AboutCard"


export default function About(){

    return(
        <div className="container-xl bg-success bg-white">
          <div className="d-flex justify-content-center">
            <h1>About Us</h1>
          </div>
          <div className="container mt-2">
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
        </div>
      );
      
      
      
      
      
      



}