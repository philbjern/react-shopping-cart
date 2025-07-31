import { useEffect, useState } from "react";
import Card from "./Card";
import './Shop.css'
import { useOutletContext } from "react-router-dom";

const Shop = () => {

  const API_URL = `https://fakestoreapi.com`

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const { addItemToCart } = useOutletContext();

  const handleAddToCart = (product, itemCount) => {
    addItemToCart(product, itemCount);
  }

  const fetchData = async (url) => {
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error('Fetching data from API failed');
    }
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchData(API_URL + '/products');
        console.log(data);
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    })();
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h2>Shop</h2>
      <div className="cards-container">
        {data && data.map(product => (
          <Card key={product.id} product={product} handleAddToCart={handleAddToCart}/>
        ))}
      </div>
    </div>
  )
}

export default Shop;