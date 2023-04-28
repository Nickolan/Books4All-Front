import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getBookDetail, getUserFromDb } from "../../Redux/actions";
import { PostUser } from "../PostUser/PostUser";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import { toast } from 'react-toastify';

function UpdateBookForm({book}) {

    const { loginWithPopup, isAuthenticated, user } = useAuth0();
    const dispatch = useDispatch()
    const { idBook } = useParams()
    const navigate = useNavigate()
    //PostUser(user, isAuthenticated)

    const [change, setChange] = useState(false)
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
            <div>
                <input type="text" name='title' value={form.title} placeholder='Title' onChange={handlerChange}/>
            </div>
            <div>
                <input type="text" name="authors" value={form.authors} placeholder='Author/s' onChange={handlerChange}/>
            </div>
            <div>
                <input type="text" name="categories" value={form.categories} placeholder='Categories' onChange={handlerChange}/>
            </div>
            <div>
                <input type="text" name="price" value={form.price} placeholder="Price $$$" onChange={handlerChange} />
            </div>
            <div>
                <input type="text" name="stock" value={form.stock} placeholder="Stock" onChange={handlerChange} />
            </div>
            {/* <div>
                {form.Reviews?.map((rev) => {
                    return(
                        <div class='d-flex justify-content-between'>
                            <div>
                                <span>{rev.user_name}</span>
                            </div>
                            <div>
                                <span> {rev.body} </span>
                            </div>
                            <div>
                                <span> {rev.rating} / 5 </span>
                            </div>
                            <div>
                                <button onClick={() => alert('delete')} class='btn btn-danger'>Delete Review</button>
                            </div>
                        </div>
                        
                    )
                })}
            </div> */}
            <div>
                <textarea name="description" value={form.description} placeholder="Description" onChange={handlerChange} cols="30" rows="10"></textarea>
            </div>
            <div>
                <img src={form.image} alt="" width='250px' height='350px'/>
            </div>
            <div>
                <button disabled={!change} class={change ? 'btn btn-primary' : 'btn btn-secondary'} type="submit">Modify</button>
            </div>
            </form>
            <Footer/>
        </div>
    )
}

export default UpdateBookForm;