import img from './images/Manufacturing-KPI-Dashboard-133807082'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/NavBar/Navbar'
import ControlPanel from '../../components/Control Panel/ControlPanel';
import BooksBlock from '../../components/BooksBlock/BooksBlock.jsx';
import UsersBlock from '../../components/UsersBlock/UsersBlock';
import UsersList from '../../components/UsersList/UsersList';
import UsersBanList from '../../components/UsersBanList/UsersBanList';
import BooksList from '../../components/BooksList/BooksList';
import BooksBanedList from '../../components/BooksBanedList/BooksBanedList';
import BooksBlockBan from '../../components/BooksBlockBan/BooksBlockBan';
import UsersBanBlock from '../../components/UsersBanBlock/UsersBanBlock';
import AdminBlock from '../../components/AdminBlock/AdminBlock';
import AdminsList from '../../components/AdminsList/AdminsList';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

export default function Dashboard(){
    const [section, setSection] = useState('Dashboard')

    const navitgate = useNavigate()
    const { role, allUsers, allBooks, banBooks } = useSelector((state) => state)
    const activeUsers = allUsers.filter(user => user.active === true && user.Roles.at(-1).name === 'user')
    const inactiveUsers = allUsers.filter(user => user.active === false)
    const admins = allUsers.filter(user => user.Roles.at(-1).name === 'admin')
    
    useEffect(() => {
        if (role.name !== 'admin') {
            navitgate('/home')
        }
    }, [])

    return(
        <div>

            <div>
            <ControlPanel setSection={setSection}/>
            {
                section === 'Dashboard' ? <div className='container d-flex flex-column justify-content-around'>
                <AdminBlock Admins={admins} />
                <UsersBlock users={activeUsers}/>
                <UsersBanBlock inactiveUsers={inactiveUsers} />
                <BooksBlock books={allBooks}/>
                <BooksBlockBan banBooks={banBooks}/>
                </div> : null
            }
            {
                section === 'Admin' ? <div><AdminsList admins={admins}/></div> : null
            }
            {
                section === 'Active Users' ? <div><UsersList users={activeUsers}/></div> : null
            }
            {
                section === 'Inactive Users' ? <div><UsersBanList inactiveUsers={inactiveUsers}/></div> : null
            }
            {
                section === 'Active Books' ? <div><BooksList books={allBooks}/></div> : null
            }
            {
                section === 'Inactive Books' ? <div><BooksBanedList banBooks={banBooks}/></div> : null
            }
            
            </div>
        </div>
    )
}