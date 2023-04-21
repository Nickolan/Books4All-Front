import Navbar from "../../components/NavBar/Navbar";
import LoginButton from "../../components/LoginButton/LoginButton";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import Footer from "../../components/Footer/Footer";
import style from '../../components/ReviewForm/ReviewFormPage.module.css'
import { useAuth0 } from "@auth0/auth0-react";
import Widget from "../../components/Widget/Widget";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFromDb } from "../../Redux/actions";


export default function Auth(){

    const { isLoading, error, user, isAuthenticated } = useAuth0();

    const dispatch = useDispatch();

    const dbUser = useSelector(state=>state.dbUser);

    const [url, setUrl] = useState('');


    useEffect( ()=> {
            console.log('render')
            dispatch(getUserFromDb(user?.nickname))
    },[url])
 
        return(
            <div class="container">
            <Navbar/>
            <div class="row mt-5">
              <div class="col-md-4 offset-md-4">
                <div class="text-center">
                  <img src={dbUser?.picture} alt={`${dbUser?.name} picture`} class="rounded-circle img-thumbnail"  style={{ maxWidth: "100px", width: "100%", height: "auto" }}/>
                </div>
                  <div class='d-flex justify-content-center mt-3 mb-3'>
                <Widget setUrl={setUrl} url={url}/>
                  </div>
                <h1 class="text-center mt-3">{dbUser?.name}</h1>
                <div class='d-flex justify-content-center mt-3 mb-3'>
                    <LogoutButton/>
                </div>
              </div>
            </div>
  
            <Footer/>
          </div>
        )
    
}
