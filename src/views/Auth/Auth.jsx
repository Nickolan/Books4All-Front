import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFromDb } from "../../Redux/actions";
import { Button, Container, Divider, Grid, Avatar, Tab, Tabs, createMuiTheme, ThemeProvider} from "@mui/material";
import Grow from '@mui/material/Grow';
import EditProfile from "../../components/EditProfile/EditProfile";
import ProfileBoughts from "./profileBoughts";
import ProfileReview from "./ProfileReview";
import { Loader } from "../../components/Loader/Loader";
import FavouritesBooks from "./FavouritesBooks";


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
          <ThemeProvider theme={theme} title='login'>
            <Container sx={{ display: 'flex', minHeight: '87.9vh'  }}>
            <Grid container sx={{ pt: 2}}>
            <Grid item xs={true} style={{ textAlign: 'center'}}>
              <Avatar src={dbUser.picture} style={{ margin: 'auto', width: 70, height: 70}} alt=""/>
              <Button onClick={handleOpen} title="Edit" style={{ marginTop: 20, marginBottom: 10 }}>Edit</Button>
              <Grow in={showEditForm} style={{ position: 'absolute', top: '20%', left: '40%', maxWidth:'300px' }}>
                <div>
                  {showEditForm && <EditProfile user={dbUser} handleClose={handleClose}/>}
                </div>
              </Grow> 
              <Divider variant="middle" style={{ marginTop: 20, marginBottom: 20 }} />
              <h4 style={{ marginTop: 20, marginBottom: 10 }}>{dbUser.alterName ? dbUser.alterName : dbUser.name}</h4>
              <Divider variant="middle" style={{ marginTop: 20, marginBottom: 20 }} />
              <h4 style={{ overflow: "hidden", textOverflow: "ellipsis", marginTop: 20, marginBottom: 10 }} title={dbUser.email}>{dbUser.email}</h4>
              <Divider variant="middle" style={{ marginTop: 20, marginBottom: 20 }} />
              <h4 style={{ marginTop: 20, marginBottom: 10 }}>About</h4>
              <h6 style={{ marginTop: 20, marginBottom: 20 }}>{dbUser.about ? dbUser.about : "You don't have an about :(  Tell us something about you!"}</h6>
            </Grid>
            <Divider orientation="vertical" flexItem xs={1} />
            <Grid item xs={8} sx={{ pl: 1, justifyContent: 'center' }}>
             <div style={{ display: 'flex', justifyContent: 'center' }}> 
            <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)} sx={{
              backgroundColor: 'transparent'}} indicatorColor="secondary">
            <Tab label="Purchases"  title="Purchases"/>
            <Tab label="Wishlist" title="Wishlist"/>
            <Tab label="Reviews"  title="Reviews"  />
            </Tabs>
            </div>
            <TabPanel value={tabValue} index={0}>
              <ProfileBoughts/>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <FavouritesBooks />
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
