import { TextField, Box, Button, IconButton, Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { updateProfile } from "../services/updateProfile";
import { validation } from "./Validation";
import Widget from "../Widget/Widget";
import { toast } from "react-toastify";
import CloseIcon from '@mui/icons-material/Close';


  const EditProfile = ({user, handleClose}) => {

    const [updatedUser, setUpdatedUser] = useState({
        alterName: user.alterName,
        picture:user.picture,
        about: user.about,
      });

    const [errors, setErrors] = useState({
        alterName: '',
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
        updateProfile(user.name, updatedUser).then(result => toast.success(result)).then(result => handleClose()).catch(error => toast.error(error.message))
      }
      
      useEffect(()=>{
        console.log(errors)
        setErrors(validation({...updatedUser}));
      },[])


    return(
        <Box display="flex" flexDirection="column" alignItems="center" style={{ backgroundColor: 'white', padding: '20px',  border: '1px solid #b2bec3', borderRadius: '20px'}}> 
        <Box display="flex" justifyContent="flex-end" flexGrow="1" width="100%">
        <IconButton color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
    <form onSubmit={handleSubmit}>
        <Avatar src={user.picture} style={{ margin: 'auto', width: 70, height: 70}} alt="user picture"/>
        <Widget userDB={user} updatedUser={updatedUser} setUpdatedUser={setUpdatedUser}/>
        <TextField  margin="normal" variant='outlined' label='alterName' name="alterName" value={updatedUser.alterName} onChange={handleOnChange}/>
        <TextField margin="normal" multiline maxRows={4} minRows={4} variant='outlined' label='about' name="about" value={updatedUser.about} onChange={handleOnChange}/>
        <Button variant="outlined" type='submit'>Edit profile</Button>
      </form>
        </Box>
    )
  };
  
  export default EditProfile;