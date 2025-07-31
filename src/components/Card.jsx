import { useState } from "react";
import "./Card.css";

const Card = ({ product, addToCart }) => {

  const DESCR_WORD_COUNT = "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day".split(' ').length;

  const [itemCount, setItemCount] = useState(0);

  const truncateDescription = (description, wordCount) => {
    const words = description.split(' ');
    const truncatedWords = words.slice(0, wordCount);
    truncatedWords.push('...')
    const truncatedDescription = truncatedWords.join(' ');
    return truncatedDescription;
  }

  const handleAddToCartClick = () => {
    addToCart(product, itemCount);
  }

  return (
    <div className="card">
      <div className="card-content">
        <div className="image">
          <img src={product.image} alt={product.title} />
        </div>
        <h1>{product.title}</h1>
        <p className="description">{truncateDescription(product.description, DESCR_WORD_COUNT)}</p>
        <p className="price">{product.price} USD</p>
      </div>
      <div class="controls">
        <input type="number" value={itemCount} onChange={(e) => setItemCount(e.target.value)}/>
        <button onClick={() => setItemCount(itemCount + 1)}>+</button>
        <button onClick={() => itemCount > 0 ? setItemCount(itemCount - 1) : setItemCount(0)}>-</button>
      </div>
      <div className="controls">
        <button onClick={handleAddToCartClick}>Add to cart</button>
      </div>
    </div>
  )
}

export default Card;