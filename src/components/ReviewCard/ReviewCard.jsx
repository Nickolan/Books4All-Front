import style from '../ReviewCard/ReviewCard.module.css'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import axios from 'axios';
import { AiFillStar } from 'react-icons/ai';

const ReviewCard = ({role, body, rating, user_name, id}) => {
    const dispatch = useDispatch();
    const handleDeleteReview = () => {
        axios.delete(`/admin/review/${id}`)
        .then(() => toast.success('Review deleted successfully'))
    }

    return (
        <div className={style.mainContainer}>
            <div>
            <div className={style.userContainer}>
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