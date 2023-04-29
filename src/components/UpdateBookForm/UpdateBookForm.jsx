import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getBookDetail, getUserFromDb } from "../../Redux/actions";
import { PostUser } from "../PostUser/PostUser";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import formStyle from './UpdateBookForm.module.css'
import WidgetBook from "../Widget/WidgetBook";
import { toast } from 'react-toastify';

function UpdateBookForm({book}) {

    const { loginWithPopup, isAuthenticated, user } = useAuth0();
    const dispatch = useDispatch()
    const { idBook } = useParams()
    const navigate = useNavigate()
    const theme = useSelector(state => state.theme)
    //PostUser(user, isAuthenticated)

    const [change, setChange] = useState(false)
    const [url, setUrl] = useState('');
    const [form, setForm] = useState({
        id: book[0]?.id,
        title: book[0]?.title,
        authors: book[0]?.authors,
        categories: book[0]?.categories,
        price: book[0]?.price,
        stock: book[0]?.stock,
        description: book[0]?.description,
        image: book[0]?.image,
        Reviews: book[0]?.reviews
    })
    
    useEffect(() => {
        dispatch(getBookDetail(idBook))
        .then(() => book && console.log('Book Detail', book[0].id))
        .then(() => dispatch(getUserFromDb(user?.nickname)))
        .then(() => console.log(user))
        .then(() => updateForm())
    }, [user])

    const updateForm = () => {
        setForm({
            id: book[0]?.id,
            title: book[0]?.title,
            authors: book[0]?.authors,
            categories: book[0]?.categories,
            price: book[0]?.price,
            stock: book[0]?.stock,
            description: book[0]?.description,
            image: book[0]?.image,
            Reviews: book[0]?.Reviews
        })
    }

    

    const handlerChange = (event) => {
        setChange(true)
        const property = event.target.name;
        const value = event.target.value;
        setForm({...form, [property]:value});
        console.log(form);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`/admin/modify/${idBook}`, form)
        .catch((err) => console.log(err))
        navigate(-1)

    };


    return(
        <div class='container'>
            <Navbar/>
            <form onSubmit={handleSubmit}>
            <div className={formStyle.container}>
            <div className={formStyle.cont}> 
                <div className={theme === 'dark' ? formStyle.inputsCont : formStyle.lightInputsCont}>
                    <label className={formStyle.labels}>Name: </label>
                    <input className={theme === 'dark' ? formStyle.inputs : formStyle.lightIntputs} type="text" name='title' value={form.title} placeholder='Title' onChange={handlerChange}/>
                </div>
                <div className={theme === 'dark' ? formStyle.inputsCont : formStyle.lightInputsCont}>
                    <label className={formStyle.labels}>Authors: </label>
                    <input className={theme === 'dark' ? formStyle.inputs : formStyle.lightIntputs} type="text" name="authors" value={form.authors} placeholder='Author/s' onChange={handlerChange}/>
                </div>
                <div className={theme === 'dark' ? formStyle.inputsCont : formStyle.lightInputsCont}>
                    <label className={formStyle.labels}>Categories: </label>
                    <input className={theme === 'dark' ? formStyle.inputs : formStyle.lightIntputs} type="text" name="categories" value={form.categories} placeholder='Categories' onChange={handlerChange}/>
                </div>
                <div className={theme === 'dark' ? formStyle.inputsCont : formStyle.lightInputsCont}>
                    <label className={formStyle.labels}>Price: </label>
                    <input className={theme === 'dark' ? formStyle.inputs : formStyle.lightIntputs} type="number" name="price" value={form.price} placeholder="Price $$$" onChange={handlerChange} />
                </div>
                <div className={theme === 'dark' ? formStyle.inputsCont : formStyle.lightInputsCont}>
                    <label className={formStyle.labels}>Stock: </label>
                    <input className={theme === 'dark' ? formStyle.inputs : formStyle.lightIntputs} type="number" name="stock" value={form.stock} placeholder="Stock" onChange={handlerChange} />
                </div>
                <div className={theme === 'dark' ? formStyle.textAreaCont : formStyle.lightTextAreaCont}>
                    <label className={formStyle.labels}>Description: </label>
                    <textarea className={theme === 'dark' ? formStyle.textArea : formStyle.lightTextArea} name="description" value={form.description} placeholder="Description" onChange={handlerChange} cols="30" rows="10"></textarea>
                </div>
            </div>

            <div className={formStyle.secondContainer}>
                <div >
                    <WidgetBook className={formStyle.divImg} theme={theme} bookImg={form.image} setUrl={setUrl} url={url} />
                </div>
                <div>
                    <button disabled={!change} class={change ? 'btn btn-primary' : 'btn btn-secondary'} type="submit">Modify</button>
                </div>
            </div>
            </div>
            </form>
            <Footer/>
        </div>
    )
}

export default UpdateBookForm;