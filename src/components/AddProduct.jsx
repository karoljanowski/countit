import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import AddModal from './AddModal'
import Loading from './Loading'

export default function AddProduct({meal, addProduct, hideAddProduct}) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [displayModal, setDisplayModal] = useState(false)
    const [currentProduct, setCurrentProduct] = useState({})
    const [loading, setLoading] = useState(false)

    const searchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&json=1&page_size=10`);
        const data = await response.json();
        setResults(data.products);
      } catch (error) {
        console.log(error);
      }
      setLoading(false)
    }
    function handleClick(product){
      setCurrentProduct(product)
      setDisplayModal(true)
    }
    function hide(){
      hideAddProduct()
    }
    function hideModal(){
      setDisplayModal(false)
    }
    function save(product){
      addProduct(product)
      setDisplayModal(false)
    }
    const resultsElements = results.map(product => {
      return <div key={product.code} onClick={() => handleClick(product)} className='add-products__result'>
          <h2>{product.product_name}</h2>
          <p>Calories per 100g: {product.nutriments["energy-kcal_100g"]}</p>
          <p>Fat per 100g: {product.nutriments["fat_100g"]}</p>
          <p>Protein per 100g: {product.nutriments["proteins_100g"]}</p>
          <p>Carbohydrates per 100g: {product.nutriments["carbohydrates_100g"]}</p>
        </div>
    })

    return (
      <div className='add-products'>
        <div className="add-products__content">
          <div className="add-products__top">
            <h3 className='add-products__title'>Adding ingredient to {meal.name}</h3>
            <span className='add-products__icon'>
              <FontAwesomeIcon onClick={hide} icon={faXmark}></FontAwesomeIcon>
            </span>
          </div>
          <div className='add-products__top'>
            <input
              className='add-products__input'
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button disabled={loading} className='add-products__search' onClick={searchProduct}>Search</button>
          </div>
          <span className='add-products__info'>Click product to add to your meal</span>
          <div className="add-products__results">
            {loading && <Loading />}
            {results&&!loading && resultsElements}
          </div>
        </div>
        {displayModal && <AddModal save={save} hide={hideModal} data={currentProduct} />}
      </div>
    );
}
