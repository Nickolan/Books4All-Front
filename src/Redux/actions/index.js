import axios from "axios";
import { instance } from "../../components/services/api";
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
export const ADD_ONE_COPY = "ADD_ONE_COPY";
export const DELETE_ONE_COPY = "DELETE_ONE_COPY";
export const CURRENT_USER = "CURRENT_USER";
export const SIDE_BAR = "SIDE_BAR";
export const CLOSE_SIDEBAR = "CLOSE_SIDEBAR";
export const GET_USERS = "GET_USERS";
export const GET_EVENT_TYPE = "GET_EVENT_TYPE";
export const GET_DELETED_BOOKS = "GET_DELETED_BOOKS";
export const CHANGE_THEME = "CHANGE_THEME";

export const getBookDetail = (bookId) => {
  return async function (dispatch) {
    const info = await axios.get(`/books/${bookId}`);
    return dispatch({
      type: GET_BOOK_DETAIL,
      payload: info.data,
    });
  };
};

export const getBooks = () => {
  return async function (dispatch) {
    const apiData = await axios.get("/books");
    return dispatch({ type: GET_BOOKS, payload: apiData.data });
  };
};

export const createReview = (payload) => {
  return async function (dispatch) {
    try {
      var info = await instance.post(`/reviews`, payload);
      return info;
    } catch (error) {
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

export const addOneCopy = (itemID) => {
  return { type: ADD_ONE_COPY, payload: itemID };
};

export const deleteOneCopy = (itemID) => {
  return { type: DELETE_ONE_COPY, payload: itemID };
};

export const getUserFromDb = (name) => {
  return async function (dispatch) {
    const response = await axios.get(`/users/${name}`);

    return dispatch({ type: CURRENT_USER, payload: response.data });
  };
};

export const sideBar = () => {
  return { type: SIDE_BAR };
};
export const sideBarClose = () => {
  return { type: CLOSE_SIDEBAR };
};
export const getUsers = () => {
  return async function (dispatch) {
    const apiData = await axios.get("/users");
    return dispatch({ type: GET_USERS, payload: apiData.data });
  };
};
export const getEventType = () => {
  try {
    return async function (dispatch) {
      const response = await axios.get(`/stripe/webhook`);
      return dispatch({ type: GET_EVENT_TYPE, payload: response.data });
    };
  } catch (error) {
    console.log(error);
  }
};

export const getDeletedBooks = () => {
  try {
    return async function (dispatch) {
      const response = await axios.get("/books/blocked");
      return dispatch({ type: GET_DELETED_BOOKS, payload: response.data });
    };
  } catch (error) {}
};

export const changeTheme = (theme) => {
  return { type: CHANGE_THEME, payload: theme };
};
