// npm modules
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// services
import * as recipeService from '../../services/recipeService'

// css
import styles from './RecipeDetails.module.css'

const RecipeDetails = (props) => {
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


  const handleSaveRecipe = () => {
    // run function passed down as prop
    props.handleAddRecipe({title: recipe.label, edamamId: edamamId})
  }

  const handleAddIngredient = () => {
    props.handleAddToShoppingList({
      ingredients: recipe.ingredientLines,
      edamamId: edamamId
    })
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
        <div>
          <button onClick={handleToggleIngredientDisplay} className={styles.ingredientDisplay}>{displayIngredients ? 'Hide' : 'Show'} Ingredients</button>
          {
            !props.profile.recipes.some(rec => rec.edamamId === edamamId)
            &&
            <button onClick={handleSaveRecipe} className={styles.saveRecipe}>Save Recipe</button>
          }
        </div>
        
        {displayIngredients && 
          <>
            <ul>
              {recipe.ingredientLines.map(ingredient => 
                <li key={ingredient}>{ingredient}</li>
              )}
            </ul>
            {
              props.profile.recipes.some(rec => rec.edamamId === edamamId)
              &&
              <button 
                className={styles.ingredientButton}
                onClick={handleAddIngredient}
              >
                Add to Shopping List
              </button>
            }
          </>
        }
      </div>
    :
      <h2>Loading...</h2>
    }
    </>
  )
}

export default RecipeDetails