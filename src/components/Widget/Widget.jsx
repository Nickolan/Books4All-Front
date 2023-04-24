import { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { postPicture } from "../services/postPicture";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            if(err){
                toast.error('Something went wrong, try uploading a new image');
                return 0;
            }
            if (result.event === 'success' && isAuthenticated) {
                if(result.info.format !== "png" && result.info.format !== "jpg"){
                    toast.error('Invalid image format');
                    return 0;
                }
                 postPicture (user.nickname, result.info.secure_url).then(response => setUrl(result.info.secure_url)).then(response => toast.success('Profile pic successfully updated'))
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
