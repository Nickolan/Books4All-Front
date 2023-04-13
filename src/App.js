import './App.css';

import { Routes, Route } from 'react-router-dom';
import Home from "./views/Home/Home";
import About from "./views/About/About";
import Books from "./views/Books/Books";
import Events from "./views/Events/Events"
import Cart from './views/Cart/Cart';
import Profile from './views/Profile/Profile'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/books' element={<Books/>}/>
      <Route path='/events' element={<Events/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
  );
}

export default App;
