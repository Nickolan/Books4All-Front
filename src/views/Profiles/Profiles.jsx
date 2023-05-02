import { Container } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../../Redux/actions';


export default function Profile() {
    const dispatch = useDispatch();
    const {user_name} = useParams();
    const userProfile = useSelector(state => state.userProfile);
    useEffect(()=>{
        dispatch(getUserProfile(user_name))
    }, []);
    console.log(userProfile)

    return(
        <>
        <Container sx={{ minHeight: '86vh'}}>
            <h1>{userProfile.name}</h1>
            <h1>{userProfile.email}</h1>
            <h1>{userProfile.about}</h1>
            <img src={userProfile.picture} alt='profilepicture'/>
            </Container>
        </>
    )
}