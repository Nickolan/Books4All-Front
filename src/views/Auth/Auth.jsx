import LogoutButton from "../../components/LogoutButton/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFromDb } from "../../Redux/actions";
import { Box, Button, Container, Divider, Grid, Avatar} from "@mui/material";
import Grow from '@mui/material/Grow';
import EditProfile from "../../components/EditProfile/EditProfile";
export default function Auth(){

    const { user} = useAuth0();
    
    const dispatch = useDispatch();

    const dbUser = useSelector(state=>state.dbUser);

    const [showEditForm, setShowEditForm] = useState(false);

    useEffect( ()=> {
            dispatch(getUserFromDb(user?.nickname))
    },[])

    const handleClick = () => {
        setShowEditForm(!showEditForm)
    }


        return(
            <Container sx={{ display: 'flex', minHeight: '85vh'  }}>
            <Grid container sx={{ pt: 2}}>
            <Grid item xs={3} style={{ textAlign: 'center'}}>

            <Avatar src={dbUser.picture} style={{ margin: 'auto', width: 70, height: 70}} alt=""/>

            <Button onClick={handleClick}>Edit</Button>
            
            <Grow in={showEditForm} style={{ position: 'absolute', top: '20%', left: '40%', maxWidth:'300px' }}>
            <div>
              {showEditForm && <EditProfile user={dbUser} />}
            </div>
          </Grow > 
            </Grid>
            <Divider orientation="vertical" flexItem xs={1}/>
            <Grid item xs={8} sx={{ pl: 1}}>
            <Box sx={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(2, 1fr)', mx: 2, textAlign: 'center'}}>
                      <div>
                         <h2>Recent Purchases</h2>
                         </div>
                         <div>
                         <h2>Your Wishlist</h2>
                         </div>
                    </Box>
                     <h1>Your recent reviews</h1>

            </Grid>
        </Grid>
        </Container>
        )
    
}
