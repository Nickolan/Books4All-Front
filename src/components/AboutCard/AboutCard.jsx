import img_default from '../../views/About/Images/img_default.webp'

export const AboutCard=({name, img,countryImage })=>{
return(
    <div className="container-xl  ">

  <div className="d-flex justify-content-center mt-2">

  </div>
 
    <div className="row gap-3 justify-content-center">
      <div className="col-sm-6 col-md-4 col-lg-3 w-75">
        <div className="m-lg-2 w-75 " style={{ borderRadius: "10%", border: "none" }}>
          <img src={img || img_default} title={name} alt="Imagen 1" className="card-img-top w-100" style={{ borderRadius: "100%" }} />
          <div className="card-body d-flex justify-content-center align-items-center">
                <img src={countryImage}  className="w-25 mr-2" alt="" />
              <h6 className="card-title ">{name}</h6>
              {/* <p className="card-text">Contenido de la tarjeta 1</p> */}

          </div>
        </div>
      </div>
    </div>
  </div>


)
}
