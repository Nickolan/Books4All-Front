import React from 'react';
import { useSelector } from 'react-redux';
import BoghtCards from './boghtCards';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const ProfileBoughts = () => {

    const bought = useSelector((state) => state.dbUser.Boughts)

    return (
        <>
          <h3>My orders</h3>
          {bought?.length > 0 ? (
            bought.map((item, index) => (
              <BoghtCards
                key={index}
                id={item.id}
                date={item.createdAt}
                books={item.books}
                total={item.total}
              />
            ))
          ) : (
            <div>
                <h4>You haven't bought a book yet? It's time to explore and find your next adventure! </h4>
                <Button variant='contained'><Link style={{ textDecoration: "none", color: 'white' }} to={`/books`}>Books</Link></Button>
            </div>
          )}
        </>
      );
    };

export default ProfileBoughts;
