import Auxiliary from "../../../hoc/auxiliary";
import button from "../../Ui/Button/button"

const OrderSummary =(props)=> {
    const orderIgredient = Object.keys(props.ingredient)
    .map(igkey => {
        return <li key={igkey}><span style={{textTransform:'capitalize'}}>{igkey}</span> : {props.ingredient[igkey]}</li>
    })
        
    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicious burger with f0llowing ingredients: </p>
            <ul>
                {orderIgredient}
            </ul>
            <p>Continue to checkout?</p>
            <button btnType='Denger' onClick= {props.ordercancle}>CANCEL</button>
            <button btnType='Success' onClick ={props.ordercontinue} >PURCHASE</button>
        </Auxiliary>
    )
}
export default OrderSummary;