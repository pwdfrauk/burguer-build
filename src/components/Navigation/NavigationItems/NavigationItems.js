import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'
const NavigationItems =()=> {
    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem Link="/" active >Burger Builder</NavigationItem>
            <NavigationItem Link='/'>Checkout </NavigationItem>
        </ul>
    )
}

export default NavigationItems;