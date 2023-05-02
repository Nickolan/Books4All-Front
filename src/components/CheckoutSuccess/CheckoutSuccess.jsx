import Footer from "../Footer/Footer";
import Navbar from "../NavBar/Navbar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCart, getEventType } from "../../Redux/actions";
import Confetti from 'react-confetti';

const CheckoutSuccess = ()=>{
    const dispatch = useDispatch();
    const[confetti, setConfetti]= useState(true)

    useEffect(() => {
         dispatch(deleteCart())
        dispatch(getEventType())
        setTimeout(()=>{
            setConfetti(false)
        },5000)
    }, [])

    return(
        <div className='container-xl '>

        <div className='container-xl '>
        <h2>Checkout Successful!</h2>
        {confetti && <Confetti/> }
        <h5>Your order might take some time to process.</h5>
        <h5>Check your order status at your profile after about 10 minutes.</h5>
        <h5>In case of any inqueries please contact us at </h5>
        <h5>books4allcustomersupport@books4all.com</h5>
        </div>
        </div>
    )
}

export default CheckoutSuccess;
