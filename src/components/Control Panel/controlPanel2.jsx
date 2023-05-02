import { Divider, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { Fragment } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import PeopleIcon from '@mui/icons-material/People';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { grey, purple, red, yellow } from '@mui/material/colors';
import CreateIcon from '@mui/icons-material/Create';

export default function ControlPanel2({ setSection }) {

    return (
        <Fragment>


            <ListItemButton onClick={() => setSection('Dashboard')}>
                <ListItemIcon>
                    <DashboardIcon color='primary' />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>

            <ListItemButton onClick={() => setSection('Admin')} >
                <ListItemIcon>
                    <AdminPanelSettingsIcon sx={{ color: purple[500] }} />
                </ListItemIcon>
                <ListItemText primary="Admin" />
            </ListItemButton>

            <ListItemButton onClick={() => setSection('Active Users')}>
                <ListItemIcon>
                    <PeopleIcon color='success' />
                </ListItemIcon>
                <ListItemText primary="Active users" />
            </ListItemButton>

            <ListItemButton onClick={() => setSection('Inactive Users')}>
                <ListItemIcon>
                    <PeopleOutlineIcon sx={{ color: red[500] }} />
                </ListItemIcon>
                <ListItemText primary="Inactive Users" />
            </ListItemButton>

            <ListItemButton onClick={() => setSection('Active Books')}>
                <ListItemIcon>
                    <LibraryBooksIcon color='success' />
                </ListItemIcon>
                <ListItemText primary="Active Books" />
            </ListItemButton>

            <ListItemButton onClick={() => setSection('Inactive Books')}>
                <ListItemIcon>
                    <LibraryBooksIcon sx={{ color: red[500] }} />
                </ListItemIcon>
                <ListItemText primary="Inactive Books" />
            </ListItemButton>

            <ListItemButton onClick={() => setSection('Create Books')}>
                <ListItemIcon>
                    <CreateIcon sx={{ color: yellow[500] }} />
                </ListItemIcon>
                <ListItemText primary="Create Book" />
            </ListItemButton>
            <Divider sx={{ margin: '5px 0 5px 0' }} />
            {/* <div>
                    <button onClick={() => setSection('Dashboard')} >DashBoard</button>
                </div>
                <div>
                    <button onClick={() => setSection('Admin')} >Admin</button>
                </div>
                <div>
                    <button onClick={() => setSection('Active Users')} >Active Users</button>
                </div>
                <div>
                    <button onClick={() => setSection('Inactive Users')} >Inactive Users</button>
                </div>
                <div>
                    <button onClick={() => setSection('Active Books')} >Active Books</button>
                </div>
                <div>
                    <button onClick={() => setSection('Inactive Books')} >Inactive Books</button>
                </div>
                <div>
                    <Link to={`/formCreateBook`}>
                        <button class='btn btn-success'>Create Book</button>
                    </Link>
                </div> */}

        </Fragment>
    )
}