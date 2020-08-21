import React,{useState, useEffect} from 'react';
import './App.css';
import Recipe from './React';

const App = () => {
  const[recipes,setRecipe] = useState ([]);
  const[search,setSearch]= useState('');
  const[query,setQuery] = useState('');

  const app_id = '17045f49';
  const app_key = '4df0ae271fbcd2c08f73fae231252f5d';

  
  useEffect( () => {
    getRecipe()
  },[query])

  const getRecipe = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${app_id}&app_key=${app_key}`)
    const data = await response.json();
    setRecipe(data.hits)
  }

  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search)
    setSearch('')
  }
  

  return (
    
    <div className="app">
<div className="header">
  <h1>The Recipe App</h1>
</div>
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" placeholder="Search for any recipe..." value={search} onChange={updateSearch}></input>
        <button className="search-button" type="submit">Search !</button>
      </form>
      <div className="recipes">
      
      {recipes.map(recipe => (
        <Recipe 
        title = {recipe.recipe.label}
        calories = {recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
      />

      ))}
      </div>
    </div>

  );
}

export default App;