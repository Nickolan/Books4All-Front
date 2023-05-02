import { useState } from "react";
import { resultDiscount } from "../BooksList/Discount";

function OffertsForm ({bookDiscount, setShowOffert, bookDetail}){

    const [offertForm, setOffertForm] = useState({
        book: bookDiscount,
        discount: 0,
    })

    const hideOffertForm = () => {
        setShowOffert(false)
    }
    const handleChange = (event) => {
        setOffertForm({
            ...offertForm,
            discount: event.target.value
        })
        console.log(offertForm);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const total = resultDiscount(offertForm.discount, bookDetail[0].price)
        console.log(total);
    }

    return(
        <div>
            <h1>Block de offertas</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" disabled value={bookDiscount} />
                <input type="number" name="discount" onChange={handleChange} value={offertForm.discount}/>
                <button type="submit">Apply Discount</button>
            </form>
            <h2 onClick={hideOffertForm}>x</h2>
        </div>
    )
}

export default OffertsForm;