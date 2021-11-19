import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
const controls = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"}
]

const buildControls = (props)=> (
    <div className={classes.BuildControls}>
    <div><p><strong>Total Price: {props.price.toFixed(2)}</strong></p></div>
    {controls.map(ctrl => (
        <BuildControl  
        label={ctrl.label} 
        key={ctrl.label}
        added = {()=> props.ingredientAdded(ctrl.type)}
        remove = {()=> props.ingredientRemove(ctrl.type)}
        disabled = {props.disabled[ctrl.type]}
         />
    ))}
    <button className= {classes.OrderButton} 
    disabled= {!props.purchasebtn}
    onClick={props.ordered}>Order Now</button>
    </div>
)

export default buildControls; 