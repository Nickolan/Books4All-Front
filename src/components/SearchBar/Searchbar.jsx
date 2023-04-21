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

    const [searchStatement, setSearchStatement] = useState(false);


    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)


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
                setSearchStatement(false)
            })


    }


    return (
        <div className="d-flex flex-column  mx-auto align-content-between" style={{ width: "80%", height: '55px', margin: '20px 0 10px 0' }}>
            <div class='d-flex align-self-end'>
                {searchStatement && <button class='bg-light mx-2' style={{ cursor: 'pointer', textDecoration: "underline", fontWeight: 'bold', border: 'none', fontFamily: 'Work Sans, sans-serif' }} onClick={goBack}>Delete search</button>}
                <div className="d-flex input_btn " style={{ height: '40px', width: '250px', padding: '5px', alignItems: 'center', justifyContent: 'center', }}>
                    <input id="inputSearch" class="input_sb bg-none "
                        type='text'
                        autoComplete="off"
                        placeholder="Search your perfect book"
                        onChange={(e) => handleInputChange(e)} value={name}
                        style={{ fontFamily: 'Work Sans, sans-serif', color: 'gray', fontWeight: 'bold', height: '30px' }}
                    />
                    <FiSearch type="submit" class="btn_sb" onClick={(e) => handleSubmit(e)} />
                </div>
            </div>
            {searchStatement ?
                <div class="d-flex align-self-center mt-auto" >
                    <div>
                        <span class='mt-4' style={{ fontWeight: 'bold', fontFamily: 'Work Sans, sans-serif' }}>Your Search for</span>
                        <span class='text-uppercase' style={{ fontWeight: 'bold', fontFamily: 'Work Sans, sans-serif', fontSize: '30px' }}>"{name}"</span>
                    </div>
                </div>
                : null}

        </div>
    )
}