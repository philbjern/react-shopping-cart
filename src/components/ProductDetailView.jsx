import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

const ProductDetailView = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({})
  const { data } = useOutletContext();
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(false);
  const [ itemCount, setItemCount ] = useState(1);
  const { addItemToCart } = useOutletContext();

  const handleAddToCart = (product, itemCount) => {
    addItemToCart(product, parseInt(itemCount));
  }

  useEffect(() => {
    if (data && productId) {
      const product = getProductById(data, parseInt(productId));
      setProduct(product);
      setLoading(false);
    } else {
      setError(true);
    }
  }, [data, productId]);

  const getProductById = (data, id) => {
    const product = data.find(item => item.id === id);
    return product;
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="product-detail">
      <p><button onClick={() => window.history.back()}>Back</button></p>
      <h1>{product.title}</h1>
      <p>Category: {product.category}</p>
      <div className="product-detail-image-container">
        <img src={product.image} alt={product.title} />
        <div>
          <p>{product.description}</p>

          <div className="price">
            Price: {product.price} USD
          </div>
          <div className="rating">
            Rating: {product.rating.rate} out of {product.rating.count} reviews
          </div>

          <div className="controls">
            <input type="number" value={itemCount} onChange={(e) => setItemCount(e.target.value)}/>
            <button onClick={() => setItemCount(itemCount + 1)}>+</button>
            <button onClick={() => itemCount > 0 ? setItemCount(itemCount - 1) : setItemCount(0)}>-</button>
            <button onClick={() => handleAddToCart(product, itemCount)} className="flex-1">Buy</button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default ProductDetailView;