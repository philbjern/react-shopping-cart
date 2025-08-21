import { useContext } from "react";
import { useParams } from "react-router-dom";

const ProductDetailView = () => {
  const { productId } = useParams();
  const { products } = useContext();

  return (
    <div>
      <h1>Product detail view</h1>
      <p>Product id: {productId}</p>
    </div>
  )
}

export default ProductDetailView;