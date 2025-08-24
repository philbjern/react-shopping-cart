import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Cart.css"
import CartRow from "./CartRow";

const Cart = () => {

  const { cart, clearCart, removeItemsFromCart, modalRef } = useOutletContext();
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const calculateTotal = (cart) => {
    let total = 0;
    cart.forEach(item => {
      total += item.product.price * item.amount;
    });
    return Math.floor(total * 100) / 100;
  }

  useEffect(() => {
    if (cart) {
      setTotal(calculateTotal(cart));
    }
  }, [])

  const handleClearCartClick = () => {
    if (cart.length === 0) return;

    modalRef.current.show("Are you sure you want to clear the cart?");
    
    // if (confirm('Are you shure you want to clear the cart?')) {
    //   clearCart();
    //   setTotal(0);
    //   navigate('/shop');
    // }
  }

  const handleCheckout = () => {
    if (total <= 0) return;
    alert('Redirecting to checkout for payment of ' + total + ' USD');
  }

  const calculateTotalItemsInCart = (cart) => {
    return cart.reduce((sum, item) => sum + item.amount, 0);
  }

  if (cart.length === 0) return (
    <div>
      <h2>Cart</h2>
      <h3 className="empty-cart-message">Your cart is empty, put some items in the cart</h3>
      <Link to="/shop">Go back to the shop</Link>
    </div>
  )

  return (
    <div>
      <h2>Cart</h2>
      <p>Items in cart: {calculateTotalItemsInCart(cart)}</p>
      { cart.length === 0 ? <h2>Your cart is empty</h2> : ''}
      {cart && cart.map(item => (
        <CartRow key={item.product.id} product={item.product} amount={item.amount} removeItemsFromCart={removeItemsFromCart}/>
      ))}
      <p>Total: <span className="total">{total} USD</span></p>
      <div className="cart-controls">
        <button onClick={handleCheckout}>Checkout</button>
        <button onClick={handleClearCartClick}>Clear cart</button>
      </div>
    </div>
  )
}

export default Cart;