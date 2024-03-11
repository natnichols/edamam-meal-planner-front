// css
import styles from './ShoppingList.module.css'

const ShoppingList = (props) => {
  return ( 
    <div className={styles.shoppingContainer}>
      <h1>Shopping List</h1>
      {props.profile.shoppingList?.map(item => 
        <div className={styles.itemContainer} key={item._id}>
          <h3 key={item._id}>{item.item}</h3><h5>({item.recipe.title})</h5>
        </div>
      )}
    </div>
  )
}

export default ShoppingList