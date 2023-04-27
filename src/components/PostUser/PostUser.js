import axios from "axios"
import { useState } from "react"
import { getUserFromDb } from "../../Redux/actions"
import { useDispatch } from "react-redux"



export const PostUser = (user, isAuthenticated) => {
    const dispatch = useDispatch()
    const [post, setPost] = useState(false)
    if(isAuthenticated && !post ){
        axios.post('/users', user)
        if(user){
            dispatch(getUserFromDb(user.nickname))}
        setPost(true)
    }
    if(!isAuthenticated && post){
        setPost(false)
    }
}