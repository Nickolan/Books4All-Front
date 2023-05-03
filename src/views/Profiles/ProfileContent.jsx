import { Avatar, Tab, Tabs} from "@mui/material";
import { useState } from "react";
import ProfileReview from "../Auth/ProfileReview";
import { Container } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";


const ProfileContent = ({userProfile}) => {

    console.log(userProfile)


    const [tabValue, setTabValue] = useState(0);

    return(
        <Container style={{display:'flex', flexDirection:'row', marginTop: '20px'}}>

      <Container  style={{width: '15%', display: 'flex', flexDirection:'column'}}>
                <Avatar src={userProfile.picture} style={{ margin: 'auto', width: 70, height: 70}} alt=""/>
                <h6>{userProfile.alterName}</h6>
                <p>{userProfile.about}</p>
            </Container>

            <Container>
            <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)} sx={{
              backgroundColor: 'transparent'}} indicatorColor="secondary" variant="fullWidth"
              >
            <Tab label="Wishlist" />
            <Tab label="Reviews" />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              Aqui va la Wishlist
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <ProfileReview dbUser={userProfile}/>
            </TabPanel>
            </Container>

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

export default ProfileContent;