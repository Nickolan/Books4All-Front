import { AiOutlineLoading3Quarters } from "react-icons/ai"
import style from './Loader.module.css'

export const Loader=()=>{
    return(
        <div class="mx-auto d-flex justify-content-center" style={{ width: "80%", marginBottom: '40px',height:'600px', marginTop:'20%' }}>
        <AiOutlineLoading3Quarters className={style.loader} ></AiOutlineLoading3Quarters>
        </div>
    )
}