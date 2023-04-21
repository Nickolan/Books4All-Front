import { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { postPicture } from "../services/postPicture";

const Widget = ({setUrl, url}) => {

    const { user, isAuthenticated } = useAuth0();
    
    const cloudinaryRef = useRef();
    const widgetRef = useRef();


        useEffect(()=> {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dvldakcin',
            uploadPreset: 'tqpgy5op',
            multiple: false,
            styles: {
                palette: {
                    window: "#000000",
                    sourceBg: "#FFFFFF",
                    windowBorder: "#000000",
                    tabIcon: "#FFFFFF",
                    inactiveTabIcon: "#6A6A6A",
                    menuIcons: "#ffffff",
                    link: "#000000",
                    action: "#f7f6f6",
                    inProgress: "#000000",
                    complete: "#070505",
                    error: "#D91919",
                    textDark: "#ffffff",
                    textLight: "#fafafa"
                },
                fonts: {
                    default: null,
                    "'Poppins', sans-serif": {
                        url: "https://fonts.googleapis.com/css?family=Poppins",
                        active: true
                    }
                }
            }
            
        },  
        async (err, result)=> {
            console.log(result)
            if (result.event === 'success' && isAuthenticated) {
                await postPicture (user.nickname, result.info.secure_url);
                await setUrl(result.info.secure_url)
                return 0;
            }
        })
    } , [])

    return (
        
        <div>
            <button  type="button" class="btn btn-primary btn-dark" onClick={()=>widgetRef.current.open()}>Update Profile Pic</button>
        </div>
           
    )

}

export default Widget;
