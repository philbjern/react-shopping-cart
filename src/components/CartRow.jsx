import "./CartRow.css";

const CartRow = ({ product, amount, removeItemsFromCart, modalRef }) => {
  return (
    <div className="cart-row">
      <div className="display-flex">
        <div className="image">
          <img src={product.image} alt={product.title} />
        </div>
        <div>
          <p>
            <span className="product-title">{amount} x {product.title}</span>
          </p>
          <p>
            <span className="product-description">{product.description}</span>
          </p>
          <p>
            <span className="product-price">{product.price} USD </span> - 
            <span className="amount"> {amount}</span>
            { amount > 1 ? ' items' : ' item'}
          </p>
        </div>

      </div>
      <div className="remove-button-container">
        <button onClick={() => removeItemsFromCart(product, amount)}>Remove</button>
      </div>
    </div>
  )
}

export default CartRow;