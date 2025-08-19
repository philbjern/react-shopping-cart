import { Link } from "react-router-dom";
import './Navigation.css';

const Navigation = ({ itemsInCart }) => {
  return (
    <nav>
      <h1>🛒 therealschmidley store</h1>
      <ul>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li>{
          itemsInCart ? itemsInCart : 0
        }
        { itemsInCart === 1 ? ' item' : ' items' } in cart</li>
      </ul>
    </nav>
  )
}

export default Navigation;