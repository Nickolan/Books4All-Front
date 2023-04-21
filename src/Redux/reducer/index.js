import {
  FILTER_BY_AUTHOR,
  FILTER_BY_CATEGORY,
  GET_BOOKS,
  GET_IMAGES,
  GET_BOOK_DETAIL,
  ALPHABETICAL_ORDER,
  RESET_FILTERS,
  ADD_USER,
  DELETE_USER,
  ADD_CART,
  DELETE_ARTICLE,
  DELETE_CART,
  ADD_ONE_COPY,
  DELETE_ONE_COPY,
} from "../actions";
import combinatedFilters from "./utils/combinatedFilters";
import { persistedCart } from "./utils/localStorageCart";

const initialState = {
  books: [],
  allBooks: [],
  reviews: [],
  images: [],
  bookDetail: [],
  cart: persistedCart,
  filters: {
    category: "all",
    author: "all",
  },
  order: "",
  profile: {},
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
        allBooks: action.payload,
      };
    case GET_BOOK_DETAIL:
      return {
        ...state,
        bookDetail: action.payload,
      };

    case FILTER_BY_CATEGORY:
      return {
        ...state,
        books: combinatedFilters(
          state.allBooks,
          action.payload,
          state.filters.author
        ),
        filters: { ...state.filters, category: action.payload },
      };

    case FILTER_BY_AUTHOR:
      return {
        ...state,
        books: combinatedFilters(
          state.allBooks,
          state.filters.category,
          action.payload
        ),

        filters: { ...state.filters, author: action.payload },
      };

    case ALPHABETICAL_ORDER:
      return {
        ...state,
        books: [...state.books].sort((a, b) =>
          action.payload === "ascendente"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        ),
        order: action.payload,
      };
    case GET_IMAGES:
      return {
        ...state,
        images: action.payload,
      };
    case RESET_FILTERS:
      return {
        ...state,
        books: state.allBooks,
        filters: { category: "all", author: "all" },
      };
    case ADD_USER: {
      return {
        ...state,
        profile: action.payload,
      };
    }
    case DELETE_USER: {
      return {
        ...state,
        profile: {},
      };
    }
    case ADD_CART: {
      const isItem = state.cart.find(item => item.bookId === action.payload.bookId);
      const index1 = state.cart.indexOf(isItem);
      const bookById = state.allBooks.find(book => book.id === action.payload.bookId)
      let newCart1 = {}
      if (!isItem) {
        const newItem = {
          id: action.payload.id,
          bookId: action.payload.bookId,
          title: bookById.title,
          categories: bookById.categories,
          author: bookById.authors,
          image: bookById.image,
          price: bookById.price,
          subtotal: (bookById.price * action.payload.quantity).toFixed(2),
          quantity: action.payload.quantity
        }

        newCart1 = [...state.cart, newItem];
     
      } else {
        const updatedItem = {
          ...isItem,
          quantity: isItem.quantity + action.payload.quantity,
          subtotal: ((isItem.quantity + action.payload.quantity) * bookById.price).toFixed(2)
        }
        newCart1 = [...state.cart];
        newCart1[index1] = updatedItem
      }

      return {
        ...state,
        cart: newCart1, // Filtramos el elemento antiguo y agregamos el nuevo
      };
    }


    case DELETE_ARTICLE: {
      return {
        ...state,
        cart: state.cart.filter((product) => {
          return product.id !== action.payload;
        }),
      };
    }
    case DELETE_CART: {
      return { ...state, cart: [] };
    }

    case ADD_ONE_COPY:
      const item = state.cart.find(item => item.bookId === action.payload);
      const index = state.cart.indexOf(item);
      const updatedItem = {
        ...item,
        quantity: item.quantity + 1,
        subtotal: ((item.quantity + 1) * item.price).toFixed(2)
      }
      const newCart = [...state.cart];
      newCart[index] = updatedItem
      return {
        ...state,
        cart: newCart
      }
    case DELETE_ONE_COPY:
      const item2 = state.cart.find(item => item.bookId === action.payload)
      const index2 = state.cart.indexOf(item2);
      const updatedItem2 = {
        ...item2,
        quantity: item2.quantity - 1,
        subtotal: ((item2.quantity - 1) * item2.price).toFixed(2)
      }
      const newCart2 = [...state.cart];
      newCart2[index2] = updatedItem2
      return {
        ...state,
        cart: newCart2
      }

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
