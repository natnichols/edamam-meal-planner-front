// npm modules
import { NavLink } from 'react-router-dom'

// css
import styles from './RecipeIndex.module.css'

const RecipeIndex = (props) => {
  return ( 
    <div className={styles.recipeContainer}>
      <h1>My Recipes</h1>
      {props.profile.recipes.map(recipe => 
        <NavLink to={`/recipes/${recipe.edamamId}`} key={recipe.edamamId}>
          <h2>{recipe.title}</h2>
        </NavLink>
      )}
    </div>
  )
}

export default RecipeIndex