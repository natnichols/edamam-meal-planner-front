// npm modules
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// services
import * as recipeService from '../../services/recipeService'

// css
import styles from './RecipeDetails.module.css'

const RecipeDetails = () => {
  const { edamamId } = useParams()
  const [recipe, setRecipe] = useState({})
  const [displayIngredients, setDisplayIngredients] = useState(false)

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const data = await recipeService.recipeDetails(edamamId)
      setRecipe(data)
    }
    fetchRecipeDetails()
  }, [edamamId])

  const handleToggleIngredientDisplay = () => {
    setDisplayIngredients(!displayIngredients)
  }

  return ( 
    <>
    {recipe.uri ?
      <div className={styles.recipeContainer}>
        <h1>{recipe.label}</h1>
        <img src={recipe.images.REGULAR.url} alt="Image of this recipe" />
        <a href={recipe.url}>Instructions</a>
        <h3>Calories: {Math.floor(recipe.calories)}</h3>
        <h3>Prep Time: {Math.floor(recipe.totalTime)} min</h3>
        <h3>Feeds: {recipe.yield}</h3>
        <button onClick={handleToggleIngredientDisplay} className={styles.ingredientDisplay}>{displayIngredients ? 'Hide' : 'Show'} Ingredients</button>
        {displayIngredients && 
          <ul>
            {recipe.ingredientLines.map(ingredient => 
              <li key={ingredient}>{ingredient}</li>
            )}
          </ul>
        }
      </div>
    :
      <h2>Loading...</h2>
    }
    </>
  )
}

export default RecipeDetails