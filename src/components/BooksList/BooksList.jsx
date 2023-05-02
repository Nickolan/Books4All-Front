import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getBooks, getDeletedBooks } from "../../Redux/actions";
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from "@mui/material";
import { Table } from "react-bootstrap";
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));




function BooksList({ books, setShowOffert, setBookDiscount }) {
    const dispatch = useDispatch()
    const theme = useSelector(state => state.theme);
    const [currentPage, setCurrentPage] = useState(1)
    const booksForPage = 10;
    const lastBook = currentPage * booksForPage;
    const firstBook = lastBook - booksForPage;
    const currentBooks = books.slice(firstBook, lastBook);
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(books.length / booksForPage); i++) {
        pageNumber.push(i)
    }

    const handleStateChange = (event) => {
        let title = event.target.value
        axios.put(`/admin/booksState/${title}`)
            .then(() => dispatch(getBooks()))
            .then(() => dispatch(getDeletedBooks()))
    }

    const showBookOfferts = (title) => {
        setShowOffert(true)
        setBookDiscount(title)
        console.log(title);
    }

    return (
        <div>
            <div class='d-flex justify-content-around'>
                <div>
                    <h1>BOOKS</h1>
                </div>
                <div class='border border-3 d-flex'>
                    <div>
                        <button
                            key="previous"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            class={theme === 'light' ? 'btn btn-sm btn-outline-dark mx-1 fw-bold' : 'btn btn-sm btn-outline-light mx-1 fw-bold'}
                        >
                            &lt;
                        </button>
                    </div>
                    <div>
                        <button
                            key="next"
                            disabled={currentPage === pageNumber.at(-1)}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            class={theme === 'light' ? 'btn btn-sm btn-outline-dark mx-1 fw-bold' : 'btn btn-sm btn-outline-light mx-1 fw-bold'}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
            {/* <div class="border border-2 border-dark d-flex flex-row justify-content-around">
                <div>
                    <h3>Title</h3>
                </div>
                <div>
                    <h3>ID</h3>
                </div>
                <div>
                    <h3>Author</h3>
                </div>
                <div>
                    <h3>Price</h3>
                </div>
                <div>
                    <h3>Stock</h3>
                </div>
                <div>
                    <h3>Picture</h3>
                </div>
                <div>
                    <h3>State</h3>
                </div>
            </div>
            <div >
                {currentBooks.map((book) => {
                    return (
                        <div className="border border-2 border-dark d-flex flex-row justify-content-around">
                            <div>
                                <h4>{book.title}</h4>
                            </div>
                            <div>
                                <h4>{book.id}</h4>
                            </div>
                            <div>
                                <h4>{book.authors}</h4>
                            </div>
                            <div>
                                <h4>${book.price}</h4>
                            </div>
                            <div>
                                <h4>{book.stock}</h4>
                            </div>
                            <div>
                                <img src={book.image} alt="" />
                            </div>

                            <div class='d-flex justify-content-around flex-column'>
                                <div>
                                    {book.active === false ? <button class="btn btn-danger" onClick={handleStateChange} value={book.title} >Inactive</button>
                                        : <button class="btn btn-success" onClick={handleStateChange} value={book.title} >Active</button>}
                                </div>
                                <div>
                                    <Link to={`/bookDetail/${book.id}`}>
                                        <button class=' btn btn-info'>Details</button>
                                    </Link>
                                </div>
                                <div>
                                    <button onClick={() => showBookOfferts(book.title)} class='btn btn-secondary'>Add Discount</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div> */}

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell align="right">ID</StyledTableCell>
                            <StyledTableCell align="right">Authors</StyledTableCell>
                            <StyledTableCell align="right">Price</StyledTableCell>
                            <StyledTableCell align="right">Stock</StyledTableCell>
                            <StyledTableCell align="right">Picture</StyledTableCell>
                            <StyledTableCell align="center">State</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentBooks.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.title}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.id}</StyledTableCell>
                                <StyledTableCell align="right">{row.authors}</StyledTableCell>
                                <StyledTableCell align="right">{row.price}</StyledTableCell>
                                <StyledTableCell align="right">{row.stock}</StyledTableCell>
                                <StyledTableCell align="right"><img src={row.image} alt="" style={{ width: '50px', height: '80px' }} /></StyledTableCell>
                                <StyledTableCell align="center">
                                    <div class='d-flex justify-content-around flex-column'>
                                        <div>
                                            {row.active === false ? <button class="btn btn-danger" onClick={handleStateChange} value={row.title} >Inactive</button>
                                                : <button class="btn btn-success" onClick={handleStateChange} value={row.title} >Active</button>}
                                        </div>
                                        <div>
                                            <Link to={`/bookDetail/${row.id}`}>
                                                <button class=' btn btn-info'>Details</button>
                                            </Link>
                                        </div>
                                        {/* <div>
                                            <button onClick={() => showBookOfferts(row.title)} class='btn btn-secondary'>Add Discount</button>
                                        </div> */}
                                    </div>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

export default BooksList;