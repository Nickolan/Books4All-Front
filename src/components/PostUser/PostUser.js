import axios from "axios"
import { useState } from "react"

export const PostUser = (user, isAuthenticated) => {
    const [post, setPost] = useState(false)
    if(isAuthenticated && !post ){
        axios.post('http://localhost:3001/users', user)
        setPost(true)
    }
    if(!isAuthenticated && post){
        setPost(false)
    }
}