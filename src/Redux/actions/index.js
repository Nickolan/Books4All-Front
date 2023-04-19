import axios from "axios";
export const GET_BOOK_DETAIL = "GET_BOOK_DETAIL";
export const POST_REVIEW = "POST_REVIEW";
export const GET_BOOKS = "GET_BOOKS";
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
export const FILTER_BY_AUTHOR = "FILTER_BY_AUTHOR";
export const ALPHABETICAL_ORDER = "ALPHABETICAL_ORDER";
export const RESET_FILTERS = "RESET_FILTERS";
export const GET_IMAGES = "GET_IMAGES";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";

export const ADD_CART = "ADD_CART";
export const PRICE_OF_ALL_CART = "PRICE_OF_ALL_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";


export const getBookDetail = (bookId) => {
  return async function (dispatch) {
    var info = await axios.get(`http://localhost:3001/books/${bookId}`);
    return dispatch({
      type: GET_BOOK_DETAIL,
      payload: info.data,
    });
  };
};

export const getBooks = () => {
  return async function (dispatch) {
    const apiData = await axios.get("http://localhost:3001/books");
    console.log("action getBooks funcionando");
    return dispatch({ type: GET_BOOKS, payload: apiData.data });
  };
};

export const createReview = (payload) => {
  return async function (dispatch) {
    try {
      var info = await axios.post(`http://localhost:3001/reviews`, payload);
      console.log(info)
      return info;
    } catch (error) {
        console.log("Error del Create", error.message)
      throw new Error({ error: error.message });
    }
  };
};

export function getNameBooks(name) {
  try {
    return async function (dispatch) {
      var json = await axios.get(
        "http://localhost:3001/books/?queryBook=" + name
      );
      return dispatch({
        type: "GET_NAME_BOOKS",
        payload: json.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
}

export const filterByCategory = (category) => {
  return function (dispatch) {
    return dispatch({ type: FILTER_BY_CATEGORY, payload: category });
  };
};

export const filterByAuthor = (author) => {
  return { type: FILTER_BY_AUTHOR, payload: author };
};

export const alphabeticalOrder = (order) => {
  return { type: ALPHABETICAL_ORDER, payload: order };
};

export const resetFilters = () => {
  return { type: RESET_FILTERS };
};

export const getImages = () => {
  try {
    return async function (dispatch) {
      var json = await axios.get("http://localhost:3001/books");
      return dispatch({
        type: GET_IMAGES,
        payload: json.data,
      });
    };
  } catch (error) {
    console.log(error);
  }
};
export const addUser = (user) => {
  return {type: ADD_USER, payload: user}
}
export const deleteUser = () =>{
  return {type: DELETE_USER}
}


export const addToCart = (props) =>{
  return{
    type: ADD_CART,
    payload: props
  }
}
// export const priceOfAllCart = () =>{
//   return{
//     type: PRICE_OF_ALL_CART
//   }
// }
// export const removeFromCart = () =>{
//   return{
//     type: REMOVE_FROM_CART
//   }
// }

