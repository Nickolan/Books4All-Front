import axios from "axios";
// import { useSelector } from "react-redux";
import { instance, url } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { PostUser } from "../PostUser/PostUser";
import { useDispatch } from "react-redux"
import { deleteCart } from "../../Redux/actions";



export const PayButton = ({cart}) =>{
    // const user = useSelector((state)=> state.auth)
    const navigate= useNavigate();
    const { user, isAuthenticated, loginWithPopup } = useAuth0();
    const dispatch = useDispatch()

    PostUser(user, isAuthenticated)

    const handleCheckout = () =>{

        console.log(cart);
            instance.post(`${url}/create-checkout-session`,{
                cart,
                // userId: user_id,
            }).then((res)=>{
                if(res.data.url){
                   // dispatch(deleteCart())
                    window.location.href = res.data.url
                }
            }).catch((err)=> console.log(err.message))
    }

    const handleUnauthorizedUser = ()=>{
        loginWithPopup()
    }

    return(
        user?
        <button type = "button" className = "btn btn-dark" onClick={handleCheckout}>Checkout</button>
        :
        <button type = "button" className = "btn btn-dark " onClick={handleUnauthorizedUser}>Please Sign In to Buy</button>
    )
}