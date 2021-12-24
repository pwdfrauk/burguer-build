import classes from './NavigationItem.module.css'
const NavigationItem=(props)=> {
    return(
        <li className={classes.NavigationItem} >
        <a href={props.Link} className={ props.active? classes.active : null }>
        {props.children}
        </a>
        </li>
    )
}
export default NavigationItem;