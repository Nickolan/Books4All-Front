import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <button   title="Sign In" class='btn btn-primary btn-light p-1 mt-1' onClick={() => loginWithRedirect()}>
                Sign In
            </button>
        )
    )
}

export default LoginButton;