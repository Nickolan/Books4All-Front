import { useState} from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import { createReview } from "../../Redux/actions";
import style from '../ReviewForm/ReviewFormPage.module.css'
import { useAuth0 } from "@auth0/auth0-react";

export const ReviewFormPage = ({id, handleShowReview, reviews}) =>{

const dispatch = useDispatch();

const navigate= useNavigate();
const { user, isAuthenticated } = useAuth0();


const [form, setForm] = useState({
  user_name: user.nickname,
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
  
  if (form.rating < 1 || form.rating > 5) {
    errors.rating = 'Rating must be between one and five stars';
  }

  setErrors(errors);
};

const submitHandler = (event) =>{




        let repeated = reviews.filter(rev => rev.user_name === form.user_name)
        if (repeated.length > 0) {
          event.preventDefault()
          alert('This user has already submitted a review.');
        } else {

          dispatch(createReview(form));
          let errorsArray = Object.keys(errors);
          console.log(errorsArray)
          errorsArray.length === 0? alert('Success! New Review created')
          : alert('Error! Please verify data');

          navigate( `/bookDetail/${id}`);

          handleShowReview()
    


        // setForm({
        // body: '',
        // book_id: '',
        // rating: '',
        // user_name: '',
        // });
    }
  }

 return(
<div className={style.mainContainer}>
        <div className={style.content}>
              <form onSubmit={submitHandler}>
                <div className={style.closeButtonContainer}>
                <img src="https://res.cloudinary.com/dvldakcin/image/upload/v1681711512/Countries/close_2_snehxr.png" alt='' className={style.closeButton} onClick={handleShowReview}/>
                </div>
                <div className='container-sm .bg-light'>
                <div className='container-sm .bg-light'>
               
                </div>
                <div className='container-sm .bg-light'> 
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
}

