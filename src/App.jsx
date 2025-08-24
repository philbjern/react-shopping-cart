import { useEffect, useState, useRef } from 'react';
import { useNavigate, Outlet } from 'react-router-dom'
import './App.css'
import Navigation from './components/Navigation'
import Notifications from './components/Notifications';
import ConfirmModal from './components/ConfirmModal';

function App() {

  const [itemsInCart, setItemsInCart] = useState(0);
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [data, setData] = useState(null);
  const [dataCache, setDataCache] = useState([])

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const API_URL = `https://fakestoreapi.com`
  const NOTIFICATION_TIMEOUT = 3000;

  const fetchData = async (url) => {
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error('Fetching data from API failed');
    }
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchData(API_URL + '/products');
        setData(data);
        if (!dataCache || dataCache.length === 0) {
          setDataCache(data);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    })();
  }, [])

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

  const confirmAction = (message, onConfirm, onAbort) => {
    modalRef.current.show(message, onConfirm, onAbort);
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
    notify(`Added ${amount > 1 ? amount + ' pieces of' : ''} ${product.title} to cart`);
  };

  const removeItemsFromCart = (product, amount) => {
    if (amount <= 0) return;
    const message = `Are you sure you want to remove ${amount > 1 ? amount + ' pieces of' : ''} ${product.title} from the cart?`;

    modalRef.current.show(
      message,
      () => {
        setCart(prevCart => {
          const newCart = prevCart.filter(item => item.product.id !== product.id);
          return newCart;
        })
        notify(`Removed ${product.title} from cart`)
      },
      () => {
        console.log(`Canceled removing ${product.title} from cart`);
        return;
      }
    )
  }

  useEffect(() => {
    if (cart) {
      setItemsInCart(calculateItemCountInCart(cart));
    }
  }, [cart])

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

  const modalRef = useRef();

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="container">
      <ConfirmModal
        ref={modalRef}
        confirm={() => {
          clearCart();
          navigate('/shop')
        }}
        abort={() => console.log('Clear cart canceled')} />
      <Notifications notifications={notifications} />
      <Navigation itemsInCart={itemsInCart} />
      <Outlet context={{ data, setData, dataCache, setDataCache, addItemToCart, removeItemsFromCart, cart, clearCart, notify, modalRef }} />
    </div>
  )
}

export default App
