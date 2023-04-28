import React, { useState, useEffect } from 'react';
import { alphabeticalOrder, filterByAuthor, resetFilters } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const Order = ({ setCurrentPage }) => {

    const [activeOrder, setActiveOrder] = useState("");
    const dispatch = useDispatch();
    const orderType = useSelector(state => state.order);
    
    const handleClickAlph = (event, order) => {
        setCurrentPage(1)
        setActiveOrder(order)
        dispatch(alphabeticalOrder(event.target.value))
        
    }

    const handleReset = () => {
        setCurrentPage(1)
        setActiveOrder("")
        dispatch(resetFilters())
    }

    useEffect(()=>{
        setActiveOrder(orderType)
    }, [])

    return (
        <div>
            <div class='d-flex mt-1 justify-content-center'>
                <span class='fw-bold mx-2'>ORDER BY NAME: </span>
                <div >
                <button class={`btn btn-sm btn-outline mx-1  ${activeOrder === "ascendente" ? "active" : ""}`} value="ascendente" onClick={(event) => handleClickAlph(event, "ascendente")} >A-Z</button>
                <button class={`btn btn-sm btn-outline mx-1 ${activeOrder === "descendente" ? "active" : ""}`} value="descendente" onClick={(event) => handleClickAlph(event, "descendente")} >Z-A</button>

                </div>
                {/* <button class='btn btn-transparent text-light'>Rating</button> */}
                {/* <button class='btn btn-transparent text-light'>author A-Z</button> */}
                <button class='btn btn-sm btn-outline-dark  bg-light' style={{marginLeft:'70px'}} onClick={handleReset}>RESET FILTERS</button>
            </div>
        </div>
    );
}

export default Order;
