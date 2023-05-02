import style from '../ReviewCard/ReviewCard.module.css'
import { toast } from 'react-toastify';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

const ReviewCard = ({role, body, rating, user_name, id, picture}) => {

    const handleDeleteReview = () => {
        axios.delete(`/admin/review/${id}`)
        .then(() => toast.success('Review deleted successfully'))
    }

    return (
        <div className={style.mainContainer}>
            <div>
            <div className={style.userContainer}>
            <Link to={`/users/${user_name}`}><Avatar src={picture} style={{ margin: 'auto', width: 30, height: 30}} alt=""/></Link>
            <h1 className={style.user}>{user_name}</h1>
            <h2 className={style.rating}>Rating: {rating}<AiFillStar color='#ffc107' style={{ marginBottom: 3 }}/></h2>
            </div>
            <div className={style.bodyContainer}>
            <p className={style.body}>{body}</p>
            </div>
            </div>
            {
               role.name === 'admin' && <div><button onClick={handleDeleteReview} class='btn btn-danger'>Delete Review</button></div>
            }
        </div>
    )
}

export default ReviewCard;