import React from "react";
import Navbar from "../../components/NavBar/Navbar";

export default function About(){
    return(
    <div className='container-xl bg-success bg-white'>
     <Navbar/>
     <div className="d-flex justify-content-center mt-2"><h1>About Us</h1></div>
     <div class="container mt-2">
  <div class="row gap-3 d-flex justify-content-center">
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="card">
        <img src="imagen1.jpg" alt="Imagen 1" class="card-img-top"/>
        <div class="card-body">
          <h5 class="card-title">Deborah Navarro</h5>
          <p class="card-text">Contenido de la tarjeta 1</p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="card">
        <img src="imagen2.jpg" alt="Imagen 2" class="card-img-top"/>
        <div class="card-body">
          <h5 class="card-title">Amilkar Ibarra</h5>
          <p class="card-text">Contenido de la tarjeta 2</p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="card">
        <img src="imagen3.jpg" alt="Imagen 3" class="card-img-top"/>
        <div class="card-body">
          <h5 class="card-title">Daniel Junghans</h5>
          <p class="card-text">Contenido de la tarjeta 3</p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="card">
        <img src="imagen4.jpg" alt="Imagen 4" class="card-img-top"/>
        <div class="card-body">
          <h5 class="card-title">Nicolás Funes</h5>
          <p class="card-text">Contenido de la tarjeta 4</p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="card">
        <img src="imagen4.jpg" alt="Imagen 4" class="card-img-top"/>
        <div class="card-body">
          <h5 class="card-title">Javier Rivera</h5>
          <p class="card-text">Contenido de la tarjeta 4</p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="card">
        <img src="imagen4.jpg" alt="Imagen 4" class="card-img-top"/>
        <div class="card-body">
          <h5 class="card-title">Mariano Caroso</h5>
          <p class="card-text">Contenido de la tarjeta 4</p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="card">
        <img src="imagen4.jpg" alt="Imagen 4" class="card-img-top"/>
        <div class="card-body">
          <h5 class="card-title">Lorenzo Velez</h5>
          <p class="card-text">Contenido de la tarjeta 4</p>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-4 col-lg-3">
      <div class="card">
        <img src="imagen4.jpg" alt="Imagen 4" class="card-img-top"/>
        <div class="card-body">
          <h5 class="card-title">Roberto Ochoa</h5>
          <p class="card-text">Contenido de la tarjeta 4</p>
        </div>
      </div>
    </div>


  </div>
</div>

       </div>


    )
}