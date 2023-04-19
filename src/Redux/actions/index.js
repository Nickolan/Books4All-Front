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
export const DELETE_ARTICLE = "DELETE_ARTICLE";
export const DELETE_CART = "DELETE_CART";

export const getBookDetail = (bookId) => {
  return async function (dispatch) {
    var info = await axios.get(`/books/${bookId}`);
    return dispatch({
      type: GET_BOOK_DETAIL,
      payload: info.data,
    });
  };
};

export const getBooks = () => {
  return async function (dispatch) {
    const apiData = await axios.get("/books");
    console.log("action getBooks funcionando");
    return dispatch({ type: GET_BOOKS, payload: apiData.data });
  };
};

export const createReview = (payload) => {
  return async function (dispatch) {
    try {
      var info = await axios.post(`/reviews`, payload);
      console.log(info);
      return info;
    } catch (error) {
      console.log("Error del Create", error.message);
      throw new Error({ error: error.message });
    }
  };
};

export function getNameBooks(name) {
  try {
    return async function (dispatch) {
      var json = await axios.get("/books/?queryBook=" + name);
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
      var json = await axios.get("/books");
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
  return { type: ADD_USER, payload: user };
};
export const deleteUser = () => {
  return { type: DELETE_USER };
};

export const addToCart = (bookId) => {
  return { type: ADD_CART, payload: bookId };
};

export const deleteOneBook = (bookId) => {
  return { type: DELETE_ARTICLE, payload: bookId };
};

export const deleteCart = () => {
  return { type: DELETE_CART };
};
