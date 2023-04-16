import { useState} from "react";
import { Link } from "react-router-dom";
// import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import style from "../Styles/Errors.module.css";
import { createReview } from "../../Redux/actions";

export const ReviewFormPage = () =>{
const eachBook = useSelector((state) => state.bookDetail)

const dispatch = useDispatch();

// const history= useHistory();

const [form, setForm] = useState({
        body: '',
        book_id: eachBook.id,
        rating: '',
        user_name: '',
});

const [errors, setErrors] = useState({
        book_id: '',
        rating: '',
        body: '',
        user_name:'',
});

const changeHandler = (event) =>{
const property = event.target.name;
const value = event.target.value;
validate({...form, [property]:value});
setForm({...form, [property]:value});
}

const validate = (form) => {
  let errors = {};
  
  if (!form.user_name) {
    errors.user_name = 'Please include your name or username';
  }

  if (!form.email) {
    errors.email = 'Please include your email';
  }

  if (form.rating < 1.0 || form.rating > 5.0) {
    errors.rating = 'Rating must be between one and five stars';
  }

  errors.body = "";

  setErrors(errors);
};

const submitHandler = (event) =>{
    
        event.preventDefault();
        dispatch(createReview(form));
        let errorsArray = Object.keys(errors);
        errorsArray.length === 0? alert('Success! New Review created')
        : alert('Error! Please verify data');

        // setForm({
        // body: '',
        // book_id: '',
        // rating: '',
        // user_name: '',
        // });

        console.log(form)

        setTimeout(() => {
        // history.push('/');
        }, 2000)
    }

 return(
          <div>
              <form onSubmit={submitHandler}>
                <div class="card-header">
                  <h1 class="card-title text-center">Create your own Review!</h1>
                </div>
                <div className='container-sm .bg-light'>
                <label htmlFor="user_name" class="font-weight-bold"> Your Name </label>
                <hr/>
                <input className={errors.name && style.error} type='text' value={form.user_name} onChange={changeHandler} name='user_name' />
                <br />
                <span>{errors.user_name? errors.user_name : ""}</span> 
                </div>
                <div className='container-sm .bg-light'> 
                <label htmlFor="email" class="font-weight-bold"> Your email address </label>
                <hr/>
                <input className={errors.email && style.error} type='text' value={form.email} onChange={changeHandler} name='email' />
                <br />
                <span>{errors.email? errors.email : ""}</span> 
                </div>
                <div className='container-sm .bg-light'>
                <label htmlFor="rating" class="font-weight-bold"> Rating </label>
                <hr/>
                <input className={errors.rating && style.error} type='text' value={form.rating} onChange={changeHandler} name='rating' />
                <br />
                <span>{errors.rating? errors.rating : ""}</span> 
                </div>
                <hr/>
                <br />
                <div className='container-sm .bg-light'>
                <label htmlFor="body" class="font-weight-bold"> Your Review </label>
                <hr/>
                <textarea className={errors.body && style.error} type='text' value={form.body} onChange={changeHandler} name='body' />
                <br />
                <span>{errors.body? errors.body : ""}</span> 
                </div>
                <br />
                <button type='submit' class="btn btn-lg btn-outline-dark">Create</button>
                <Link to='/books'><button class="btn btn-lg btn-outline-dark">Back</button></Link>
            </form>
          </div>
          )
        };
