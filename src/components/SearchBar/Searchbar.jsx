import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByAuthor, filterByCategory, getBooks, getNameBooks } from '../../Redux/actions/index';
import { Link } from "react-router-dom";
import './Searchbar.css';
import { FiSearch } from 'react-icons/fi';

export default function Searchbar({ setCurrentPage }) {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [search, setSearch] = useState("");

    const genreFilter = useSelector(state => state.filters.category);
    const authorFilter = useSelector(state => state.filters.author);
    const [searchStatement, setSearchStatement] = useState(false);

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
        setSearch(e.target.value);

    }

    function handleSubmit(e) {
        if (name) {
            e.preventDefault()
            setCurrentPage(1)
            dispatch(getNameBooks(name))
            setSearchStatement(true);
            dispatch(filterByCategory('all'));
            dispatch(filterByAuthor('all'));
        }

    }

    function goBack() {
        dispatch(getBooks())
            .then(() => {
                dispatch(filterByCategory('all'));
                dispatch(filterByAuthor('all'));
                setName("")
                setSearch("")
                setSearchStatement(false)
            })


    }


    return (
        <div className="d-flex justify-content-center flex-column " style={{marginLeft:"330px", marginTop:"30px"}}>

            <div className="input_btn">
                <input id="inputSearch" class="input_sb"
                    type='text'
                    placeholder="Search your perfect book"
                    onChange={(e) => handleInputChange(e)} value={name} />
                <FiSearch type="submit"  class="btn_sb" onClick={(e) => handleSubmit(e)}/>
            </div>
            {searchStatement ?
                <div class="d-flex flex-column mt-3">
                    <span style={{ cursor: 'pointer', textDecoration: "underline" }} onClick={goBack}>Go back</span>
                    <span class= 'mt-4'>Tu búsqueda de:</span>
                    <span class= 'text-uppercase font-italic' style={{fontFamily: 'italic'}}>"{search}"</span>

                </div>
                : null}

        </div>
    )
}