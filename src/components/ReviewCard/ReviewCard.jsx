import style from '../ReviewCard/ReviewCard.module.css'

const ReviewCard = ({body, rating, user_name}) => {

    return (
        <div className={style.mainContainer}>
            <div className={style.userContainer}>
            <h1 className={style.user}>{user_name}</h1>
            <h2 className={style.rating}>Rating: {rating}/5</h2>
            </div>
            <div className={style.bodyContainer}>
            <p className={style.body}>{body}</p>
            </div>
        </div>
    )

}

export default ReviewCard;