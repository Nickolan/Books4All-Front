import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { createNewActivity, getAllActivities, getAllCountries } from "../../Redux/Actions/actions";
// import './CreateActivity.css';
// import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import styles from './FormCreateBook.module.css'; 
// import { useHis } from "react-router-dom";



export default function CreateActivity () {


    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [buttonEnabled, setButtonEnabled] = useState(false);
    
    const [input, setInput] = useState({
    title:"",
    description:"", 
    stock:"", 
    authors:"", 
    categories:"",
    price :"",
    image:"",
    });

    // title
    // description 
    // stock 
    // authors 
    // categories
    // price 
    // image 


    function validate (input) {
        let errors = {};
        
        if(!input.title) {
            errors.title = "*Activity title required*";
        }

        if(input.title.length < 3 || input.title.length > 15) {
            errors.title = "*Invalid activity title*";
        }

        if(!input.description) {
            errors.description = "*description required*";
        }

        if(!input.stock) {
            errors.stock = "*Please enter a stock number*";
        }

        if(input.authors.length === 0) {
            errors.authors = "*Please enter the authors name*";
        }

        if(!input.categories) {
            errors.categories = "*Please select a categories*";
        }

        if(!input.price) {
            errors.price = "*Please select a price*";
        }

        if(!input.image) {
            errors.image = "*Please select a image*";
        }

        if (Object.entries(errors).length === 0) {
            setButtonEnabled(true)
        } else {
            setButtonEnabled(false)
        }

        return errors
    }

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }


    return (
        <div className = {styles.createActivityGrid}>
            {/* <div className = {styles.navBarCreate}>    
                <NavBar />
            </div> */}
            <div className = {styles.contentCreate}>            
                <h1>Create your Book!</h1>
                <br></br>
                <form >
                    <div>
                        <label>Title: </label>
                        <input
                        type = "text"
                        value = {input.title}
                        name = "title"
                        className={styles.inputText}
                        onChange={handleChange}
                        />
                        {errors.title && (
                            <p className = "p">{errors.title}</p>
                        )}
                    </div>
                    <br></br>
                    <div>
                        <label>Description: </label>
                        <input
                        type = "text"
                        value = {input.description}
                        name = "description"
                        className={styles.inputText}
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                    {errors.description && (
                        <p className = "p">{errors.description}</p>
                    )}
                    </div>
                    <br></br>
                    <div>
                        <label>Stock: </label>
                        <input
                        type = "text"
                        value = {input.stock}
                        name = "stock"
                        className={styles.inputText}
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                    {errors.stock && (
                        <p className = "p">{errors.stock}</p>
                    )}
                    </div>
                    <br></br>
                    <div>
                        <label>Authors: </label>
                        <input
                        type = "text"
                        value = {input.authors}
                        name = "authors"
                        className={styles.inputText}
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                    {errors.authors && (
                        <p className = "p">{errors.authors}</p>
                    )}
                    </div>
                    <br></br>
                    <div>
                        <label>Categories: </label>
                        <input
                        type = "text"
                        value = {input.categories}
                        name = "categories"
                        className={styles.inputText}
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                    {errors.categories && (
                        <p className = "p">{errors.categories}</p>
                    )}
                    </div>
                    <br></br>
                    <div>
                        <label>Price: </label>
                        <input
                        type = "text"
                        value = {input.price}
                        name = "price"
                        className={styles.inputText}
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                    {errors.price && (
                        <p className = "p">{errors.price}</p>
                    )}
                    </div>
                    <br></br>
                    <div>
                        <label>Image: </label>
                        <input
                        type = "text"
                        value = {input.image}
                        name = "image"
                        className={styles.inputText}
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                    {errors.image && (
                        <p className = "p">{errors.image}</p>
                    )}
                    </div>
                    <br></br>
                    <button className = {styles.botonCreate} type ='submit' disabled = {!buttonEnabled}>Create</button>
                </form>
                <br></br>
            </div>
            <br></br>
                <NavLink to = '/countries' className={styles.botonback}>
                    <button>Back to Home</button>
                </NavLink>            
        </div>
    )
}
