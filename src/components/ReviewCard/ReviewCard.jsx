import style from '../ReviewCard/ReviewCard.module.css'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Avatar, Box, Rating, Typography } from '@mui/material';

const ReviewCard = ({ role, body, rating, user_name, id, avatar }) => {
    const dispatch = useDispatch();
    const handleDeleteReview = () => {
        axios.delete(`/admin/review/${id}`)
            .then(() => toast.success('Review deleted successfully'))
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
                </div>
                <div className={style.bodyContainer}>
                   {body && <p className={style.body}><Typography variant="body1" fontStyle="italic">
                        "{body}"
                    </Typography></p>}
                </div>
            </div>
            {
                role.name === 'admin' && <div><button onClick={handleDeleteReview} class='btn btn-danger'>Delete Review</button></div>
            }
        </div>
    )
}

export default ReviewCard;