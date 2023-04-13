import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
//import NavBar
//import Footer
import { getBookDetail } from "../../Redux/actions/index";
import {useEffect} from 'react';

const Detail = (props) =>{
    const dispatch =  useDispatch();
   
    useEffect(() => {
        dispatch(getBookDetail(props.match.params.bookId));
    }, [props.match.params.bookId], [dispatch]);

    const eachBook = useSelector((state) => state.bookDetail)

    return(
        <div>
            {/* NavBar
            Footer */}
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
    );
}

export default Detail;
