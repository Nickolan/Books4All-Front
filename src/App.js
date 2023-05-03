import "./App.css";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/Home/Home";
import About from "./views/About/About";
import Books from "./views/Books/Books";
import { BookDetail } from "./views/BookDetail/BookDetail";
import UserBanView from "./views/UserBanView/UserBanView";
import Events from "./views/Events/Events";
import CartDetail from "./components/CartDetail/CartDetail";
import CheckoutSuccess from "./components/CheckoutSuccess/CheckoutSuccess";
import Auth from "./views/Auth/Auth";
import Error from "./views/Error/Error";
import Dashboard from "./views/Dashboard/Dashboard";
import UpdateBookForm from "./components/UpdateBookForm/UpdateBookForm";
import Profile from "./views/Profiles/Profiles";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { Sidebar } from "./components/Sidebar/Sidebar";
import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";
import EditProfile from "./components/EditProfile/EditProfile";
import {
  getBooks,
  getUserFromDb,
  getUsers,
  getDeletedBooks,
} from "./Redux/actions";
import { PostUser } from "./components/PostUser/PostUser";
import { useAuth0 } from "@auth0/auth0-react";
import FormCreateBook from "./components/FormCreateBook/FormCreateBook";
import Chatbot from "./components/ChatBot/Chatbot";

// axios.defaults.baseURL ="https://books4all-back-production-bd65.up.railway.app/";

axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebarState);
  const cart = useSelector((state) => state.cart);
  const dbUser = useSelector((state) => state.dbUser);
  const { user, logout, isAuthenticated } = useAuth0();
  const theme = useSelector((state) => state.theme);
  const book = useSelector((state) => state.bookDetail);

  PostUser(user, isAuthenticated, logout);

  if (dbUser.active === false) {
    console.log("User blocked");
    logout();
  }

  useEffect(() => {
    dispatch(getBooks())
      .then(() => dispatch(getUsers()))
      .then(() => user && dispatch(getUserFromDb(user?.nickname)))
      .then(() => dispatch(getDeletedBooks()));
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme, user]);

  return (
    <div style={isOpen ? { position: "fixed" } : {}}>
      {isOpen && <Sidebar booksAdded={cart} />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/books" element={<Books />} />
        <Route path="/bookDetail/:bookId" element={<BookDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/cart" element={<CartDetail />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="/profile" element={<Auth />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/404" element={<Error />} />
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/users/:user_name" element={<Profile />} />
        <Route
          path="/admin/modify/:idBook"
          element={<UpdateBookForm book={book} />}
        />
        <Route path="/formCreateBook" element={<FormCreateBook />} />
        <Route path="/UserBlocked" element={<UserBanView />} />
      </Routes>
      <Chatbot />
      <Footer />
      <ToastContainer position="top-center" limit={2} />
    </div>
  );
}

export default App;
