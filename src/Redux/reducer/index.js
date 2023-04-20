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
import { getCart } from "../actions/localStorage";

const initialState = {
  books: [],
  allBooks: [],
  reviews: [],
  images: [],
  bookDetail: [],
  cart: [] || getCart("cart"),
  filters: {
    category: "all",
    author: "all",
  },
  order: "",
  profile: {},
};

const filtrarLibros = (libros, genero, autor) => {
  return libros.filter((libro) => {
    if (genero === "all" && autor === "all") {
      return true;
    } else if (genero === "all" && autor !== "all") {
      return libro.authors?.includes(autor);
    } else if (genero !== "all" && autor === "all") {
      return libro.categories?.includes(genero);
    } else {
      return (
        libro.categories?.includes(genero) && libro.authors?.includes(autor)
      );
    }
  });
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
        books: filtrarLibros(
          state.allBooks,
          action.payload,
          state.filters.author
        ),
        filters: { ...state.filters, category: action.payload },
      };

    case FILTER_BY_AUTHOR:
      return {
        ...state,
        books: filtrarLibros(
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
      const isItem = state.cart.find(
        (item) => item.bookId === action.payload.bookId
      );
      const bookById = state.allBooks.find(
        (book) => book.id === action.payload.bookId
      );
      let addItem = {};
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
          quantity: action.payload.quantity,
        };
        addItem = newItem;
      } else {
        const updatedItem = {
          ...isItem,
          quantity: isItem.quantity + action.payload.quantity,
          subtotal: (
            (isItem.quantity + action.payload.quantity) *
            bookById.price
          ).toFixed(2),
        };
        addItem = updatedItem;
      }

      return {
        ...state,
        cart: [
          ...state.cart.filter((item) => item.bookId !== action.payload.bookId),
          addItem,
        ], // Filtramos el elemento antiguo y agregamos el nuevo
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
      const item = state.cart.find((item) => item.bookId === action.payload);
      const updatedItem = {
        ...item,
        quantity: item.quantity + 1,
        subtotal: ((item.quantity + 1) * item.price).toFixed(2),
      };
      let uptateItem = updatedItem;
      return {
        ...state,
        cart: [
          ...state.cart.filter((item) => item.bookId !== action.payload),
          uptateItem,
        ],
      };
    case DELETE_ONE_COPY:
      const item2 = state.cart.find((item) => item.bookId === action.payload);
      const updatedItem2 = {
        ...item2,
        quantity: item2.quantity - 1,
        subtotal: ((item2.quantity - 1) * item2.price).toFixed(2),
      };
      let uptateItem2 = updatedItem2;
      return {
        ...state,
        cart: [
          ...state.cart.filter((item) => item.bookId !== action.payload),
          uptateItem2,
        ],
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
