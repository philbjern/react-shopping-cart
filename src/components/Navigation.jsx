import { Link } from "react-router-dom";
import './Navigation.css';

const Navigation = ({ itemsInCart }) => {
  return (
    <nav>
      <h1>🛒 Shopping Cart</h1>
      <ul>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        { itemsInCart ? (
          <li>Items in cart : {itemsInCart}</li>
        ) : (
          <li>No items in cart</li>
        )}
      </ul>
    </nav>
  )
}

export default Navigation;