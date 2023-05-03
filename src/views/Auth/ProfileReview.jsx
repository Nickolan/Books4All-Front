import { getUserReview } from "../../Redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import UserReviewCard from "./UserReviewCard";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Loader } from "../../components/Loader/Loader";



export default function ProfileReview({dbUser}){

    const dispatch = useDispatch();
    const userReviews = useSelector(state => state.userReviews);
    const [loader, setLoader]= useState(false)  
    useEffect(()=>{
        dispatch(getUserReview(dbUser.name))
        setLoader(true)
      setTimeout(()=>{
        if(userReviews){
          setLoader(false)
        }
      },200)
    }, []);
    
    return (
        <>
        {loader && <Loader/>}
        <h3>My Reviews</h3>
          {userReviews?.length > 0 ? (
            userReviews.map((userReview) => (
              <UserReviewCard
                key={userReview.id} 
                id={userReview.id}
                body={userReview.body}
                rating={userReview.rating}
                user_name={userReview.user_name}
                book={userReview.Book}
              />
            ))
          ) : (
            <div>
                <h4>You haven't write a review yet? It's time to share with everyone your excellent taste! </h4>
                <Button variant='contained'><Link style={{ textDecoration: "none", color: 'white' }} to={`/books`}>Books</Link></Button>
            </div>
          )}
        </>
      );
}