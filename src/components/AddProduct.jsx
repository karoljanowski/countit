import React, {useState} from 'react'

export default function AddProduct({name}) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    const searchIngredients = async () => {
      try {
        const response = await fetch(`https://api.spoonacular.com/food/ingredients/search?query=${query}&apiKey=60a5a2687c6c4b56a789a58833762101`);
        const data = await response.json()
        const results = data.results;
        const resultWithCalories = [];
        for (let i = 0; i < results.length; i++) {
          const result = results[i];
          const response = await fetch(`https://api.spoonacular.com/food/ingredients/${result.id}/information?unit=g&amount=100&apiKey=60a5a2687c6c4b56a789a58833762101`);
          const data = await response.json();
          resultWithCalories.push({
            ...result,
            calories: data.nutrition.nutrients.find(n => n.name === 'Calories').amount,
            fat: data.nutrition.nutrients.find(n => n.name === 'Fat').amount,
            protein: data.nutrition.nutrients.find(n => n.name === 'Protein').amount,
            carbohydrate: data.nutrition.nutrients.find(n => n.name === 'Carbohydrates').amount
          });
        }
        setResults(resultWithCalories);
      } catch (error) {
        console.error(error);
      }
    }

    const resultsElements = results.map(i => {
      return <div className='add-products__result'>{i.name} {i.calories}/{i.protein}/{i.fat}/{i.carbohydrate}</div>
    })

    return (
      <div className='add-products'>
        <div className="add-products__content">
          <h3 className='add-products__title'>Adding ingredient to {name}</h3>
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
