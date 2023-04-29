import axios from "axios"
import { useState } from "react"
import { getUserFromDb } from "../../Redux/actions"
import { useDispatch, useSelector } from "react-redux"



export const PostUser = (user, isAuthenticated, logout) => {
    const {dbUser} = useSelector(state => state)
    const dispatch = useDispatch()
    const [post, setPost] = useState(false)
    if(isAuthenticated && !post ){
        axios.post('/users', user)
        console.log('user');
        if(user){
            dispatch(getUserFromDb(user.nickname))}
        setPost(true)
        if (dbUser.active === false) {
            logout()
        }
    }
    if(!isAuthenticated && post){
        setPost(false)
    }
}