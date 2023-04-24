import { useDispatch, useSelector } from "react-redux";
import { filterByAuthor, filterByCategory, getBooks } from "../../Redux/actions";
import { useEffect } from "react";
import style from './styles.module.css'



const Filters = ({ setCurrentPage }) => {

    const books = useSelector(state => state.books);
    const filter = useSelector(state => state.filters)

    let categories_ = [];
    books.forEach(book => book.categories?.map(categorie => categories_.push(categorie)));
    categories_ = Array.from(new Set(categories_));
    categories_ = categories_.sort()

    let authors_ = [];
    books.forEach(book => book.authors?.map(authors => authors_.push(authors)))
    authors_ = Array.from(new Set(authors_))
    authors_ = authors_.sort();

   
    const dispatch = useDispatch();



    const handleOnChangeCategory = (event) => {
        dispatch(filterByCategory(event.target.value))
        setCurrentPage(1)
    }

    const handleOnChangeAuthor = (event) => {
        dispatch(filterByAuthor(event.target.value))
        setCurrentPage(1)
    }

    useEffect(() => {
        dispatch(getBooks())
    }, [])


    return (
        <div class='d-flex align-items-center'  >
            <span class='fw-bold' style={{ marginRight: '10px' }}>FILTER BY:</span>
            <div className={style.border}>
                <select class='border-0 bg-light' style={{ textTransform: 'uppercase', width: '120px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', }} value={filter.category} onChange={handleOnChangeCategory}>
                    <option value='all'>All Genres</option>
                    {categories_?.map((category, index) => {
                        return (
                            <option value={category} key={index}>{category}</option>
                        )
                    })}
                </select>
            </div>
            <div className={style.border}>
                <select class='border-0 bg-light' style={{ marginRight: '10px', textTransform: 'uppercase', width: '130px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} value={filter.author} onChange={handleOnChangeAuthor}>
                    <option value='all' className={style.option}>All Authors</option>
                    {
                        authors_.map((author, index) => {
                            return (
                                <option value={author} key={index}>{author}</option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
    )

}


export default Filters;