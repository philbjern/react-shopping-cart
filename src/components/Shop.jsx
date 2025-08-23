import { useEffect, useState } from "react";
import Card from "./Card";
import './Shop.css'
import { useOutletContext } from "react-router-dom";

const Shop = () => {

  const API_URL = `https://fakestoreapi.com`
  const ITEMS_PER_ROW = 4
  const ITEMS_PER_PAGE = 2 * ITEMS_PER_ROW;

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addItemToCart, data, setData, dataCache } = useOutletContext();

  const [categories, setCategories] = useState([]);
  const [categoriesCount, setCategoriesCount] = useState({ 'all': dataCache.length })
  const [activeCategory, setActiveCategory] = useState('all')


  const handleAddToCart = (product, itemCount) => {
    addItemToCart(product, itemCount);
  }

  const filterShopItems = (category) => {
    if (!category) {
      return;
    }

    if (category === 'all') {
      setData(dataCache);
      setActiveCategory('all');
      return;
    }

    const filteredData = dataCache.filter(item => item.category === category);
    setData(filteredData);
    setActiveCategory(category);
    setPage(1);
  }

  const getUniqueCategoriesArray = (data) => {
    let categoriesArr = [];
    categoriesArr.push('all');
    let catCount = { 'all': data.length }
    data.forEach(item => {
      if (!categoriesArr.includes(item.category)) {
        categoriesArr.push(item.category);
      }
      if (!catCount[makeCategoryId(item.category)]) {
        catCount[makeCategoryId(item.category)] = 1;
      } else {
        catCount[makeCategoryId(item.category)]++;
      }
    })
    setCategoriesCount(catCount);
    return categoriesArr;
  }

  const makeCategoryId = (input) => {
    // remove all non small letters characters from input
    return input.replace(/[^a-z]/g, '');
  }

  useEffect(() => {
    if (dataCache) {
      const categories = getUniqueCategoriesArray(dataCache);
      setCategories(categories);
    }
    console.log(activeCategory)
  }, [])

  useEffect(() => {
    if (data) {
      const pagesAmount = Math.ceil(data.length / ITEMS_PER_PAGE);
      const pages = Array.from({ length: pagesAmount }, (_, i) => i + 1);
      setTotalPages(pages);
      setLoading(false);
    }
  }, [data])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h2>Shop</h2>
      <div className="categories-container">
        <b>Categories</b>
        <ul>
          {categories && categories.map((category, index) => {
            const styles = [activeCategory === category ? 'active' : '']
            return (<li onClick={() => filterShopItems(category)} className={styles.join(' ')} key={index}>{category} ({categoriesCount[makeCategoryId(category)]})</li>)
          })}

        </ul>
      </div>
      <div className="cards-container">
        {data && data.map((product, index) => (
          index >= (page - 1) * ITEMS_PER_PAGE && index < page * ITEMS_PER_PAGE &&
          <Card key={product.id} product={product} handleAddToCart={handleAddToCart} />
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