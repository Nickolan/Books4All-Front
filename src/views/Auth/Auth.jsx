import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFromDb } from "../../Redux/actions";
import { Button, Container, Divider, Grid, Avatar, Tab, Tabs, createMuiTheme, ThemeProvider} from "@mui/material";
import Grow from '@mui/material/Grow';
import EditProfile from "../../components/EditProfile/EditProfile";
import ProfileBoughts from "./profileBoughts";
import { Loader } from "../../components/Loader/Loader";
import ProfileReview from "./ProfileReview";


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#b2b2b2',
    },
  },
});



export default function Auth(){

    const { user} = useAuth0();

  const dispatch = useDispatch();


    const [showEditForm, setShowEditForm] = useState(false);
    
    const [tabValue, setTabValue] = useState(0);

    const dbUser = useSelector(state => state.dbUser)

    useEffect( ()=> {
            dispatch(getUserFromDb(user?.nickname))
    },[])

    const handleOpen = () => {
        setShowEditForm(true)
    }

    const handleClose = () => {
      setShowEditForm(false);
    };

        return(
          <ThemeProvider theme={theme}>
            <Container sx={{ display: 'flex', minHeight: '87.9vh'  }}>
            <Grid container sx={{ pt: 2}}>
            <Grid item xs={true} style={{ textAlign: 'center'}}>

            <Avatar src={dbUser.picture} style={{ margin: 'auto', width: 70, height: 70}} alt=""/>

            <Button onClick={handleOpen} style={{ color: 'black' }}>Edit</Button>
            
            <Grow in={showEditForm} style={{ position: 'absolute', top: '20%', left: '40%', maxWidth:'300px' }}>
            <div>
              {showEditForm && <EditProfile user={dbUser} handleClose={handleClose}/>}
            </div>
            </Grow > 
            <Divider variant="middle" style={{ backgroundColor: 'black' }}/>
             <h4>{dbUser.alterName}</h4>
            <Divider variant="middle" style={{ backgroundColor: 'black' }}/>
             <h4>{dbUser.email}</h4>
           <Divider variant="middle" style={{ backgroundColor: 'black' }}/>
             <h4>About</h4>
             <h6>{dbUser.about}</h6>
            </Grid>
            <Divider orientation="vertical" flexItem xs={1} style={{ backgroundColor: 'black' }}/>
            <Grid item xs={8} sx={{ pl: 1, justifyContent: 'center' }}>
             <div style={{ display: 'flex', justifyContent: 'center' }}> 
            <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)} sx={{
              backgroundColor: 'transparent'}} indicatorColor="secondary">
            <Tab label="Purchases" />
            <Tab label="Wishlist" />
            <Tab label="Reviews" />
            </Tabs>
            </div>
            <TabPanel value={tabValue} index={0}>
              <ProfileBoughts/>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              Aqui va la Wishlist
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <ProfileReview dbUser={dbUser}/>
            </TabPanel>
            </Grid>
        </Grid>
        </Container>
        </ThemeProvider>
        )
}


function TabPanel(props) {
  const {children, value, index} = props

  return(
    <div>{
      value===index && children
      }</div>
  )
}
