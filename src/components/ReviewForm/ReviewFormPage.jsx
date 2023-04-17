import { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import { createReview } from "../../Redux/actions";
import style from '../ReviewForm/ReviewFormPage.module.css'

export const ReviewFormPage = ({id, handleShowReview}) =>{

const dispatch = useDispatch();

const navigate= useNavigate();

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

          dispatch(createReview(form));
          let errorsArray = Object.keys(errors);
          console.log(errorsArray)
          errorsArray.length === 0? alert('Success! New Review created')
          : alert('Error! Please verify data');
          navigate("/");
  
        // setForm({
        // body: '',
        // book_id: '',
        // rating: '',
        // user_name: '',
        // });
    }

 return(
<div className={style.mainContainer}>
        <div className={style.content}>
              <form onSubmit={submitHandler}>
                <div className={style.closeButtonContainer}>
                <img src="https://res.cloudinary.com/dvldakcin/image/upload/v1681711512/Countries/close_2_snehxr.png" className={style.closeButton} onClick={handleShowReview}/>
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
                <br/>
                <span>{errors.rating? errors.rating : ""}</span> 
                </div>
                <div className='container-sm .bg-light'>
                {/* </div>
                <textarea class="form-control" aria-label="With textarea"></textarea>
                </div> */}
                <label htmlFor="body" class="font-weight-bold"> Review </label>
                <hr/>
                <textarea placeholder='Your review...' type='text' value={form.body} onChange={changeHandler} name='body' />
                <br />
                <span>{errors.body? errors.body : ""}</span> 
                </div>
                </div>
                <br />
                <div className={style.buttonContainer}>
                <button type='submit' className={style.sendButtton}>Create</button>
                </div>
            </form>
        </div>
</div>
 )
};
