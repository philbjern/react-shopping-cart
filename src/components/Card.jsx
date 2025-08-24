import { useState } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ product, handleAddToCart }) => {

  const DESCR_WORD_COUNT = "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day".split(' ').length;

  const [itemCount, setItemCount] = useState(1);

  const truncateDescription = (description, wordCount) => {
    const words = description.split(' ');
    const truncatedWords = words.slice(0, wordCount);
    truncatedWords.push('...')
    const truncatedDescription = truncatedWords.join(' ');
    return truncatedDescription;
  }

  return (
    <div className="card">
      <div className="card-content flex-1">
        <div className="image">
          <img src={product.image} alt={product.title} />
        </div>
        <h1><Link to={'./' + product.id}>{product.title}</Link></h1>
        <p className="description">{truncateDescription(product.description, DESCR_WORD_COUNT)}</p>
        </div>
        <div>
        <p className="price">Price: {product.price} USD</p>
      </div>
      <div className="controls">
        <input type="number" value={itemCount} onChange={(e) => setItemCount(e.target.value)}/>
        <button onClick={() => itemCount > 1 ? setItemCount(itemCount - 1) : setItemCount(1)}>-</button>
        <button onClick={() => setItemCount(itemCount + 1)}>+</button>
        <button onClick={() => handleAddToCart(product, itemCount)} className="flex-1">Buy</button>
      </div>
    </div>
  )
}

export default Card;