import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview, getBookDetail, getUserFromDb } from "../../Redux/actions";
import style from '../ReviewForm/ReviewFormPage.module.css';
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarsRating from '../StarsRating/StarsRating'



export const ReviewFormPage = ({ id, setShowReview, showReview, reviews }) => {

  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();
  const dbUser = useSelector(state => state.dbUser);

  const [form, setForm] = useState({
    user_name: dbUser?.name,
    user_avatar: dbUser?.picture,
    body: '',
    book_id: id,
    rating: '',
  });

  const [errors, setErrors] = useState({
    body: '',
    rating: '',
  });


  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    validate({ ...form, [property]: value });
    setForm({ ...form, [property]: value });
  }

  const validate = (form) => {
    let errors = {};
    if (form.rating < 1 || form.rating > 5) {
      errors.rating = 'Rating must be between one and five stars';
    }
    setErrors(errors);
  };

  const submitHandler = (event) => {
    event.preventDefault();
   
    let repeated = reviews.filter(rev => rev.user_name === dbUser.name && rev.active === true)
    if (repeated.length > 0) {
      event.preventDefault()
      setShowReview(!showReview)
      toast.error('This user already sent a review')
      return
    }
    else if (Object.keys(errors).length) {
      toast.warning('fill in the missing fields to continue');
      return
    }

    dispatch(createReview(form))
      .then(() => setShowReview(!showReview))
      .then(() => toast.success('Review succesfully posted'))
      .then(() => {
        dispatch(getBookDetail(id))
      })

  }

  useEffect(() => {
    isAuthenticated && dispatch(getUserFromDb(user?.nickname))
  }, [])

  return (
    <div className={style.mainContainer}>
      <div className={style.content}>
        <form onSubmit={submitHandler}>
          <div className={style.closeButtonContainer}>
            <img src="https://res.cloudinary.com/dvldakcin/image/upload/v1681711512/Countries/close_2_snehxr.png" alt='' className={style.closeButton} onClick={() => setShowReview(!showReview)} />
          </div>
          <div className='container-sm .bg-light'>
            <div className='container-sm .bg-light'>

            </div>
            <div className='container-sm .bg-light'>
            </div>
            <div className='container-sm .bg-light'>
              <label htmlFor="rating" class="font-weight-bold"> Rating </label>
              <hr />
              {/* <input className={errors.rating && style.error} type='text' value={form.rating} onChange={changeHandler} name='rating' /> */}
              <StarsRating value={form.rating} className={errors.rating && style.error} onChange={changeHandler} name='rating' />
              <br />
              <span>{errors.rating ? errors.rating : ""}</span>
            </div>
            <div className='container-sm .bg-light'>
              {/* </div>
                <textarea class="form-control" aria-label="With textarea"></textarea>
                </div> */}
              <label htmlFor="body" class="font-weight-bold"> Review </label>
              <hr />
              <textarea placeholder='Your review...' type='text' value={form.body} onChange={changeHandler} name='body' />
              <br />
              <span>{errors.body ? errors.body : ""}</span>
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

