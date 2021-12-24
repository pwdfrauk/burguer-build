import React, { Component } from "react";
import Auxiliary from "../../hoc/auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/Ui/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spiner from "../../components/Ui/Spiner/Spiner";
import withErrorHandler from "../../hoc/withErrorHandler";

const INGREDIENT_PRICE = {
  salad: 0.5,
  bacon: 1,
  cheese: 1.25,
  meat: 2,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    ingError:false,
  };
  componentDidMount() {
    axios
      .get(
        "https://burger-build-ea0da-default-rtdb.asia-southeast1.firebasedatabase.app/ingredient.json"
      )
      .then((res) => {
          console.log(res)
        this.setState({ ingredients: res.data });
      })
      .catch(err=> {
          this.setState({
            ingError:true
          })
      });
  }
  purchasingHandler = () => {
    this.setState({
      purchasing: true,
    });
  };
  cancelpurches = () => {
    this.setState({
      purchasing: false,
    });
  };
  purchasecontinue = () => {
    this.setState({
      loading: true,
    });
    //alert('Purchage is contineu ');
    const order = {
      ingredient: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Faruk Hosen",
        address: {
          street: "TeasSting Street",
          zipcode: "3540",
          country: "Bangldesh",
        },
        email: "teast@email.com",
      },
      deliveryMethod: "Fastest",
    };
    axios
      .post("/order.json", order)
      .then((res) => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch((error) => console.log(error));
  };

  updatePurchaseState = (ingredient) => {
    const sum = Object.keys(ingredient)
      .map((igkey) => {
        return ingredient[igkey];
      })
      .reduce((sum, el) => {
        return (sum = sum + el);
      }, 0);
    this.setState({
      purchasable: sum > 0,
    });
  };
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    let updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;

    const priceAdition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAdition;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });
    this.updatePurchaseState(updatedIngredients);
  };
  reomoveIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updateCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updateCount;

    const priceAdition = INGREDIENT_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAdition;

    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice,
    });
    this.updatePurchaseState(updatedIngredients);
  };
  render() {
    const desabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in desabledInfo) {
      desabledInfo[key] = desabledInfo[key] <= 0;
    }

    let orderSummary =  null 

    let burger =this.state.ingError? <p> Burger ingredient can't added</p>: <Spiner /> ;

    if (this.state.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemove={this.reomoveIngredientHandler}
            price={this.state.totalPrice}
            disabled={desabledInfo}
            purchasebtn={this.state.purchasable}
            ordered={this.purchasingHandler}
          />
        </Auxiliary>
      );
     
    orderSummary =  <OrderSummary
    ingredient={this.state.ingredients}
    ordercancle={this.cancelpurches}
    ordercontinue={this.purchasecontinue}
    price={this.state.totalPrice}
  /> 
   if (this.state.loading) {
    orderSummary =<Spiner/>
  }
    }
    return (
      <Auxiliary>
        <Modal show={this.state.purchasing} modalclose={this.cancelpurches}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}
export default withErrorHandler(BurgerBuilder, axios);
