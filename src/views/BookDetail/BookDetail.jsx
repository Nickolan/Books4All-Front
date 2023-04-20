import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getBookDetail, addToCart} from '../../Redux/actions'
import {useEffect, useState, useMemo} from 'react';
import { ReviewFormPage } from '../../components/ReviewForm/ReviewFormPage';
import Navbar from '../../components/NavBar/Navbar';
import Footer from '../../components/Footer/Footer';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import style from '../BookDetail/BookDetail.module.css'
import { useNavigate } from 'react-router-dom';


const BookDetail = (props) =>{
    const dispatch =  useDispatch();
    const { bookId } = useParams();
    
    const eachBook = useSelector((state) => state.bookDetail)
    const bookName= eachBook?.map((book)=>book.title) 
    const cart = useSelector((state) => state.cart)   
    const stock=eachBook?.map(book=>book.stock)
    
    const [show, setShow] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [showBook, setShowBook] = useState(false);
  
    let [counter, setCounter]= useState(0)

    const navigate = useNavigate()
    
    const clickHandler = () => {
        setShow(!show)
    }
    const handleShowReview = () => {
        setShowReview(!showReview)
    }

    const handleClick = () => {
        navigate(-1);
      }

      let bookInCart={}

    const handleClickAddCart=(event)=>{
        bookInCart={
            'bookId':bookId,
            'bookName':bookName?.map(n=>n) ,
            'quantity':Number(bookId.length) , 
            'price': (eachBook?.map(e=>e.price))
            
        }
        dispatch(addToCart(bookInCart))
    }

    const handleRest=()=>{
        setCounter(--counter)
    }

    
    useEffect(() => {
        if (bookId) {
            dispatch(getBookDetail(bookId));
        }
},  [bookId, dispatch]);

    
    return(
<div className={style.mainContainer}>
        <div>
            <Navbar />
            
            {eachBook?.map((el)=> {
       
                return (
                    <div>
                    <div>
                    <img className={style.backButton} src="https://res.cloudinary.com/dvldakcin/image/upload/v1681620387/Countries/back_lblp4n.png" onClick={handleClick} />
                        <div className={style.allContentContainer}>
                        <div className={style.imgContainer}>
            <img className={style.bookImg} alt='Not found' src={el.image} width='350px' height='200px'></img>
                        </div>
                        <div className={style.contentContainer}>
            <h1 className={style.title}>{el.title}</h1>
            <h2 className={style.subtitle}>Authors: {el.authors}</h2>
            <h3 className={style.subtitleCategory}>{el.categories[0]}</h3>
            <div className='d-flex justify-content-start'>
                <div className={style.container_price}>
            <h3 className={style.price}>${el.price}</h3>
                </div>
            {counter > 0 &&  <button className="btn btn-secondary " onClick={handleRest}>-</button>    }    
                    
           {counter>0 && <input disabled className='input_add bg-light ms-1 border border-0' style={{width: '4%'}} value={counter} type='text'placeholder= {0} ></input>} 
            {counter < stock && <button className="btn btn-secondary" onClick={handleClickAddCart}>+</button>    
            }                
        
           
          {!stock? <p>"Lo sentimos no tenemos stock de este libro"</p>: 
              <button  type="button" className="btn btn-dark mt-1 ms-3" onClick={handleClickAddCart}>Add to cart</button>
          
          }          

            </div>
           
                        </div>
                        </div>
                        <hr/>
                        <div className={style.buttonContainer}>
                        <img src='https://res.cloudinary.com/dvldakcin/image/upload/v1681705343/Countries/down-arrow_rlhmtn.png' className={style.description} onClick={clickHandler}/>
                        </div>
            { show && <p className={style.descriptionContent}>{el.description}</p>}
            <hr/>   
            <div >
            <h3 className={style.subtitleReview}>{el?.Reviews?.length !==0 ? el?.Reviews?.map(el=>{
                return(
                    <ReviewCard body={el.body} user_name={el.user_name} rating={el.rating}/>
                )
            }) : ""}</h3>
            </div>
            </div>
            </div>
                )
            })}

            <div className={style.buttonContainer}>
                <button onClick={handleShowReview} className={style.reviewButton}>Leave a review</button>
            </div>
            {showReview && <ReviewFormPage reviews={eachBook[0].Reviews} id={bookId} handleShowReview={handleShowReview}/>}
         
            </div>
            <Footer />
        </div>

    );
}
export {BookDetail};

