import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    const active = () => {
        loginWithRedirect()
    }
    return (
        !isAuthenticated && (
            <button onClick={() => loginWithRedirect()}>
                Sign In
            </button>
        )
    )
}

export default LoginButton;