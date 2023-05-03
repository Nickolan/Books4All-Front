import React, { useState } from "react";
import style from "../ReviewForm/ReviewFormPage.module.css";
import StarsRating from "../StarsRating/StarsRating";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getBookDetail, getUserFromDb, getUserReview } from "../../Redux/actions";

export const ReviewEditForm = ({
  id,
  rating,
  body,
  setShowEditForm,
  showEditForm,
  bookId,
  userName
}) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    id: id,
    rating: rating,
    body: body,
  });

  const [errors, setErrors] = useState({
    rating: "",
  });
  const validate = (form) => {
    let errors = {};
    if (form.rating < 1 || form.rating > 5) {
      errors.rating = "Rating must be between one and five stars";
    }
    setErrors(errors);
  };
  const changeHandler = (event) => {
    validate({ ...form, [event.target.name]: event.target.value });
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .put(`/reviews`, form)
      .then(() => setShowEditForm(!showEditForm))
      .then(() => toast.success("Review succesfully Updated"))
      .then(() => {
        dispatch(getBookDetail(bookId))
      })
      .then(() => {
        dispatch(getUserReview(userName))
      });
  };
  return (
    <div className={style.mainContainer}>
      <div className={style.content}>
        <form onSubmit={submitHandler}>
          <div className={style.closeButtonContainer}>
            <img
              src="https://res.cloudinary.com/dvldakcin/image/upload/v1681711512/Countries/close_2_snehxr.png"
              alt=""
              className={style.closeButton}
              onClick={() => setShowEditForm(!showEditForm)}
            />
          </div>
          <div
          >
            <label htmlFor="rating" class="font-weight-bold">
              {" "}
              Rating{" "}
            </label>
            <hr />
              <StarsRating
                value={form.rating}
                className={errors.rating && style.error}
                onChange={changeHandler}
                name="rating"
              />
            
            <br />
            <span>{errors.rating ? errors.rating : ""}</span>
          </div>
          <div className="container-sm .bg-light">
            <label htmlFor="body" class="font-weight-bold">
              {" "}
              Review{" "}
            </label>
            <hr />
            <textarea
              placeholder="Your review..."
              type="text"
              value={form.body}
              onChange={changeHandler}
              name="body"
            />
            <br />
            <span>{errors.body ? errors.body : ""}</span>
          </div>
          <br />
          <div className={style.buttonContainer}>
            <button type="submit" className={style.sendButtton}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
