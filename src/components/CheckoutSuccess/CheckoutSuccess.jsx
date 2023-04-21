import Footer from "../Footer/Footer";
import Navbar from "../NavBar/Navbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteCart } from "../../Redux/actions";


const CheckoutSuccess = ()=>{
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(deleteCart())
    }, [])

    return(
        <div className='container-xl bg-white'>
        <Navbar/>
        <div className='container-xl bg-white'>
        <h2>Checkout Successful!</h2>
        <h5>Your order might take some time to process.</h5>
        <h5>Check your order status at your profile after about 10 minutes.</h5>
        <h5>In case of any inqueries please contact us at </h5>
        <h5>books4allcustomersupport@books4all.com</h5>
        </div>
        <Footer/>
        </div>
    )
}

export default CheckoutSuccess;
