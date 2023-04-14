import './App.css';

import { Routes, Route } from 'react-router-dom';
import Home from "./views/Home/Home";
import About from "./views/About/About";
import Books from "./views/Books/Books";
import Events from "./views/Events/Events"
import Cart from './views/Cart/Cart';
import Profile from './views/Profile/Profile';
import {BookDetail} from './views/BookDetail/BookDetail';
import ReviewFormPage from './views/ReviewFormPage/ReviewFormPage';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/books' element={<Books/>}/>
      <Route path='/bookDetail/:bookId' element={<BookDetail/>}/>
      <Route path='/createReview' element={<ReviewFormPage/>}/>
      <Route path='/events' element={<Events/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
  );
}

export default App;
