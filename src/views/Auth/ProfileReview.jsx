import { getUserReview } from "../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import UserReviewCard from "./UserReviewCard";




export default function ProfileReview({dbUser}){

    const dispatch = useDispatch();
    const userReviews = useSelector(state => state.userReviews);
    useEffect(()=>{
        dispatch(getUserReview(dbUser.name))
    }, []);
    
    return(
        <>
        {userReviews?.map(userReview=>{
            return(
                <UserReviewCard body={userReview.body} rating={userReview.rating} book={userReview.Book}/>
            )
        })}
        </>
    )
}