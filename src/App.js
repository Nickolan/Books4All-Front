import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/Home/Home";
import About from "./views/About/About";
import Books from "./views/Books/Books";
import Events from "./views/Events/Events";
import Cart from "./views/Cart/Cart";
import Profile from "./views/Profile/Profile";
import Error from "./views/Error/Error";
import { BookDetail } from "./views/BookDetail/BookDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Auth from "./views/Auth/Auth";
import CartDetail from "./components/CartDetail/CartDetail";
axios.defaults.baseURL =
  "https://books4all-back-production-0533.up.railway.app/";
// axios.defaults.baseURL = "http://localhost:3001/";
axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/books" element={<Books />} />
        <Route path="/bookDetail/:bookId" element={<BookDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/cart" element={<CartDetail />} />
        <Route path="/profile" element={<Auth />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/404" element={<Error />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
