import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/NavBar/Navbar'
import img from './images/Manufacturing-KPI-Dashboard-133807082'

export const Dashboard=()=>{
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