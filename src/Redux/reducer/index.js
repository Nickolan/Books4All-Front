import { GET_BOOKS, GET_BOOK_DETAIL } from "../actions/index";

const initialState = {
    books: [],
    allBooks: [],
    reviews: [],
    bookDetail: []
};

const rootReducer = (state=initialState, action) =>{
    switch(action.type){
        case GET_BOOKS:
            return{
                ...state,
                books: action.payload,
                allBooks: action.payload
            }
            case 'GET_NAME_BOOKS':
                return {
                    ...state,
                    books: action.payload
                }
        case GET_BOOK_DETAIL:
           return{
               ...state,
               bookDetail:action.payload
           }

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