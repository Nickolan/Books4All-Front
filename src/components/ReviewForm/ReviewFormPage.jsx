import { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import style from "../Styles/Errors.module.css";
import { createReview } from "../../Redux/actions";


export const ReviewFormPage = ({eachBook, id}) =>{


const dispatch = useDispatch();

const navigate= useNavigate();

let reviews = eachBook[0].Reviews;

const [form, setForm] = useState({
        user_name: '',
        body: '',
        book_id: id,
        rating: '',
});

const [errors, setErrors] = useState({
        user_name: '',
        body: '',
        book_id: '',
        rating: '',
});

const changeHandler = (event) =>{
const property = event.target.name;
const value = event.target.value;
validate({...form, [property]:value});
setForm({...form, [property]:value});
console.log(reviews);
}

const validate = (form) => {
  let errors = {};
  
  if (!form.user_name) {
    errors.user_name = 'Please include your name or username';
  }

  if (!form.email) {
    errors.email = 'Please include your email';
  }

  if (form.rating < 1 || form.rating > 5) {
    errors.rating = 'Rating must be between one and five stars';
  }

  setErrors(errors);
};

const submitHandler = (event) =>{
    
        event.preventDefault();
        let finded = reviews.filter((review) => review.user_name === form.user_name);
        if (finded.length > 0) {
          alert('This user has already submitted a review.');
        } else {
          dispatch(createReview(form));
          let errorsArray = Object.keys(errors);
          console.log(errorsArray)
          errorsArray.length === 0? alert('Success! New Review created')
          : alert('Error! Please verify data');
          navigate("/");
        }

        // setForm({
        // body: '',
        // book_id: '',
        // rating: '',
        // user_name: '',
        // });
    }

 return(
<div className='container-xl bg-light'>
        <div>
              <form onSubmit={submitHandler}>
                <div>
                <h1 class="font-weight-bold">Create your own review!</h1>
                </div>
                <div className='container-sm .bg-light'>
                <div className='container-sm .bg-light'>
                <label htmlFor="user_name" class="font-weight-bold"> Your Name </label>
                <hr/>
                <input className={errors.user_name && style.error} type='text' value={form.user_name} onChange={changeHandler} name='user_name' />
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
                {/* </div>
                <textarea class="form-control" aria-label="With textarea"></textarea>
                </div> */}
                <label htmlFor="body" class="font-weight-bold"> Your Review </label>
                <hr/>
                <input type='text' value={form.body} onChange={changeHandler} name='body' />
                <br />
                <span>{errors.body? errors.body : ""}</span> 
                </div>
                </div>
                <br />
                <button type='submit' class="btn btn-lg btn-outline-dark">Create</button>
                <Link to='/books'><button class="btn btn-lg btn-outline-dark">Back</button></Link>
            </form>
        </div>
</div>
 )
};
