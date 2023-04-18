import React, { useState } from "react";
import axios from "axios";
import {loadStripe} from '@stripe/stripe-js';
import {Elements, CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import "bootswatch/dist/lux/bootstrap.min.css";


const stripePublishableKey = "pk_test_51Mu08BJCQwXBtQNrqLzeWiL1POYmm5isxdNNZIxSmByIDTrciJbAKnbh3KL1dJUM2TDpgXG66xZ2T61rNPmi96vq00K5LibWPf";
const stripePromise = loadStripe(stripePublishableKey, {
  stripeAccount: "acct_...",
  apiVersion: "2020-08-27",
  betas: ["checkout_beta_4"],
  locale: "auto",
});

const CheckoutForm = () =>{

    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })
        setLoading(true);

        if(!error){
            console.log(paymentMethod);
            const {id} = paymentMethod;
            try{

            const {data} = await axios.post('http://localhost:3001/api/checkout', {
                id,
                //amount in cents - price*100
                amount: 1000
            })
            console.log(data);
                elements.getElement(CardElement).clear();
        }catch(error){
                console.log(error)
                setLoading(false)
            }
        }}


    return <form onSubmit={handleSubmit} className="card card-body">
        <img src="http://books.google.com/books/content?id=FOHtDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api" alt="" className="img-fluid"/>

        <h3 className="text-center my-2">Price: $10</h3>

        <div className="form-group">
        <CardElement className="form-control" />
        </div>

        <button className="btn btn-outline-dark">
            {loading ? (
            <div className="spinner-border text-secondary" role="status">
                <span className="sr-only"></span>
                </div>
            ): 
            "Buy"
            }
        </button>
    </form>
}

export default function PaymentMethod(){

    return(
        <div className='container-xl bg-white'>
            <h5>Payment Method Component</h5>
            <Elements stripe={stripePromise}>
                <div className="container p-4">
                    <div className="row">
                        <div className="col-md-4 offset-md-4">
                            <CheckoutForm />
                        </div>
                    </div>
                </div>
           </Elements>
           </div>
    )
}