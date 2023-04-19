import Navbar from "../../components/NavBar/Navbar";
import LoginButton from "../../components/LoginButton/LoginButton";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import Profile from "../../components/Profile/Profile";
import Footer from "../../components/Footer/Footer";
import style from '../../components/ReviewForm/ReviewFormPage.module.css'
import { useAuth0 } from "@auth0/auth0-react";


export default function Auth(){
    const { isLoading, error } = useAuth0();


        return(
            <div class='container' >
                <Navbar />
                    <div className={style.content}></div>
                    <div class='container-sm' ></div>
                    <div class="row justify-content-center">
                    <div class="col-7">
                    <h1>Auth SignIn</h1>

                    {error && <p>Authentication Error</p>}
                    {!error && isLoading && <p>Loading...</p>}
                    {!error && !isLoading && (
                        <>
                        <LoginButton/>
                        <LogoutButton/>
                        <Profile />
                        </>
                    )}

                </div>
                </div>
                <Footer />
                </div>
        )
    
}
