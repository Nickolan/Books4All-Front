import React from 'react';
import { useSelector } from 'react-redux';
import BoghtCards from './boghtCards';

const ProfileBoughts = () => {

    const bought = useSelector((state) => state.dbUser.Boughts)

    return (
        <div>
        <h3>My orders</h3>
            {
                bought?.map((item, index) => {
                    return (
                        <BoghtCards
                            key={index}
                            id={item.id}
                            date={item.createdAt}
                            books={item.books}
                            total={item.total}
                        />
                    )
                })
            }

        </div>
    )
}

export default ProfileBoughts;
