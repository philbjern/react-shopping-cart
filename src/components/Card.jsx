import "./Card.css";

const Card = ({ product }) => {
  return (
    <div className="card">
      <div className="image">
        <img src={product.image} alt={product.title}/>
      </div>
      <h1>{product.title}</h1>      
      <p className="description">{product.description}</p>
      <p className="price">{product.price}</p>
      <div class="controls">
        <input type="number" value="0"/>
        <button>Add to cart</button>
      </div>
    </div>
  )
}

export default Card;