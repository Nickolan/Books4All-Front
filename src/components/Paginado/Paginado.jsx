import React from 'react';
import style from './paginado.module.css'


const Paginado = ({ booksPerPage, numberBooks, setPage, currentPage, indexFirstBook, currentBooks }) => {

    const MaxPageNumbers = 5;
    const pageNumber = [];
    const totalPages = Math.ceil(numberBooks / booksPerPage);
    let startPage = 1;
    if (totalPages > MaxPageNumbers) {
        if (currentPage > MaxPageNumbers - 2) {
            startPage = currentPage - 2;
            if (currentPage > totalPages - MaxPageNumbers + 2) {
                startPage = totalPages - MaxPageNumbers + 1;
            }
        }
    }
    for (let i = startPage; i <= Math.min(totalPages, startPage + MaxPageNumbers - 1); i++) {
        pageNumber.push(i);
    }


    const renderPageNumbers = () => {
        let pageButtons = [];
        if (totalPages > 1) {
            pageButtons.push(
                <button
                    key="previous"
                    disabled={currentPage === 1}
                    onClick={() => setPage(currentPage - 1)}
                    class='btn btn-sm btn-outline-dark mx-1 fw-bold'
                >
                    &lt;
                </button>
            );
            for (let i = 0; i < pageNumber.length; i++) {
                const number = pageNumber[i];
                const isActive = currentPage === number;
                pageButtons.push(
                    <button
                        key={number}
                        className={isActive ? style.active : style.noActive}
                        onClick={() => setPage(number)}
                        class={`btn btn-sm btn-outline-dark mx-1 fw-bold ${isActive ? "active" : ""}`}
                    >
                        {number}
                    </button>
                );
            }
            pageButtons.push(
                <button
                    key="next"
                    disabled={currentPage === totalPages}
                    onClick={() => setPage(currentPage + 1)}
                    class='btn btn-sm btn-outline-dark mx-1 fw-bold'
                >
                    &gt;
                </button>
            );
        }
        return pageButtons;
    };

    return (
        <div class='mx-auto mt-1 d-flex flex-column align-items-center justify-content-center bg-light p-2 ' style={{ width: '900px', fontFamily:'Work Sans, sans-serif', color:'gray' }}>
            <div className={style.pagination} class=' bg-light'>{renderPageNumbers()}</div>
            <div class='d-flex mt-2 bg-light'>
                {numberBooks && <span className={style.showing}>showing {indexFirstBook + 1} - {indexFirstBook + currentBooks.length} from {numberBooks} books</span>}
              {totalPages > 1 ?  <span class='mx-4'>total pages: {totalPages}</span> : null}
            </div>
        </div>
    );
}

export default Paginado;  