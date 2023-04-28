import axios from "axios";
import { instance, url } from "../services/api";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux"

export const PayButton = () => {
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.dbUser);
    const { loginWithPopup, isAuthenticated } = useAuth0();

    const handleCheckout = () => {
        const bodyCart = {
            cart,
            userId: user.id,
        }
        console.log("my cart: ", bodyCart);
        instance.post(`${url}/create-checkout-session`, bodyCart).then((res) => {
            if (res.data.url) {
                window.location.href = res.data.url
            }
        }).catch((err) => console.log(err.message))
    }

    const handleUnauthorizedUser = () => {
        loginWithPopup()
    }

    return (
        isAuthenticated ?
            <button type="button" className="btn btn-dark" onClick={handleCheckout}>Checkout</button>
            :
            <button type="button" className="btn btn-dark" onClick={handleUnauthorizedUser}>Please Sign In to Buy</button>
    )
}