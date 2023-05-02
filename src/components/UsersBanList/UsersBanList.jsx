import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { getUsers } from "../../Redux/actions"
import { useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";

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

function UsersBanList({ inactiveUsers }) {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme);
    const [currentPage, setCurrentPage] = useState(1)
    const usersForPage = 5;
    const lastUser = currentPage * usersForPage;
    const firstUser = lastUser - usersForPage;
    const currentUsers = inactiveUsers.slice(firstUser, lastUser);
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(inactiveUsers.length / usersForPage); i++) {
        pageNumber.push(i)
    }

    const handleStateChange = (event) => {
        let name = event.target.value
        axios.put(`/admin/state/${name}`)
            .then(() => dispatch(getUsers()))
            .catch((error) => alert(error));
    }

    return (
        <div>
            <div class='d-flex justify-content-around'>
                <div>
                    <h1>Blocked USERS</h1>
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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="center">ID</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Role</StyledTableCell>
                            <StyledTableCell align="center">State</StyledTableCell>
                            <StyledTableCell align="center">Picture</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentUsers.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.id}</StyledTableCell>
                                <StyledTableCell align="right">{row.email}</StyledTableCell>
                                <StyledTableCell align="right">{row.Roles.at(-1).name}</StyledTableCell>
                                <StyledTableCell align="right">
                                    {row.active === false ? <button class="btn btn-danger" value={row.name} onClick={handleStateChange}>Inactive</button>
                                        : <button class="btn btn-success" value={row.name} onClick={handleStateChange}>Active</button>}
                                </StyledTableCell>
                                <StyledTableCell align="right"><img src={row.picture} alt="" style={{ width: '50px', height: '80px' }} /></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default UsersBanList