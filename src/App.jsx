import { useState } from 'react'
import './App.css'
import Login from './pages/login/Login'
import RecipeBank from './pages/recipeBank/RecipeBank'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <route path="/login" component={Login} />
      <route path="/recipe-bank" component={RecipeBank} />
    </>
  )
}

export default App
