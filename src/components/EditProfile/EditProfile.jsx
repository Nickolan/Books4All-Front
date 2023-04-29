import { TextField, Box, Button, IconButton, Avatar } from "@mui/material";
import { useState } from "react";
import { updateProfile } from "../services/updateProfile";
import { validation } from "./Validation";
import Widget from "../Widget/Widget";
import { toast } from "react-toastify";
import CloseIcon from '@mui/icons-material/Close';


  const EditProfile = ({user, handleClose}) => {

    const [updatedUser, setUpdatedUser] = useState({
        alterName: user.alterName,
        email: user.email,
        picture:user.picture,
        about: user.about,
      });

    const [errors, setErrors] = useState({
        alterName: '',
        email:'',
        about: '',
    })


    const handleOnChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
  
          setUpdatedUser({
            ...updatedUser,
            [name] : value,
          })

          setErrors(validation({...updatedUser, [name] : value}))
      }

    const handleSubmit = (event) => {

        event.preventDefault();
        if(Object.keys(errors).length > 0){
            toast.error('Please, verify errors')
            return;
        }
        updateProfile(user.name, updatedUser).then(result => toast.success(result)).catch(error => toast.error(error.message))
      }


    return(
        <Box display="flex" flexDirection="column" alignItems="center" style={{ backgroundColor: 'white', padding: '20px',  border: '1px solid #b2bec3', borderRadius: '20px'}}> 
        <Box display="flex" justifyContent="flex-end" flexGrow="1" width="100%">
        <IconButton color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
    <form onSubmit={handleSubmit}>
        <Avatar src={updatedUser.picture} style={{ margin: 'auto', width: 70, height: 70}} alt="user picture"/>
        <Widget updatedUser={updatedUser} setUpdatedUser={setUpdatedUser}/>
        <TextField  margin="normal" variant='outlined' label='alterName' name="alterName" value={updatedUser.alterName} onChange={handleOnChange}/>
        <TextField  margin="normal" variant='outlined' label='email' name="email" value={updatedUser.email} onChange={handleOnChange}/>
        <TextField margin="normal" multiline maxRows={4} minRows={4} variant='outlined' label='about' name="about" value={updatedUser.about} onChange={handleOnChange}/>
        <Button variant="outlined" type='submit'>Edit profile</Button>
      </form>
        </Box>
    )
  };
  
  export default EditProfile;