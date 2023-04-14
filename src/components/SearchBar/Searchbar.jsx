import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameBooks } from '../../Redux/actions/index';


export default function Searchbar(){
    const dispatch = useDispatch()
    const[name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameBooks(name))
    }
    
    return(
        <div>
            <input id="inputSearch"
            type= 'text' 
            placeholder="Search your perfect book" 
            onChange={(e) => handleInputChange(e)} />
            <button type="submit" onClick={(e)=>handleSubmit(e)}>Search</button>
        </div>
    )
}