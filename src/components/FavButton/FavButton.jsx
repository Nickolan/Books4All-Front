
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { getUserFromDb } from "../../Redux/actions"
import { toast } from 'react-toastify';


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
            toast(`❤️ You have added ${name}!`, {
                position: "bottom-right",
                style: {
                    background:'linear-gradient(97deg, rgba(65,10,28,1) 4%, rgba(2,2,17,1) 32%)',
                  color: "white",
                },
                progressBar: {
                  backgroundColor: "red",
                },
                autoClose: 800,
                closeOnClick: true,
              });
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
        toast(`You have added ${name} to ❤️!`, {
            position: "bottom-right",
            style: {
                background:'linear-gradient(97deg, #410a1c 10%, #020211 5%)',
              color: "white",
            },
            progressBar: {
              backgroundColor: "red",
            },
            autoClose: 1000,
            closeOnClick: true,
          });
    }

     return(
        <>
        {isFav !== false ? (
            <button style={{ marginBottom:'5px', marginLeft:'90px', border:'none', backgroundColor:'transparent'}} onClick={handleremoveFavorites}>❤️</button>) : (
    <button style={{ marginBottom:'5px', marginLeft:'90px', border:'none', backgroundColor:'transparent'}} onClick={handleAddFavorites}>🤍</button>)} 
    </>
    )
} 
