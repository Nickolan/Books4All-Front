import {
  FILTER_BY_AUTHOR,
  FILTER_BY_CATEGORY,
  GET_BOOKS,
  GET_IMAGES,
  GET_BOOK_DETAIL,
  ALPHABETICAL_ORDER,
  RESET_FILTERS,
  CREATE_REVIEW,
} from "../actions/index";

const initialState = {
  books: [],
  allBooks: [],
  reviews: [],
  images: [],
  bookDetail: [],
  filters: {
    category: "all",
    author: "all",
  },
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

       case CREATE_REVIEW:
           return{
               ...state,
           }
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
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
