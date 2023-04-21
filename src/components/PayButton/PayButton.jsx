import axios from "axios";
// import { useSelector } from "react-redux";
import { instance, url } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";



export const PayButton = ({cart}) =>{
    // const user = useSelector((state)=> state.auth)
    const navigate= useNavigate();
    const { user, isAuthenticated } = useAuth0();



    const handleCheckout = () =>{

        console.log(cart);
            instance.post(`${url}/create-checkout-session`,{
                cart,
                // userId: user_id,
            }).then((res)=>{
                if(res.data.url){
                    window.location.href = res.data.url
                }
            }).catch((err)=> console.log(err.message))
    }

    const handleUnauthorizedUser = ()=>{
        return(
            <div class="alert alert-warning" role="alert">
            "Please Sign In to buy"
            </div>
        )
    }

    return(
        user?
        <button type = "button" className = "btn btn-primary" onClick={handleCheckout}>Checkout</button>
        :
        <button type = "button" className = "btn btn-primary disabled" onClick={handleUnauthorizedUser}>Please Sign In to Buy</button>
    )
}