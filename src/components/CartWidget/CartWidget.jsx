import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Sidebar } from '../Sidebar/Sidebar';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import style from './CartWidget.module.css'

const CartWidget = () => {
    const [isOpen, setIsOpen] = useState(false)
    const cart = useSelector(state => state.cart)

    const handleClick = () => {
        setIsOpen(!isOpen)

    }

    return (
        <div className=" pb-1">
            {<AiOutlineShoppingCart class='nav-item fs-5' className={style.cart} onClick={handleClick} />}
            {isOpen && <Sidebar booksAdded={cart} onClose={handleClick} />}
            {!isOpen && cart.length && <span className='text-white w-100 mb-4 '>{cart.length}</span>}

        </div>


    )
}

export default CartWidget