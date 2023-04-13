// import { GET_BOOK_DETAIL, POST_REVIEW } from "./actions";

const initialState = {
    books: [],
    allBooks: [],
    reviews: [],
    bookDetail: []
};

const rootReducer = (state=initialState, action) =>{
    switch(action.type){
    //     case GET_BOOK_DETAIL:
    //        return{
    //            ...state,
    //            bookDetail:action.payload
    //        }

    //    case POST_REVIEW:
    //        return{
    //            ...state,
    //        }
        default:
            return{
                ...state,
            };
        };
    };

    export default rootReducer;