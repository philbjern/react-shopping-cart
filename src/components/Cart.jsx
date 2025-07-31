import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import "./Cart.css"
import CartRow from "./CartRow";

const Cart = () => {

  const { cart, clearCart } = useOutletContext();
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const calculateTotal = (cart) => {
    let total = 0;
    cart.forEach(item => {
      total += item.product.price * item.amount;
    });
    return total;
  }

  useEffect(() => {
    if (cart) {
      setTotal(calculateTotal(cart));
    }
  }, [])

  const handleClearCartClick = () => {
    if (cart.length === 0) return;
    if (confirm('Are you shure you want to clear the cart?')) {
      clearCart();
      setTotal(0);
      navigate('/shop');
    }
  }

  const handleCheckout = () => {
    if (total <= 0) return;
    alert('Redirecting to checkout for payment of ' + total + ' USD');
  }

  return (
    <div>
      <h2>Cart</h2>
      <p>Items in cart: {cart.length}</p>
      {cart && cart.map(item => (
        <CartRow key={item.product.id} product={item.product} amount={item.amount} />
      ))}
      <p>Total: {total} USD</p>
      <div className="cart-controls">
        <button onClick={handleCheckout}>Checkout</button>
        <button onClick={handleClearCartClick}>Clear cart</button>
      </div>
    </div>
  )
}

export default Cart;