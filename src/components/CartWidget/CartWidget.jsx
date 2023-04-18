import { AiOutlineShoppingCart } from 'react-icons/ai';



const CartWidget=()=>{

    const handleClick=()=>{
        alert('carrito')
    }

    return(
        <div className='container mt-0'>
            <AiOutlineShoppingCart className='text-white' onClick={handleClick}/>
            <span className='text-white w-25'>0</span>  
        </div>
    )
}

export default CartWidget