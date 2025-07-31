import { Link } from "react-router-dom";
import './Navigation.css';

const Navigation = ({ itemsInCart }) => {
  return (
    <nav>
      <h1>🛒 therealschmidley Shop</h1>
      <ul>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/cart">Cart</Link> ({
          itemsInCart ? itemsInCart : 0
        })
        { itemsInCart === 1 ? ' item' : ' items' }</li>
      </ul>
    </nav>
  )
}

export default Navigation;