import React, { useEffect } from 'react';
import { useState } from 'react';
import { Row, Col, Container, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import BoghtCards from './boghtCards';

const ProfileBoughts = () => {

    const bought = useSelector((state) => state.dbUser.Boughts)

    return (
        <div>
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
