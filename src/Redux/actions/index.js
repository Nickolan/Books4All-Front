import axios from 'axios';
const GET_BOOK_DETAIL = "GET_BOOK_DETAIL";
const POST_REVIEW = "POST_REVIEW";

const getBookDetail= (bookId) =>{
    return async function (dispatch){
        var info = await axios.get(`http://localhost:3001/books/${bookId}`);
        return dispatch({
            type: GET_BOOK_DETAIL,
            payload: info.data
        })
    }
}



const postReview = (payload) =>{
    return async function (dispatch){
        try{var info = await axios.post(`http://localhost:3001/reviews`, payload);
        return info;
        }catch(error){
           throw new Error({error: error.message}) 
        };
    }};

export {getBookDetail, postReview, GET_BOOK_DETAIL, POST_REVIEW}