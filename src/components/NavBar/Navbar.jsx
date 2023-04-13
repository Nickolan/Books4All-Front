import React from "react";
import { Link } from 'react-router-dom';
import styles from './Navbar.modules.css';



export default function Navbar(){
    return(
        <nav>
        <img></img>
        <ul className={styles.nav_menu}>
            <Link to="/" className={styles.nav_item}><li>Home</li></Link>
            <Link to="/about" className={styles.nav_item}><li>About</li></Link>
            <Link to="/books" className={styles.nav_item}><li>Books</li></Link>
            <Link to="/events" className={styles.nav_item}><li>Events</li></Link>
            <Link to="/cart" className={styles.nav_item}><li>Cart</li></Link>
            <Link to="/profile" className={styles.nav_item}><li>Profile</li></Link>
        </ul>
        </nav>
    );
}