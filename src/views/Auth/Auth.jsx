import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFromDb } from "../../Redux/actions";
import { Button, Container, Divider, Grid, Avatar, Tab, Tabs} from "@mui/material";
import Grow from '@mui/material/Grow';
import EditProfile from "../../components/EditProfile/EditProfile";
import ProfileBoughts from "./profileBoughts";


export default function Auth(){

    const { user} = useAuth0();

  const dispatch = useDispatch();

    const [showEditForm, setShowEditForm] = useState(false);
    
    const [tabValue, setTabValue] = useState(0);

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
            <Container sx={{ display: 'flex', minHeight: '85.9vh'  }}>
            <Grid container sx={{ pt: 2}}>
            <Grid item xs={3} style={{ textAlign: 'center'}}>

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
            <Grid item xs={8} sx={{ pl: 1}}>
            <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)}>
            <Tab label="Purchases" />
            <Tab label="Wishlist" />
            <Tab label="Reviews" />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              Aqui van las Purchases
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              Aqui va la Wishlist
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              Aqui van las Reviews
            </TabPanel>
            </Grid>
        </Grid>
        </Container>
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
