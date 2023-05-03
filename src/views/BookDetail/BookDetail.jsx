import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBookDetail, addToCart, sideBar } from '../../Redux/actions'
import { useEffect, useState } from 'react';
import { ReviewFormPage } from '../../components/ReviewForm/ReviewFormPage';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import style from '../BookDetail/BookDetail.module.css'
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { setCart } from '../../Redux/actions/localStorage';
import { toast } from 'react-toastify';
import { ArrowBack, ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Button, Container, Divider, IconButton, Rating, Tooltip, Typography } from '@mui/material';
import { handleRating } from './getRatingAverage';
import swal from 'sweetalert';



const BookDetail = () => {

    const dispatch = useDispatch();
    const { bookId } = useParams();
    const { loginWithPopup, isAuthenticated, user } = useAuth0();


    const eachBook = useSelector((state) => state.bookDetail)
    const role = useSelector((state) => state.role)

    const cart = useSelector((state) => state.cart)
    const dbUser = useSelector(state => state.dbUser);
    setCart('cart', cart)

    const [show, setShow] = useState(true);
    const [showReview, setShowReview] = useState(false);
    const [rating, setRating] = useState(0);
    const [updateReview, setUpdateReview] = useState(false);
    const[loader, setLoader]= useState(false)
    const navigate = useNavigate()
    

    let bookIds = [];

    dbUser.Boughts?.forEach(function (bought) {
        bought.books.forEach(function (book) {
            bookIds.push(book.bookId);
        });
    });

    const clickHandler = () => {
        setShow(!show)
    }
    const handleShowReview = () => {
        if (!isAuthenticated) {
            swal("please sign up for leave a review!", {
                buttons: false,
                timer: 1400,
              }); 
            loginWithPopup()
        } else {
            let isBought = bookIds?.find(Id => Id === bookId)
            if (isBought) {
                setShowReview(!showReview)
            } else {
                toast.error('If you want to leave a review you must buy this book')
            }
        }
    }

    const handleClick = () => {
        navigate(-1);
    }

    const handleClickAddCart = (event) => {
        event.preventDefault()
        const buy = cart.find(item => item.bookId === bookId);
        function generarIdUnico() {
            return Math.random().toString(36).substring(2) + Date.now().toString(36);
        }

        const bookInCart = {
            id: generarIdUnico(),
            bookId: bookId,
            quantity: 1,
        }
        if (buy) {
            dispatch(sideBar())
        } else {
            if (eachBook.length > 0 && eachBook[0].stock > 0) {
                dispatch(addToCart(bookInCart))
                dispatch(sideBar())
            }
        }
      
        toast(`You have added ${eachBook.title} to the cart !`, { //toastify desde la vista del detalle del libro
            position: "bottom-right",
            style: {
                background:'linear-gradient(97deg, rgba(33,30,31,1) 0%, #5c5c5f 5%)',
              color: "white",
            },
            progressBar: {
              backgroundColor: "red",
            },
            autoClose: 1000,
            closeOnClick: true,
          });


    }

    useEffect(() => {
        let ratingAverage = 0;

        if (eachBook.length > 0) {
            ratingAverage = handleRating(eachBook[0].Reviews);
        }

        setRating(ratingAverage);

    }, [eachBook]);

    useEffect(() => {
        setLoader(true)      
        setTimeout(() => {
           setLoader(false);
         }, 300);
        if (bookId) {
            dispatch(getBookDetail(bookId));
        }
    }, [bookId, dispatch]);

    return (
        <div >
            
            <Container sx={{ marginTop: '80px', marginBottom: '80px' }}>
                {eachBook?.map((el, i) => {
                    return (
                        <div key={i}>
                            <div>
                                <IconButton onClick={handleClick} fontSize="large" sx={{ fontSize: 60, color: 'black', fontWeight: 'bold' }}>
                                    <ArrowBack />
                                </IconButton>
                                <div className={style.allContentContainer}>
                                    <div className={style.imgContainer}>
                                        
                                        <img title={el.title} className={style.bookImg} alt='Not found' src={el.image} width='350px' height='200px'></img>
                                    </div>
                                    <div className={style.contentContainer}>
                                        <h1 className={style.title}>{el.title}</h1>
                                        <h2 className={style.subtitle}>Authors: {el.authors}</h2>
                                        {
                                            el.categories?.map((cat, i) => {
                                                return (
                                                    <h3 key={i} className={style.subtitleCategory}>{cat}</h3>
                                                )
                                            })
                                        }
                                        <Rating name="read-only" value={rating} precision={0.5} readOnly />
                                        <div className='d-flex justify-content-start align-items-center'>
                                            <div className={style.container_price}>
                                                <h3 className={style.price}>${el?.price}</h3>
                                            </div>
                                            <button type="button" className="btn btn-dark mt-1 ms-3" onClick={handleClickAddCart} title='Add to cart'>Add to cart</button>
                                            <Typography sx={{ margin: '0 10px 0 10px', fontStyle: 'italic' }}>Avalaible units: {el.stock}</Typography>
                                        </div>
                                        <div>
                                            {
                                                role?.name === 'admin' && <Link to={`/admin/modify/${el.id}`}><button class='btn btn-primary'>Edit</button></Link>
                                            }
                                        </div>

                                    </div>

                                </div>
                                <hr />
                                <div className={style.buttonContainer}>
                                    {!show ?
                                        <Tooltip title="Show more">
                                            <IconButton onClick={clickHandler}>
                                                <ExpandMore fontSize="large" sx={{ fontSize: 50 }}></ExpandMore>
                                            </IconButton>
                                        </Tooltip>
                                        :
                                        <Tooltip title="Show less">
                                            <IconButton onClick={clickHandler}>
                                                <ExpandLess fontSize="large" sx={{ fontSize: 50 }}></ExpandLess>
                                            </IconButton>
                                        </Tooltip>}
                                </div>
                                {show && <p className={style.descriptionContent}>{el.description}</p>}
                                <hr />
                                <Box sx={{ marginTop: '80px' }}>
                                    <Typography
                                        variant='h6'
                                        sx={{
                                         
                                            height: '40px',
                                            padding: '5px',
                                            marginBottom: '20px'
                                        }}>
                                        Book reviews
                                    </Typography>
                                    {el.Reviews.length > 0 ? <div className={style.subtitleReview}>{el?.Reviews?.length !== 0 ? el?.Reviews?.map(el => {
                                        return (
                                            <Box>
                                                {el.active && <ReviewCard
                                                    role={role}
                                                    body={el.body}
                                                    id={el.id}
                                                    user_name={el.user_name}
                                                    rating={el.rating}
                                                    avatar={el.user_avatar}
                                                    user_nickname={dbUser.name}
                                                    bookId={bookId}
                                                />}
                                                <Divider />
                                            </Box>
                                        )
                                    }) : ""}
                                    </div>
                                        :
                                        <Box>
                                            <Typography sx={{ color: 'gray' }}>This book doesn't have any reviews yet</Typography>
                                            <Divider></Divider>
                                        </Box>
                                    }
                                    <Box sx={{ marginTop: '30px' }}>
                                        <Typography>
                                            Did you buy this book? Share your opinion and
                                            <Button sx={{}} onClick={handleShowReview} title='leave a review'> leave a review!</Button>

                                        </Typography>

                                    </Box>

                                </Box>
                            </div>
                        </div>
                    )
                })}
                {showReview && <ReviewFormPage
                    reviews={eachBook[0].Reviews}
                    id={bookId} setShowReview={setShowReview}
                    showReview={showReview}
                    updateDetail={setUpdateReview}
                    updateReview={updateReview}
                    
                />}
            </Container>
          
        </div>
    );
}

export { BookDetail };