import {
  FILTER_BY_AUTHOR,
  FILTER_BY_CATEGORY,
  GET_BOOKS,
  GET_BOOK_DETAIL,
  RESET_FILTERS,
} from "../actions/index";

const initialState = {
  books: [],
  allBooks: [],
  reviews: [],
  bookDetail: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
        allBooks: action.payload,
      };
    case "GET_NAME_BOOKS":
      return {
        ...state,
        books: action.payload,
      };
    case GET_BOOK_DETAIL:
      return {
        ...state,
        bookDetail: action.payload,
      };

    //    case POST_REVIEW:
    //        return{
    //            ...state,
    //        }
    case FILTER_BY_CATEGORY:
      let array = [];

      state.allBooks.forEach((book) => {
        book.categories && array.push(book);
      });

      return {
        ...state,
        books: array.filter((el) => el.categories[0] === action.payload),
      };
    case FILTER_BY_AUTHOR:
      return {
        ...state,
        books: state.books.filter((book) =>
          book.authors?.includes(action.payload)
        ),
      };
    case RESET_FILTERS:
      return {
        ...state,
        books: state.allBooks,
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
