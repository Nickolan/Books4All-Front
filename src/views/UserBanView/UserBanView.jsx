import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export default function UserBanView() {
    const { user, logout, isAuthenticated } = useAuth0()
    const theme = useSelector(state => state.theme)

    return (
        <div class='container d-flex justify-content-center flex-column'>
            <div>
                <h1>I'm Sorry, but This Account is currently Banned</h1>
            </div>
            <div>
                <h2>Please, press LogOut to continue</h2>
            </div>
            <div >
            {
                theme === 'dark' ? <img style={{ width: '35em', height: 'auto' }} src="https://cdn-icons-png.flaticon.com/512/51/51230.png" class='bg-white p-3' alt="" /> : <img src="https://cdn-icons-png.flaticon.com/512/51/51230.png" alt="" />
            }
            </div>
            <div>
                <button onClick={() => logout()} class='btn btn-danger'>LogOut</button>
            </div>
        </div>  
    )
}