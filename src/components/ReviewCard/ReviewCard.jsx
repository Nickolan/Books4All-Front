import style from '../ReviewCard/ReviewCard.module.css'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Avatar, Box, Rating, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import {MdOutlineModeEdit} from "react-icons/md"
import { useState } from 'react';
import { ReviewEditForm } from '../ReviewEditForm/ReviewEditForm';

const ReviewCard = ({ role, body, rating, user_name, id, avatar, user_nickname, bookId }) => {
    const dispatch = useDispatch();
    const [showEditForm, setShowEditForm] = useState(false)
    const handleDeleteReview = () => {
        axios.delete(`/admin/review/${id}`)
            .then(() => toast.success('Review deleted successfully'))
    }
    const handleChange = (e) =>{
        e.preventDefault()
        setShowEditForm(true)
    }

    return (
        <div className={style.mainContainer}>
            <div>
            
                <div className={style.userContainer}>
                    <Box sx={{ display: 'flex' }}>
                        <Avatar
                            alt={user_name}
                            src={avatar}
                            sx={{ width: 30, height: 30, marginRight: 1 }}
                        />
                        <h1 className={style.user}>{user_name}</h1>
                        <Rating name="read-only" value={rating} readOnly />
                        
                    </Box>
                    <div >
                        {user_nickname === user_name? <button onClick={handleChange} style={{marginLeft: "5px", border: 'none', backgroundColor: 'transparent' }}> <MdOutlineModeEdit  /> </button> : null}
                        </div>
                </div>
                <div className={style.bodyContainer}>
                   {body && <p className={style.body}><Typography variant="body1" fontStyle="italic">
                        "{body}"
                    </Typography></p>}
                </div>
                {showEditForm && <ReviewEditForm setShowEditForm={setShowEditForm} showEditForm={showEditForm} id={id} rating={rating} body={body} bookId={bookId} />}
            </div>
            {
                role.name === 'admin' && <div><button onClick={handleDeleteReview} class='btn btn-danger'>Delete Review</button></div>
            }
        </div>
    )
}

export default ReviewCard;