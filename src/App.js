import React,
{ Component,
  button,
  input } from 'react';
import './App.css';

const FoodCategories = [
  { name: 'Main Dish', image: 'MainDish' },
  { name: 'Side Dish', image: 'SideDish' },
  { name: 'Drink', image: 'Tea' },
  { name: 'Salad', image: 'Salad' },
  { name: 'Dessert', image: 'Dessert' }
];

const Fooditems = [
  { name: 'Steak', type: 'Main Dish', image: 'MainDish' },
  { name: 'Mashed potatoes', type: 'Side Dish', image: 'MainDish' },
  { name: 'Rice', type: 'Side Dish', image: 'MainDish' },
  { name: 'Sandwhich', type: 'Main Dish', image: 'MainDish' },
  { name: 'Fries', type: 'Side Dish', image: 'MainDish' },
  { name: 'Steak', type: 'Main Dish', image: 'MainDish' },
  { name: 'Mashed potatoes', type: 'Side Dish', image: 'MainDish' },
  { name: 'Rice', type: 'Side Dish', image: 'MainDish' },
  { name: 'Sandwhich', type: 'Main Dish', image: 'MainDish' },
  { name: 'Fries', type: 'Side Dish', image: 'MainDish' }
];

// eslint-disable-next-line react-prefer-stateless-function
class App extends Component {
  constructor(props) {
    super(props);
    // We want to have state because we are dealing with
    // a changing data based on a serch term

    // This is our inital state
    this.state = {
      Food: null,
      selectedFood: null
    };
  }
  render() {
    const categories = FoodCategories.map(FoodCategory => (
      <div className="Square">
        <button className="No-focus Square">
          <img className="Category-image" src={`../src/FoodImages/${FoodCategory.image}.jpg`} alt="Hi" />
          <p>{FoodCategory.name}</p>
        </button>
      </div>
    ));

    const food = Fooditems.map(foodItem => (
      <div className="Square">
        <button className="No-focus Square">
          <img src={`../src/FoodImages/${foodItem.image}.jpg`} alt="Hi" />
          <p> {foodItem.name} </p>
        </button>
      </div>
    ));

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Munchies</h1>
          <div className="Login-form">
            <input className="No-focus" type="username" value="Username" />
            <input className="No-focus" type="password" value="password" />
            <button className="No-focus"> Login </button>
          </div>

        </header>
        <div className="Square-list"> {categories}</div>
        <div className="Square-list"> {food} </div>
      </div>
    );
  }
}

export default App;
