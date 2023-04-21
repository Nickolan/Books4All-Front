import axios from "axios";
// import { useSelector } from "react-redux";
import { instance, url } from "../services/api";


export const PayButton = ({cart}) =>{
    // const user = useSelector((state)=> state.auth)

    const handleCheckout = () =>{
        console.log(cart);
            axios.post(`${url}/create-checkout-session`,{
                cart,
                // userId: user_id,
            }).then((res)=>{
                if(res.data.url){
                    window.location.href = res.data.url
                }
            }).catch((err)=> console.log(err.message))
    }
    return(
        <button onClick={()=> handleCheckout()}>Checkout</button>
    )
}