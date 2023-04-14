import { useState} from "react";
import {useHistory} from "react-router-dom";
//import NavBar
import { postReview } from "../../Redux/actions/index";
import {useDispatch} from "react-redux";
//import Footer
//import Button
import style from "../../components/Styles/Errors.module.css"

const Form = () =>{

const dispatch = useDispatch();

// const history= useHistory();

const [form, setForm] = useState({
        book: '',
        author: '',
        bookId: '',
        name: '',
        email: '',
        rating: '',
        review: '',
});

const [errors, setErrors] = useState({
        book: '',
        author: '',
        bookId: '',
        name: '',
        email: '',
        rating: '',
        review: '',
});

const changeHandler = (event) =>{
const property = event.target.name;
const value = event.target.value;
validate({...form, [property]:value});
setForm({...form, [property]:value});
}

const validate = (form) => {
  let errors = {};
  
  if (!form.book) {
    errors.book = 'Book Title is required';
  }

  if (!form.author) {
    errors.author = 'Book Author is required';
  }
  
  if (!form.bookId || form.bookId.length === 0) {
    errors.bookId = 'BookId is required';
  }

  if (!form.name) {
    errors.name = 'Please include your name or username';
  }

  if (!form.email) {
    errors.email = 'Please include your email';
  }

  if (form.rating < 1.0 || form.rating > 5.0) {
    errors.rating = 'Rating must be between one and five stars';
  }

  errors.review = "";

  setErrors(errors);
};

const submitHandler = (event) =>{
    
        event.preventDefault();
        dispatch(postReview(form));
        let errorsArray = Object.keys(errors);
        console.log(errorsArray)
        errorsArray.length === 0? alert('Success! New Review created')
        : alert('Error! Please verify data');

        setForm({
        book: '',
        author: '',
        bookId: '',
        name: '',
        email: '',
        rating: '',
        review: '',
        });

        setTimeout(() => {
        // history.push('/home');
        }, 2000)
    }

 return(
<div className='container-xl bg-light'>
        <div>
              <form onSubmit={submitHandler}>
                <div>
                <h1>Create your own review!</h1>
                </div>
                <div>
                <label htmlFor="book"> Book Title </label>
                <hr/>
                <input className={errors.book && style.error} type='text' value={form.book} onChange={changeHandler} name='book' />
                <br />
                <span>{errors.book? errors.book : ""}</span> 
                </div>
                <div>
                <label htmlFor="author"> Author </label>
                <hr/>
                <input className={errors.author && style.error} type='text' value={form.author} onChange={changeHandler} name='author' />
                <br />
                <span>{errors.author? errors.author : ""}</span> 
                <div>
                <label htmlFor="bookId"> Book ID </label>
                <hr/>
                <input className={errors.bookId && style.error} type='text' value={form.bookId} onChange={changeHandler} name='bookId' />
                <br />
                <span>{errors.bookId? errors.bookId : ""}</span> 
                </div>
                <div>
                <label htmlFor="name"> Your Name </label>
                <hr/>
                <input className={errors.name && style.error} type='text' value={form.name} onChange={changeHandler} name='name' />
                <br />
                <span>{errors.name? errors.name : ""}</span> 
                </div>
                <div>
                <label htmlFor="email"> Your email address </label>
                <hr/>
                <input className={errors.email && style.error} type='text' value={form.email} onChange={changeHandler} name='email' />
                <br />
                <span>{errors.email? errors.email : ""}</span> 
                </div>
                <div>
                <label htmlFor="rating"> Rating </label>
                <hr/>
                <input className={errors.rating && style.error} type='text' value={form.rating} onChange={changeHandler} name='rating' />
                <br />
                <span>{errors.rating? errors.rating : ""}</span> 
                </div>
                <div>
                <label htmlFor="review"> Your Review </label>
                <hr/>
                <input className={errors.review && style.error} type='text' value={form.review} onChange={changeHandler} name='review' />
                <br />
                <span>{errors.review? errors.review : ""}</span> 
                </div>
                </div>
                <button type='submit'>Create</button>
            </form>
        </div>
</div>
 )
};

export default Form;