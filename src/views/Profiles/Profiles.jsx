import { Container } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../../Redux/actions';
import ProfileContent from './ProfileContent';


export default function Profile() {
    const dispatch = useDispatch();
    const {user_name} = useParams();
    const userProfile = useSelector(state => state.userProfile);
    useEffect(()=>{
        dispatch(getUserProfile(user_name))
    }, []);

    return(
        <>
        <Container sx={{ minHeight: '86vh'}}>
            <ProfileContent userProfile={userProfile}/>
        </Container>
        </>
    )
}