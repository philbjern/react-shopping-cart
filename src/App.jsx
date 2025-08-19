import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'
import './App.css'
import Navigation from './components/Navigation'
import Notifications from './components/Notifications';

function App() {

  const [itemsInCart, setItemsInCart] = useState(0);
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const NOTIFICATION_TIMEOUT = 3000;

  const notify = (message) => {
    const id = crypto.randomUUID();
    const notification = { id, message };

    setNotifications(prev => [...prev, notification]);

    setTimeout(() => {
      setNotifications(prev =>
        prev.filter(n => n.id !== id)
      );
    }, NOTIFICATION_TIMEOUT);
  };

  const addItemToCart = (product, amount) => {
    if (amount <= 0) return;

    setCart(prevCart => {
      let newCart;

      const existingItem = prevCart.find(item => item.product.id === product.id);

      if (existingItem) {
        newCart = prevCart.map(item => {
          if (item.product.id === product.id) {
            return { ...item, amount: item.amount + amount };
          }
          return item;
        });
      } else {
        newCart = [...prevCart, { product, amount }];
      }

      setItemsInCart(calculateItemCountInCart(newCart));

      return newCart;
    });
  };

  // const userId = 11;

  // useEffect(() => {
  //   fetch('https://fakestoreapi.com/carts/' + userId)
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //     setCart(data.products);
  //     setItemsInCart(calculateItemCountInCart(data.products));
  //   })
  // }, [])

  const calculateItemCountInCart = (cart) => {
    let itemCount = 0;
    cart.forEach(item => {
      itemCount += item.amount;
    });
    return itemCount;
  }

  const clearCart = () => {
    setCart([]);
    setItemsInCart(0);
    notify('Cart cleared');
  }

  return (
    <div className="container">
      <Notifications notifications={notifications}/>
      <Navigation itemsInCart={itemsInCart} />
      <Outlet context={{ addItemToCart, cart, clearCart, notify }} />
    </div>
  )
}

export default App
