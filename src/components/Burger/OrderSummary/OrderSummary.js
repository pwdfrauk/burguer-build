import Auxiliary from "../../../hoc/auxiliary";

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
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <button  onClick= {props.ordercancle}>CANCEL</button>
            <button  onClick ={props.ordercontinue} >PURCHASE</button>
        </Auxiliary>
    )
}
export default OrderSummary;