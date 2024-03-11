// npm modules
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// services
import * as recipeService from '../../services/recipeService'


const RecipeDetails = () => {
  const { edamamId } = useParams()
  const [recipe, setRecipe] = useState({})

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const data = await recipeService.recipeDetails(edamamId)
      setRecipe(data)
    }
    fetchRecipeDetails()
  }, [edamamId])

  return ( 
    <>
    {recipe.uri ?
      <div>
        <h1>Recipe Details</h1>
        <img src={recipe.images.REGULAR.url} alt="Image of this recipe" />
      </div>
    :
      <h2>Loading...</h2>
    }
    </>
  )
}

export default RecipeDetails