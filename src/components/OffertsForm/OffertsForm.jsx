import { useState } from "react";

function OffertsForm ({bookDiscount, setShowOffert}){

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

    return(
        <div>
            <h1>Block de offertas</h1>
            <form action="">
                <input type="text" disabled value={bookDiscount} />
                <input type="number" name="discount" onChange={handleChange} value={offertForm.discount}/>
            </form>
            <h2 onClick={hideOffertForm}>x</h2>
        </div>
    )
}

export default OffertsForm;