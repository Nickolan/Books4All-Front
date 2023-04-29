import { AiOutlineLoading3Quarters } from "react-icons/ai"
import style from './Loader.module.css'

export const Loader=()=>{
    return(
        <>
        <AiOutlineLoading3Quarters className={style.loader} ></AiOutlineLoading3Quarters>
        </>
    )
}