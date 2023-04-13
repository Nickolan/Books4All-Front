import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import Books from './components/Books/Books';
import Events from './components/Events/Events' 
import Cart from './components/Cart/Cart';
import Profile from './components/Profile/Profile'


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
