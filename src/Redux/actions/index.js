import axios from 'axios';
export const GET_BOOK_DETAIL = "GET_BOOK_DETAIL";
export const POST_REVIEW = "POST_REVIEW";
export const GET_BOOKS = "GET_BOOKS";

// export const getBookDetail= (bookId) =>{
//     return async function (dispatch){
//         var info = await axios.get(`http://localhost:3001/books/${bookId}`);
//         return dispatch({
//             type: GET_BOOK_DETAIL,
//             payload: info.data
//         })
//     }
// }

export const getBooks = () => {
    return async function (dispatch){
        const apiData = await axios.get('http://localhost:3001/books');
        console.log('action getBooks funcionando');
        return dispatch({type: GET_BOOKS, payload: apiData.data})
    }
};



export const postReview = (payload) =>{
    return async function (dispatch){
        try{var info = await axios.post(`http://localhost:3001/reviews`, payload);
        return info;
        }catch(error){
           throw new Error({error: error.message}) 
        };
    }};
