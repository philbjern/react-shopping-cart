import { useEffect, useState } from "react";
import Card from "./Card";
import './Shop.css'
import { useOutletContext } from "react-router-dom";

const Shop = () => {

  const API_URL = `https://fakestoreapi.com`
  const ITEMS_PER_PAGE = 8;
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const { addItemToCart, notify } = useOutletContext();

  const handleAddToCart = (product, itemCount) => {
    addItemToCart(product, itemCount);
    if (itemCount > 0) {
      notify(`Added ${itemCount > 1 ? itemCount + 'pieces of' : ''} ${product.title} to cart`)
    }
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

  useEffect(() => {
    if (data) {
      const pagesAmount = Math.ceil(data.length / ITEMS_PER_PAGE);
      const pages = Array.from({ length: pagesAmount }, (_, i) => i + 1);
      setTotalPages(pages);
    }
    console.log(totalPages);
  }, [data])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h2>Shop</h2>
      <div className="cards-container">
        {data && data.map((product, index) => (
          index >= (page - 1) * ITEMS_PER_PAGE && index < page * ITEMS_PER_PAGE && 
          <Card key={product.id} product={product} handleAddToCart={handleAddToCart}/>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Prev</button>
        {totalPages.map(item => {
          const styles = ['page-number', page === item ? 'active' : '']
          return <span className={styles.join(' ')} key={item} onClick={() => setPage(item)}>{item}</span>
        })}
        <button onClick={() => setPage(page + 1)} disabled={page * ITEMS_PER_PAGE >= data.length}>Next</button>
      </div>
    </div>
  )
}

export default Shop;