
import React, { Component} from "react"
import Auxiliary from "../../hoc/auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/Ui/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const   INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 1, 
    cheese: 1.25,
    meat:2
}
class BurgerBuilder extends Component {
    state = {
        ingredients : {
            salad: 0,
            bacon : 0, 
            cheese:0,
            meat: 0,
        }, 
        totalPrice: 4, 
        purchasable :false,
        purchasing:false,
    }
    purchasingHandler = ()=>  {
        this.setState({
            purchasing:true
        })
    }
    cancelpurches = ()=> {
        this.setState({
            purchasing:false
        })
    }
    purchasecontinue = () => {
        alert('Purchage is contineu ');
    }
    updatePurchaseState = (ingredient)=> {
        const sum = Object.keys(ingredient)
        .map(igkey=> {
            return ingredient[igkey]
        }).reduce((sum, el)=> {
            return sum = sum +el ;
        }, 0)
        this.setState({
            purchasable: sum > 0 
        })
    }
    addIngredientHandler = (type)=> {
        const oldCount = this.state.ingredients[type];  
        const updatedCount  = oldCount + 1; 
        let updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceAdition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAdition; 

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchaseState(updatedIngredients)

    }
    reomoveIngredientHandler = (type)=> {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0 ) {
            return;
        }
        const updateCount = oldCount - 1 ;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updateCount;

        const priceAdition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAdition;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchaseState(updatedIngredients)

    }
     render () {
         const desabledInfo = {
             ...this.state.ingredients
         }
         for(let key in desabledInfo) {
             desabledInfo[key] = desabledInfo[key] <= 0;
         }
        return( 
        <Auxiliary>
            <Modal show = {this.state.purchasing} modalclose ={this.cancelpurches}> 
                <OrderSummary ingredient = {this.state.ingredients} 
                ordercancle = {this.cancelpurches}
                ordercontinue= {this.purchasecontinue}  />
            </Modal>
            <Burger ingredients= {this.state.ingredients} />
            <BuildControls 
                ingredientAdded = {this.addIngredientHandler}
                ingredientRemove = {this.reomoveIngredientHandler}
                price = {this.state.totalPrice}
                disabled = {desabledInfo}
                purchasebtn={this.state.purchasable}
                ordered = {this.purchasingHandler}
            />
        </Auxiliary>)
    }
}
export default BurgerBuilder;