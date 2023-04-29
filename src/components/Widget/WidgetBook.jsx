import { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import formStyle from '../UpdateBookForm/UpdateBookForm.module.css';
import { useSelector } from "react-redux";
import axios from "axios";

const WidgetBook = ({setUrl, url, bookImg, theme}) => {

    const { user, isAuthenticated } = useAuth0();
    const { bookDetail, role } = useSelector(state => state)

    const postBookPicture = async ( book, pictureUrl ) => {
        const response = await axios.put(`/books/updateBookPic/${book}`, {picture: pictureUrl})
        return 0;
    }

    
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
            if (result.event === 'success' && isAuthenticated && role === 'admin') {
                if(result.info.format !== "png" && result.info.format !== "jpg"){
                    toast.error('Invalid image format');
                    return 0;
                }
                
                postBookPicture(bookDetail[0].id, result.info.secure_url).then(() => setUrl(result.info.secure_url)).then(() => toast.success('Book pic successfully updated'))
                return 0;
            }
        })
    } , [])

    return (
        <div>
            <div>
                <img onClick={()=>widgetRef.current.open()} className={theme === 'dark' ? formStyle.bookImg : formStyle.lightBookImg} src={bookImg} alt="" />
            </div>
        </div>
    )

}

export default WidgetBook;