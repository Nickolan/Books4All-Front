
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { getUserFromDb } from "../../Redux/actions"



export  const FavButton = ({name, book_id, isFav}) =>{
    const dispatch = useDispatch()
    const user = useSelector(state => state.dbUser)
    
    function handleAddFavorites  (e) {
        let body={
            name: user.name,
            book_id: book_id
        }
        axios.post('/users/addfavorite', body).then(() => {

            dispatch(getUserFromDb(user.name))
        })
    }
    function handleremoveFavorites(e) {
        let body={
            name: user.name,
            book_id: book_id
        }
        axios.post('/users/removefavorite', body).then(() =>{

            dispatch(getUserFromDb(user.name))
        })
    }

     return(
        <>
        {isFav !== false ? (
            <button style={{ marginBottom:'5px', marginLeft:'90px', border:'none', backgroundColor:'transparent'}} onClick={handleremoveFavorites}>❤️</button>) : (
    <button style={{ marginBottom:'5px', marginLeft:'90px', border:'none', backgroundColor:'transparent'}} onClick={handleAddFavorites}>🤍</button>)} 
    </>
    )
} 
