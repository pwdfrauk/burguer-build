import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from './Burger.module.css';

const Burger =(props) => {
  

    let transformIngredient = Object.keys(props.ingredients).map(igkey => {
        return [...Array(props.ingredients[igkey])].map((_, i)=> {
            return  <BurgerIngredient key={igkey + i} type={igkey} />
        })
    }).reduce((arr, el)=> {
        return arr.concat(el);
    }, [])
    if(transformIngredient.length === 0) {
        transformIngredient = <p>Please add ingredient</p>
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
                {transformIngredient}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}
export default Burger;