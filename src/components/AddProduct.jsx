import React, {useState} from 'react'

export default function AddProduct() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [r, sR] = useState([])

    const searchIngredients = () => {
        try {
          fetch(`https://api.spoonacular.com/food/ingredients/search?query=${query}&apiKey=60a5a2687c6c4b56a789a58833762101`)
          .then(res => res.json())
          .then(data => setResults(data.results))
        } catch (error) {
            console.error(error);
        }
    }
    const ingredients = () => {
      try{
        fetch('https://api.spoonacular.com/food/ingredients/9040/information?apiKey=60a5a2687c6c4b56a789a58833762101&amount=100&units="g"')
        .then(res => res.json())
        .then(data => sR(data))
      }catch(error){
        console.log(error)
      }
    }


    const resultsElements = results.map(i => {
      return <div>{i.name}</div>
    })

    return (
      <div className='add-products'>
        <div className="add-products__content">
          <h3 className='add-products__title'>Adding ingredient to MEAL1</h3>
          <div className='add-products__top'>
            <input
              className='add-products__input'
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button className='add-products__search' onClick={searchIngredients}>Search</button>
          </div>
    
          {results && resultsElements}
        </div>
      </div>
    );
}
