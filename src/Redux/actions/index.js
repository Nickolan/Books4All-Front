import axios from "axios";
export const GET_BOOK_DETAIL = "GET_BOOK_DETAIL";
export const POST_REVIEW = "POST_REVIEW";
export const GET_BOOKS = "GET_BOOKS";
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
export const FILTER_BY_AUTHOR = "FILTER_BY_AUTHOR";
export const RESET_FILTERS = "RESET_FILTERS";

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

export const postReview = (payload) => {
  return async function (dispatch) {
    try {
      var info = await axios.post(`http://localhost:3001/reviews`, payload);
      return info;
    } catch (error) {
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

export const resetFilters = () => {
  return { type: RESET_FILTERS };
};
