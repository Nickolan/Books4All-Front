import React from "react";
import { useState } from "react";
import './CarruselTrending.css'

// const images = [
//     { url: 'https://maldon.es/wp-content/uploads/2016/04/12428422.jpg', title: 'Image 1' },
//     { url: 'https://www.sopitas.com/site/wp-content/uploads/2015/04/libro_naranja_mecanica1.jpg', title: 'Image 2' },
//     { url: 'https://marketplace.canva.com/EAFI171fL0M/1/0/1003w/canva-portada-de-libro-de-novela-ilustrado-color-azul-aqua-PQeWaiiK0aA.jpg', title: 'Image 3' },
//     { url: 'https://www.sopitas.com/site/wp-content/uploads/2015/04/libro_naranja_mecanica1.jpg', title: 'Image 2' },
//     { url: 'https://maldon.es/wp-content/uploads/2016/04/12428422.jpg', title: 'Image 1' },
//     { url: 'https://www.sopitas.com/site/wp-content/uploads/2015/04/libro_naranja_mecanica1.jpg', title: 'Image 2' },
//     // ... y así sucesivamente hasta image8
//   ];
  
const images = [
    { url: 'https://maldon.es/wp-content/uploads/2016/04/12428422.jpg', title: 'Image 1' },
    { url: 'https://www.sopitas.com/site/wp-content/uploads/2015/04/libro_naranja_mecanica1.jpg', title: 'Image 2' },
    { url: 'https://marketplace.canva.com/EAFI171fL0M/1/0/1003w/canva-portada-de-libro-de-novela-ilustrado-color-azul-aqua-PQeWaiiK0aA.jpg', title: 'Image 3' },

]

// export default function CarruselTrending(){

//     const [selectedIndex, setSelectedIndex] = useState(0);

//     const [selectedImage, setSelectedImage] = useState(images[0].url);




//     // SELECTNEWIMAGE ES IGUAL A LA LOGICA DE PREVIOS Y NEXT JUNTOS
//     const selectNewImage = (index , images, next = true ) => {
//         const condition = next ? selectedIndex < images.length : selectedIndex > 0 ;

//         const nextIndex =  next ? (condition ? selectedIndex + 1 : 0) : condition ? selectedIndex - 1 : images.length - 1 ;

//     //     if(next){
//     //         if(condition){
//     //             return selectedIndex + 1 ESTO ES IGUAL A LA CONST NEXTINDEX
//     //         } else {
//     //             return 0
//     //         }
//     //     }

//     setSelectedImage(images[nextIndex]);
//     setSelectedIndex(nextIndex);
//     }


//     // const previos = () => {
//     //     const condition = selectedIndex > 0 ;
//     //     const nextIndex = condition ? selectedIndex - 1 : images.length - 1 ;

//     //     setSelectedImage(images[nextIndex]);
//     //     setSelectedIndex(nextIndex);
//     // }

//     //  const next = () => {
//     //     const condition = selectedIndex < images.length ;
//     //     const nextIndex = condition ? selectedIndex + 1 : 0 ;

//     //     setSelectedImage(images[nextIndex]);
//     //     setSelectedIndex(nextIndex);
//     //  }

//     const previos = () => {
//         selectNewImage(selectedIndex, images, false);
//     }

//     const next = () => {
//         selectNewImage(selectedIndex, images);
//     }

//     return(
//         <div className="conteinerCarousel">
//             <div className="conteiner-image" >
//             {
//                 images.map((e)=>{
//                     return(
//                         <div className="card-image">
//                             <img className="image" src={e.url} alt={images[0].url}/>
//                         </div>
//                     )
//                 })
//             }
//             </div>
//         </div>
//     )

// }

export default function CarruselTrending(){

    const [imagenActual, setImagenActual] = useState(0);
    const cantidad = images?.length;

    const nextimagen = () => {
        setImagenActual(imagenActual === cantidad - 1 ? 0 : imagenActual + 1)
    }

    const previousImagen = () => {
        setImagenActual(imagenActual === 0 ? cantidad - 1 : imagenActual - 1)
    }
    


    return(
        <div className="conteiner">
            <button onClick={previousImagen} >{"<-"}</button>
            {
                images.map((imagen, index)=>{
                    return(
                        <div className="divMapImages"> 
                            {imagenActual === index && (
                                <img key={index} src={imagen.url} alt="imagen" className="imagen" />
                            )}
                        {/* <img key={index} src={imagen.url} alt="imagen" /> */}
                        </div>
                       )
                })
            }
            <button onClick={nextimagen} >{"->"}</button>
        </div>
    )

}
