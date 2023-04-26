import "./App.css";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/Home/Home";
import About from "./views/About/About";
import Books from "./views/Books/Books";
import { BookDetail } from "./views/BookDetail/BookDetail";
import Events from "./views/Events/Events";
import CartDetail from "./components/CartDetail/CartDetail";
import CheckoutSuccess from "./components/CheckoutSuccess/CheckoutSuccess";
import Auth from "./views/Auth/Auth";
import Error from "./views/Error/Error";
import Dashboard from "./views/Dashboard/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { instance } from "./components/services/api";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useSelector, useDispatch } from "react-redux";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { getBooks, getUsers, getDeletedBooks } from "./Redux/actions";
// axios.defaults.baseURL ="https://books4all-back-production-0533.up.railway.app/";
axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.sidebarState);
  const cart = useSelector(state => state.cart)

  useEffect(() => {
    dispatch(getBooks())
    dispatch(getUsers())
    dispatch(getDeletedBooks())
  }, [])

  return (


    <div style={isOpen ?{position:'fixed'}:{}}>
      {isOpen && <Sidebar booksAdded={cart} />}
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/books' element={<Books />} />
        <Route path='/bookDetail/:bookId' element={<BookDetail />} />
        <Route path='/events' element={<Events />} />
        <Route path='/cart' element={<CartDetail />} />
        <Route path='/checkout-success' element={<CheckoutSuccess />} />
        <Route path='/profile' element={<Auth />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/404' element={<Error />} />
        <Route path='*' element={<Navigate to='/404' />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
      <ToastContainer position="top-center" limit={2} />
    </div>
  );
}

export default App;
