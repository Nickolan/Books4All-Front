import { Link } from "react-router-dom";
import { useEffect } from "react";

const SearchResults = ({globalSearchResults, searchTerm, setSearchTerm}) => {

    useEffect(()=>{
    },[searchTerm])

    if(!globalSearchResults.users && !globalSearchResults.books) return null;

    const handleClick = () => {
        setSearchTerm('');
    }

    return(
        <div style={{position: 'absolute'}} on={handleClick}>
            {globalSearchResults.books.map(book => {
                return (
                    <div>
                        <Link to={`/bookDetail/${book.id}`} onClick={handleClick}>
                            <div>
                            <img src={book.img} alt="" />
                            <h6>{book.title}</h6>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default SearchResults;