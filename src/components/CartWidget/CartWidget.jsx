import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Sidebar } from '../Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import style from './CartWidget.module.css'
import { sideBar } from '../../Redux/actions';

const CartWidget = () => {

    const cart = useSelector(state => state.cart)
    

    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(sideBar());

    }

    return (
        <div className="position-relative pb-1">
            {<AiOutlineShoppingCart class='nav-item fs-5' className={style.cart} onClick={handleClick} />}

            {cart.length ? <span className='position-absolute text-white w-100 mb-4 '>{cart.length}</span> : <span className='position-absolute text-white w-100 mb-4 '></span>}

        </div>


    )
}

export default CartWidget