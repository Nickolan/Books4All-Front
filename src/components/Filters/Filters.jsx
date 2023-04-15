import { useDispatch, useSelector} from "react-redux";
import { filterByAuthor, filterByCategory, getBooks } from "../../Redux/actions";
import { useEffect } from "react";



const Filters = ({setCurrentPage}) => {

    const books = useSelector(state => state.allBooks);
    
    let bookCategories = books.map(book => book.categories ? book.categories[0] : 'Art');

    bookCategories = Array.from(new Set(bookCategories));

    let authors_ = [];

    books.forEach(book => book.authors?.map(authors => authors_.push(authors)))

    authors_ = Array.from(new Set (authors_))

    console.log(authors_)

    const dispatch = useDispatch();

     

    const handleOnChangeCategory = (event) => {
        dispatch(filterByCategory(event.target.value))
        setCurrentPage(1)
    }

    const handleOnChangeAuthor = (event) => {
        dispatch(filterByAuthor(event.target.value))
        setCurrentPage(1)
    }

    useEffect(()=> {
        dispatch(getBooks())
    },[])


    return (
        <div>
            <select onChange={handleOnChangeCategory}>
                {bookCategories?.map((category, index) => {
                    return(
                        <option value={category} key={index}>{category}</option>
                    )
                })}
            </select>
            <select onChange={handleOnChangeAuthor}>
                {
                    authors_.map((author, index) => {
                        return(
                            <option value={author} key={index}>{author}</option>
                        )
                    })
                }
            </select>
        </div>
    )

}


export default Filters;