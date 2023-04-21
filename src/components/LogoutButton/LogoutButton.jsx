import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();
    return (
        isAuthenticated && (
            <button type="button" class="btn btn-primary btn-danger" onClick={() => logout()}>
                Log Out
            </button>
        )
    )
}

export default LogoutButton;