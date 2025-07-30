import { useState } from 'react';
import { Outlet } from 'react-router-dom'
import './App.css'
import Navigation from './components/Navigation'

function App() {

  const [itemsInCart, setItemsInCart] = useState(0);

  return (
   <div className="container">
    <Navigation itemsInCart={itemsInCart}/>
    <Outlet />
   </div> 
  )
}

export default App
