import React from "react";
import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget'
import {useSelector} from 'react-redux';
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../LoginButton/LoginButton";
import { changeTheme } from "../../Redux/actions";
import { setTheme } from "../../Redux/actions/localStorage";
import { AppBar, Toolbar, Button, IconButton, Fade, Menu, MenuItem } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutButton from "../LogoutButton/LogoutButton";
import GlobalSearchbar from "../GlobalSearchBar/GlobalSearchBar";

export default function Navbar() {
    const { user, isAuthenticated } = useAuth0();
    const role= useSelector(state=> state.role)
    const theme = useSelector((state) => state.theme);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    const dispatch= useDispatch()
   
    setTheme('theme',theme)

    // const onHandlerClick=(event)=>{
    //     dispatch( changeTheme(event.target.value))   
    // }
    const onHandlerClick = (event) => {
        const theme = event.currentTarget.getAttribute('data-theme');
        dispatch(changeTheme(theme));
      };


    return (
        <AppBar position="static" color="primary" style={{ backgroundColor: '#000000'}} >
            <Toolbar style={{ justifyContent: 'space-between' }}>
                <div>
                    <Link to='/'>
                        <img src="https://cdn.discordapp.com/attachments/1091730813529374777/1097178558457184286/books4all-low-resolution-logo-white-on-transparent-background.png" width="100" height="40" alt="logo"/>
                    </Link>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <GlobalSearchbar/>
                {theme==='dark' &&  <IconButton color="inherit" onClick={onHandlerClick} data-theme={'light'}><DarkModeIcon/></IconButton>}
                {theme==='light' &&    <IconButton color="inherit" onClick={onHandlerClick} data-theme={'dark'}><LightModeIcon/></IconButton>}
                        <Button component={Link} to ={'/'} color="inherit">Home </Button>
                        <Button component={Link} to ={'/about'} color="inherit">About</Button>
                        <Button component={Link} to ={'/books'} color="inherit">Books</Button>
                        {isAuthenticated && role.name==='admin' ?  <Button component={Link} to ={'/dashboard'} color="inherit">Dashboard</Button>: null}
                        {!isAuthenticated ? <LoginButton /> : <div>
                            <Button
                                id="fade-button"
                                aria-controls={open ? 'fade-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                color="inherit"
                            >
                                myProfile
                            </Button>
                            <Menu
                                id="fade-menu"
                                MenuListProps={{
                                'aria-labelledby': 'fade-button',
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                TransitionComponent={Fade}
                            >
                                <MenuItem onClick={handleClose} component={Link} to={'/profile'} color="black">Profile</MenuItem>
                                <MenuItem onClick={handleClose}><LogoutButton/></MenuItem>
                            </Menu> </div>}                    
                    <CartWidget/>
                </div>
            </Toolbar>
        </AppBar>  
    );
}

// {!isAuthenticated ? <LoginButton /> : <Button component={Link} to ={'/profile'} color="inherit">{"myProfile"}</Button>}