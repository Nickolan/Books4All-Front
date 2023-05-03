
import React, { useEffect, useState } from 'react';
import FormCreateBook from '../../components/FormCreateBook/FormCreateBook'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ControlPanel2 from '../../components/Control Panel/controlPanel2';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminsList from '../../components/AdminsList/AdminsList';
import UsersList from '../../components/UsersList/UsersList';
import UsersBanList from '../../components/UsersBanList/UsersBanList';
import BooksList from '../../components/BooksList/BooksList';
import BooksBanedList from '../../components/BooksBanedList/BooksBanedList';
import AdminBlock from '../../components/AdminBlock/AdminBlock';
import UsersBlock from '../../components/UsersBlock/UsersBlock';
import UsersBanBlock from '../../components/UsersBanBlock/UsersBanBlock';
import BooksBlock from '../../components/BooksBlock/BooksBlock';
import BooksBlockBan from '../../components/BooksBlockBan/BooksBlockBan';



const drawerWidth = 240;


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

function DashboardContent() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    //funcion dashboard de Nico

    const [section, setSection] = useState('Dashboard')
    const navitgate = useNavigate()
    const [showOffert, setShowOffert] = useState(false)
    const [bookDiscount, setBookDiscount] = useState('')
    const { role, allUsers, allBooks, banBooks, bookDetail } = useSelector((state) => state)

    const activeUsers = allUsers.filter(user => user.active === true && user.Roles.at(-1).name === 'user')
    const inactiveUsers = allUsers.filter(user => user.active === false)
    const admins = allUsers.filter(user => user.Roles.at(-1).name === 'admin')

    useEffect(() => {
        if (role.name !== 'admin') {
            navitgate('/home')
        }
    }, [])

    return (
        <Box>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Drawer variant="permanent" open={open}>
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                px: [1],
                            }}
                        >
                            <IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Toolbar>
                        <Divider />
                        <List component="nav">
                            {<ControlPanel2 setSection={setSection} />}
                            <Divider sx={{ my: 1 }} />
                        </List>
                    </Drawer>
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar />
                        <Container sx={{ borderTop: '50px' }}>
                            <Box sx={{margin:'0 auto'}}>
                                {
                                    section === 'Dashboard' ? <div className='container d-flex flex-column justify-content-around'>
                                        <Container >
                                           
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <Typography variant="h5">Dashboard</Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <AdminBlock Admins={admins} />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <UsersBlock users={activeUsers} />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <UsersBanBlock inactiveUsers={inactiveUsers} />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <BooksBlock books={allBooks} />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <BooksBlockBan banBooks={banBooks} />
                                                    </Grid>
                                                </Grid>
                                          
                                        </Container>
                                    </div> : null
                                }

                                {
                                    section === 'Admin' ? <div><AdminsList admins={admins} /></div> : null
                                }
                                {
                                    section === 'Active Users' ? <div><UsersList users={activeUsers} /></div> : null
                                }
                                {
                                    section === 'Inactive Users' ? <div><UsersBanList inactiveUsers={inactiveUsers} /></div> : null
                                }
                                {
                                    section === 'Active Books' ? <div><BooksList setBookDiscount={setBookDiscount} setShowOffert={setShowOffert} books={allBooks} /></div> : null
                                }
                                {
                                    section === 'Inactive Books' ? <div><BooksBanedList banBooks={banBooks} /></div> : null
                                }
                                {
                                    section === 'Create Books' ? <div><FormCreateBook /></div> : null
                                }
                            </Box>
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        </Box>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}