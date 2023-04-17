import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
//import NavBar
//import Footer
import {getBookDetail} from '../../Redux/actions'
import {useEffect} from 'react';
import { ReviewFormPage } from '../../components/ReviewForm/ReviewFormPage';
import Navbar from '../../components/NavBar/Navbar';
import Footer from '../../components/Footer/Footer';
import ReviewCard from '../../components/ReviewCard/ReviewCard';


const BookDetail = (props) =>{
    const dispatch =  useDispatch();
    const { bookId } = useParams();
    useEffect(() => {
        dispatch(getBookDetail(bookId));
    }, []);

    const eachBook = useSelector((state) => state.bookDetail)
    console.log(eachBook)

    return(
<div className='container-xl bg-light'>
        <div>
            <Navbar />
            {eachBook?.map((el)=> {
                return (
                    <div class="card">
                    <div>
            <img alt='Not found' src={el.image} width='350px' height='200px'></img>
            <h1>{el.title}</h1>
            <h2>Authors</h2>
            <h3> {el.authors}</h3>
            <h2>About</h2>
            <hr />
            <h3>{el.description}</h3>
            <hr />
            <h2>Genres</h2>
            <hr />
            <h3>{el.categories[0]}</h3>
            <hr />
            <h2>Price</h2>
            <hr />
            <h3>${el.price}</h3>
            <hr />
            <h2>Stock</h2>
            <hr />
            <h3>{el.stock}</h3>
            <hr />
            <h2>Reviews</h2>
            <hr />
            <h3>{el.Reviews.length !==0 ? el.Reviews.map(el=>{
                return(
                    <ReviewCard body={el.body} user_name={el.user_name} rating={el.rating}/>
                )
            }) : "There arent any reviews, leave yours"}</h3>
            </div>
            </div>
                )
            })}
            <ReviewFormPage eachBook={eachBook} id={bookId} />
            </div>
            <Footer />
        </div>

    );
}
export {BookDetail};

