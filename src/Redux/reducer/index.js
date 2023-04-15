import { FILTER_BY_AUTHOR, FILTER_BY_CATEGORY, GET_BOOKS, GET_BOOK_DETAIL } from "../actions/index";

const initialState = {
    books: [],
    allBooks: [],
    reviews: [],
    bookDetail: [],
    filters: {
        category: 'all',
        author: 'all'
    }
};

const filtrarLibros = (libros, genero, autor) => {
    return libros.filter(libro => {
        if (genero === 'all' && autor === 'all') {
            return true;
        } else if (genero === 'all' && autor !== 'all') {
            return libro.authors?.includes(autor);
        } else if (genero !== 'all' && autor === 'all') {
            return libro.categories?.includes(genero);
        } else {
            return libro.categories?.includes(genero) && libro.authors?.includes(autor);
       }
    })
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BOOKS:
            return {
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
            return {
                ...state,
                bookDetail: action.payload
            }

        //    case POST_REVIEW:
        //        return{
        //            ...state,
        //        }
        // case FILTER_BY_CATEGORY:

        //     let array = [];

        //     state.allBooks.forEach(book => {
        //         book.categories && array.push(book)
        //     })

        //     return {
        //         ...state,
        //         books: array.filter(el => el.categories[0] === action.payload),
        //         category: action.payload,
        //         filters: { ...state.filters, category: action.payload }
        //     }
        // case FILTER_BY_AUTHOR:

        //     return {
        //         ...state,
        //         books: state.books.filter(book => book.authors?.includes(action.payload)),
        //         author: action.payload,
        //         filters: { ...state.filters, author: action.payload }
        //     }

        case FILTER_BY_CATEGORY:


            return {
                ...state,
                books: filtrarLibros(state.allBooks, action.payload, state.filters.author),
                filters: { ...state.filters, category: action.payload }
            }
        case FILTER_BY_AUTHOR:

            return {
                ...state,
                books: filtrarLibros(state.allBooks, state.filters.category, action.payload),

                filters: { ...state.filters, author: action.payload }
            }
        default:
            return {
                ...state,
            };
    };
};

export default rootReducer;