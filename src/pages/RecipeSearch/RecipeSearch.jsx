// modules
import { useState } from "react"

// services
import * as recipeService from '../../services/recipeService'

const RecipeSearch = () => {
  const [formData, setFormData] = useState({
    query: ''
  })

  const [results, setResults] = useState([])

  const handleChange = evt => {
    setFormData({...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      // MAKE API CALL USING STATE
      const data = await recipeService.recipeSearch(formData)
      console.log(data)
      // SET RESULTS WITH RETURNED DATA
    } catch (error) {
      console.log(error)
    }
  }

  return ( 
    <>
      <h1>Recipe Search</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
    </>
  )
}

export default RecipeSearch