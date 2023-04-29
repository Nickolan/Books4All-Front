import { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { updateProfile } from "../services/updateProfile";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@mui/material";

const Widget = ({ updatedUser, setUpdatedUser}) => {

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
                setUpdatedUser({
                    ...updatedUser,
                    picture: result.info.secure_url,
                })
            }
        })
    } , [])

    return (
        
        <div>
        <Button variant="outlined" size="small" color="primary" onClick={()=>widgetRef.current.open()}> Upload</Button>
        </div>
           
    )

}

export default Widget;
