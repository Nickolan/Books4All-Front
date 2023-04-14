import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getBookDetail } from "../../Redux/actions/index";
import {useEffect} from 'react';

const BookDetail = (props) =>{
    const dispatch =  useDispatch();

 
    const { bookId } = useParams();
    console.log(bookId)
     
    const eachBook = useSelector((state) => state.bookDetail);
    console.log(eachBook)



    useEffect(() => {
        dispatch(getBookDetail(bookId));
    }, []);

    return(
        <div className='container-xl bg-success'>
        <div>
            <img alt='Not found' src={eachBook.image} width='350px' height='200px'></img>
            <h1>{eachBook.title}</h1>
            <h2>Author</h2>
            <h3> {eachBook.author}</h3>
            <h2>About</h2>
            <hr />
            <h3>{eachBook.description}</h3>
            <hr />
            <h2>Rating</h2>
            <hr />
            <h3>{eachBook.rating}</h3>
            <hr />
            <h2>Review</h2>
            <hr />
            <h3>{eachBook.Reviews?.map(el=>el.name)}</h3>
            <Link to='/home'><button>Back</button></Link>
        
        </div>
</div>
    );
}

export default BookDetail;
