import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByAuthor, filterByCategory, getBooks, getNameBooks } from '../../Redux/actions/index';
import './Searchbar.css';
import { FiSearch } from 'react-icons/fi';

export default function Searchbar({ setCurrentPage }) {
    const dispatch = useDispatch()
    const theme= useSelector(state=>state.theme)
    const [name, setName] = useState("")

    const [searchStatement, setSearchStatement] = useState(false);


    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
        dispatch(getNameBooks(e.target.value))
            .then(() => {
                setCurrentPage(1)
            
                setSearchStatement(true);
                dispatch(filterByCategory('all'));
                dispatch(filterByAuthor('all'));
            })


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
        <div className="d-flex flex-column  mx-auto align-content-between " style={{ width: "80%", height: '150px', margin: '20px 0 10px 0'  }}>
           
            <div class='d-flex align-self-end '> 
                {name && <button class='bg-light mx-2 ' style={{ cursor: 'pointer', textDecoration: "underline", fontWeight: 'bold', border: 'none', fontFamily: 'Work Sans, sans-serif' }} onClick={goBack}>Delete search</button>}
                <div className="d-flex input_btn " style={{ height: '40px', width: '250px', padding: '5px', alignItems: 'center', justifyContent: 'center', }}>
                 {theme==='light'?  
                    <div className="bg-dark">
                 <input id="inputSearch" class="input_sb  "
                        type='text'
                        autoComplete="off"
                        placeholder="Search your perfect book"
                        onChange={(e) => handleInputChange(e)} value={name}
                        style={{ fontFamily: 'Work Sans, sans-serif', fontWeight: 'bold', height: '30px', backgroundColor:'black', color:'white' }}
                    />
                    </div>
                    :
                    <div className="bg-light">
                    <input id="inputSearch" class="input_sb  "
                        type='text'
                        autoComplete="off"
                        placeholder="Search your perfect book"
                        onChange={(e) => handleInputChange(e)} value={name}
                        style={{ fontFamily: 'Work Sans, sans-serif', fontWeight: 'bold', height: '30px', background:'white', color:'black' }}
                    />
                         </div>
                    }
                 
                    <FiSearch type="submit" class="btn_sb" onClick={(e) => handleSubmit(e)} />
                  
                </div>
            </div>
            {searchStatement && name?
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