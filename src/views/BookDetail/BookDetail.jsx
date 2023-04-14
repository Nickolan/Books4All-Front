import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
//import NavBar
//import Footer
import {getBookDetail} from '../../Redux/actions'
import {useEffect} from 'react';

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
<div className='container-xl bg-light'>
        <div>
            {/* NavBar
            Footer */}
            {eachBook?.map((el)=> {
                return (
                    <div>
            <img alt='Not found' src={el.image} width='350px' height='200px'></img>
            <h1>{el.title}</h1>
            <h2>Author</h2>
            <h3> {el.author}</h3>
            <h2>About</h2>
            <hr />
            <h3>{el.description}</h3>
            <hr />
            <h2>Genres</h2>
            <hr />
            <h3>{el.categories}</h3>
            <hr />
            <h2>Review</h2>
            <hr />
            <h3>{el.Reviews?.map(el=>el.name)}</h3>
            <Link to='/home'><button>Back</button></Link>
                        </div>
                )

            })}
            
        
        </div>
</div>
    );
}
export {BookDetail};

