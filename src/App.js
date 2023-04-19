import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "./views/Home/Home";
import About from "./views/About/About";
import Books from "./views/Books/Books";
import Events from "./views/Events/Events"
import Cart from './views/Cart/Cart';
import Profile from './views/Profile/Profile';
import Error from './views/Error/Error';
import { BookDetail } from './views/BookDetail/BookDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import CartDetail from './components/CartDetail/CartDetail';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/books' element={<Books />} />
        <Route path='/bookDetail/:bookId' element={<BookDetail />} />
        <Route path='/events' element={<Events />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/404' element={<Error />} />
        <Route path='*' element={<Navigate to='/404' />} />

        <Route path='/cart' element={<CartDetail/>} />
        
      </Routes>
    </div>
  );
}

export default App;
