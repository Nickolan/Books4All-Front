import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getBookDetail} from '../../Redux/actions'
import {useEffect} from 'react';
import { ReviewFormPage } from '../../components/ReviewForm/ReviewFormPage';
import Navbar from '../../components/NavBar/Navbar';
import Footer from '../../components/Footer/Footer';

const BookDetail = (props) =>{
    const dispatch =  useDispatch();

    const { bookId } = useParams();
    console.log(bookId)
   
    useEffect(() => {
        dispatch(getBookDetail(bookId));
    }, []);

    const eachBook = useSelector((state) => state.bookDetail)
    console.log(eachBook)

    return(
    <div className='container-xl bg-light text-center'>
        <div>
            <Navbar />
            <div className='container-xl bg-light row'>
            {eachBook?.map((el)=> {
                return (
                    <div>
                    <div class="col-sm-6">
                    <div class="card">
                    <div class="card-body">
                    <div class="card-header">
                    <h1 class="card-title text-center">{el.title}</h1>
                    </div>
                    <div>
            <img class="img-fluid img-thumbnail rounded mx-auto d-block"  alt='Not found' src={el.image}></img>
            <h2 class="card-title text-center">Genres</h2>
            <hr />
            <h4 class="card-subtitle mb-2 text-muted text-center">{el.categories[0]}</h4>
            <hr />            
            <h2 class="card-title text-center">Authors</h2>
            <h4 class="card-subtitle mb-2 text-muted text-center"> {el.authors}</h4>
            <h2 class="card-title text-center">About</h2>
            <hr />
            <h5 class="card-subtitle mb-2 text-muted text-justify">{el.description}</h5>
            <hr />
            <h2 class="card-title text-center">Price</h2>
            <hr />
            <h4 class="card-subtitle mb-2 text-muted text-center">${el.price}</h4>
            <hr />
            <h2 class="card-title text-center">Stock</h2>
            <hr />
            <h4 class="card-subtitle mb-2 text-muted text-center">{el.stock} Units available now</h4>
            <hr />
            <h2 class="card-title text-center">Reviews</h2>
            <hr />
            <h4 class="card-subtitle mb-2 text-muted text-center">{el.Reviews?.map(el=><p>{el.body}</p>)}</h4>
            </div>
            </div>
            </div>
            </div>
            </div>
                )
            })}
            <div class="col-sm-6">
            <div class="card">
            <div class="card-body">
            <ReviewFormPage />
            </div>
            </div>
            </div>
            </div>
            <Footer />
        </div>
    </div>
    );
}
export {BookDetail};

