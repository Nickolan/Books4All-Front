import Footer from "../Footer/Footer";
import Navbar from "../NavBar/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Box, Button, ButtonBase, Container, Divider, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import HouseIcon from '@mui/icons-material/House';

import { CheckBox } from "@mui/icons-material";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";


import { deleteCart, getEventType } from "../../Redux/actions";
import Confetti from 'react-confetti';

const CheckoutSuccess = () => {

    const [session, setSession] = useState({});
    const [customer, setCustomer] = useState([]);
    const dispatch = useDispatch();
    const bought = useSelector((state) => state.allBooks);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    const navigate = useNavigate();
    const goToDetail = (bookID) => {
        navigate(`/bookDetail/${bookID}`)
    }
    const goToBooks = () => {
        navigate('/books')
    }

    const goToOrders = () => {
        navigate('/profile')
    }


    let boughtBooksId = [];
    if (customer) {
        customer.forEach(el => {
            boughtBooksId = [...boughtBooksId, el.bookId]
        })
    }

    const foundBooks = [];

    bought?.forEach((book) => {
        if (boughtBooksId.includes(book.id)) {
            foundBooks.push(book);
        }
    });

    console.log(foundBooks);
    const showSuccess = async () => {
        const response = await axios(`/api/stripe/success?session_id=${sessionId}`);
        const customerData = JSON.parse(response.data[0].metadata.cart);
        const sessionData = response.data[1];
        await setSession(sessionData);
        await setCustomer(customerData);
    }


    const [confetti, setConfetti] = useState(true)

    useEffect(() => {
        showSuccess()
        dispatch(deleteCart())
        setTimeout(() => {
            setConfetti(false)
        }, 5000)
    }, [])

    const date = new Date(); // crea una instancia de Date con la fecha actual
    const formattedDate = format(date, 'dd MMM yyyy');

    console.log(session);
    console.log("my customer complete: ", customer);
    console.log(typeof (customer));
    console.log(boughtBooksId);
    console.log(bought);


    return (
        <div className=''>
            {confetti && <Confetti />}
            <Container sx={{ marginTop: '30px', }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <CheckCircleRoundedIcon color="primary" fontSize="large" />
                    <Typography variant="h4">Thank you for your order!</Typography>
                    <Typography sx={{ marginTop: '15px' }} variant="body2">The order confirmation email with details of your order has been sent to your email address.</Typography>
                    <Box
                        sx={{
                            backgroundColor: '#f0f0f0',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '15px',
                            justifyContent: 'center',
                            borderRadius: '20px',
                            margin: '10px 0 10px 0'
                        }}>
                        <Typography sx={{ textTransform: 'uppercase' }} >YOUR ORDER IS: {session.status}</Typography>
                    </Box>
                    <Typography variant="body2">Order Date: {formattedDate}</Typography>
                </Box>
                <Box sx={{ marginTop: '40px' }}>
                    <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
                        <Grid item xs container direction="column" spacing={5}>
                            <Grid item sx={{ width: '350px' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            backgroundColor: '#f0f0f0',
                                            justifyContent: 'baseline',
                                            alignItems: 'center',
                                            paddingLeft: '8px'
                                        }}>
                                        <HouseIcon color="primary" sx={{ marginRight: '8px' }} />
                                        <Typography variant="h6">Shipping Address</Typography>
                                    </Box>
                                    <Typography variant="subtitle2">{session.shipping_details?.name}</Typography>
                                    <Typography variant="body2">{session.shipping_details?.address.line1}</Typography>
                                    <Typography variant="body2">{session.shipping_details?.address.city}</Typography>
                                    <Typography variant="body2">{session.shipping_details?.address.state}</Typography>
                                    <Typography variant="body2">{session.shipping_details?.address.country}</Typography>
                                    <Typography variant="body2">{session.customer_details?.phone}</Typography>
                                </Box>
                            </Grid>
                            <Grid item sx={{ width: '350px' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            backgroundColor: '#f0f0f0',
                                            justifyContent: 'baseline',
                                            alignItems: 'center',
                                            paddingLeft: '8px'
                                        }}>
                                        <HouseIcon color="primary" sx={{ marginRight: '8px' }} />
                                        <Typography variant="h6">Billing Address</Typography>
                                    </Box>
                                    <Typography variant="subtitle2">{session.shipping_details?.name}</Typography>
                                    <Typography variant="body2">{session.shipping_details?.address.line1}</Typography>
                                    <Typography variant="body2">{session.shipping_details?.address.city}</Typography>
                                    <Typography variant="body2">{session.shipping_details?.address.state}</Typography>
                                    <Typography variant="body2">{session.shipping_details?.address.country}</Typography>
                                    <Typography variant="body2">{session.customer_details?.phone}</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Box sx={{ width: '700px' }}>
                                <Box sx={{ display: 'flex', backgroundColor: '#f0f0f0', justifyContent: 'baseline', alignItems: 'center', paddingLeft: '8px' }}>
                                    <CheckBox color="primary" sx={{ marginRight: '8px' }} />
                                    <Typography variant="h6">Order Summary</Typography>
                                </Box>
                                <Box sx={{
                                    height: 300, overflowY: 'scroll',
                                    maxHeight: '400px',
                                    '&::-webkit-scrollbar': {
                                        width: '8px',
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        background: '#f1f1f1',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        background: '#888',
                                        borderRadius: '10px',
                                        '&:hover': {
                                            background: '#555',
                                        },
                                    },
                                }}>
                                    {
                                        foundBooks?.map(book => {
                                            const item = customer.find(boughtBook => boughtBook.bookId === book.id)
                                            const qty = item.quantity;
                                            return (
                                                <List sx={{
                                                    width: '100%',
                                                }}>
                                                    <ListItem>
                                                        <ButtonBase onClick={() => { goToDetail(book.id) }}>
                                                            <img src={book.image} alt="" style={{ width: '50px', marginRight: '10px' }} />
                                                        </ButtonBase>
                                                        <ListItemText sx={{ width: '480px' }} primary={book.title} secondary={`Price: ${book.price} USD | Quantity: ${qty}`} />
                                                        <ListItemText secondary={`Subtotal: ${qty * book.price} USD`} />
                                                    </ListItem>
                                                    <Divider variant="inset" component="li" />
                                                </List>
                                            )
                                        })
                                    }
                                </Box>
                                <Box sx={{ backgroundColor: '#f0f0f0', display: 'flex', flexDirection: 'column', justifyContent: 'end', alignItems: 'flex-end', padding: '8px' }}>
                                    <Typography variant="body2">Subtotal: ${session.amount_subtotal / 100}</Typography>
                                    <Typography variant="body2">Shipping & Handling: $0.00</Typography>
                                    <Typography variant="h6">Total: ${session.amount_total / 100}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Box>
                            <Button sx={{ margin: '10px' }} onClick={goToBooks}>Continue Shopping</Button>
                            <Button sx={{ margin: '10px' }} onClick={goToOrders}>All your Orders</Button>
                        </Box>
                    </Grid>
                </Box>

            </Container>

        </div>
    )
}

export default CheckoutSuccess;
