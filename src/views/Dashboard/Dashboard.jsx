import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/NavBar/Navbar'
import img from './images/Manufacturing-KPI-Dashboard-133807082'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const Dashboard=()=>{
    const navitgate = useNavigate()
    const role = useSelector(state => state.role)
    useEffect(() => {
        if (role.name !== 'admin') {
            navitgate('/home')
        }
    }, [])

    return(
        <>
        <Navbar/>
        <div className='container'>
            <img src={img} alt="dashboard" />
        </div>
        <Footer/>
        </>
    )
}