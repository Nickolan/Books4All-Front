import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/NavBar/Navbar'
import img from './images/Manufacturing-KPI-Dashboard-133807082'
import BooksBlock from '../../components/BooksBlock/BooksBlock.jsx';
import UsersBlock from '../../components/UsersBlock/UsersBlock';
import UsersList from '../../components/UsersList/UsersList';
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const Dashboard=()=>{
    const navitgate = useNavigate()
    const role = useSelector(state => state.role)
    const users = useSelector(state => state.allUsers)
    const books = useSelector(state => state.allBooks)
    
    useEffect(() => {
        if (role.name !== 'admin') {
            navitgate('/home')
        }
    }, [])

    return(
        <div>

        <Navbar/>
        <div className='container d-flex justify-content-around'>
            <UsersBlock users={users}/>
            <BooksBlock books={books}/>
        </div>
        <div>
            <UsersList users={users}/>
        </div>
        <Footer/>
        </div>
    )
}