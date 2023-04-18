import Button from 'react-bootstrap/Button';
import { BsCartCheck, BsCartDash, BsCart } from "react-icons/bs";


export const ShoppingCartButton = ()=>{
    return(
        <div>
            <Button style={{width:"3rem", height:"3rem"}} variant="light">
                <BsCart size="3rem" color="#050505"/>
            </Button>
             <Button style={{width:"3rem", height:"3rem"}} variant="light">
                <BsCartCheck size="3rem" color="#050505"/>
            </Button>
            <Button style={{width:"3rem", height:"3rem"}} variant="light">
                <BsCartDash size="3rem" color="#050505"/>
            </Button>
        </div>
    )
}
