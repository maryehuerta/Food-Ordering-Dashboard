import React, { Component, button, input } from 'react';
import './App.css';
import Auth from './UserAuth/Auth'


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRegistering: false,
      isLoggedin: false,
      isCreatingProduct: false,
      isOrdering: false,
      isPaying: false,
      isFoodVisible: true,
      isEditing: false,

      user: null,      
      username: null,
      email: null,
      password: null,
      IdNo: null,
      phone: null,
      address: null,
      name: null,
      credit: null,

      food: [],      
      isSalad: 0,
      isAppetizer: 0,
      isBeverage: 0,
      isDessert: 0,
      isMainDish: 0,
      selectedOption: "Salad",

      productName: null,
      productDescription: null,
      productImage: null,
      productPrice: null,
      productId: null,

      Quantity: null,
      choosenProduct: null,
      total: 0,
      orderId: null
    };
  }

  componentWillMount() {
    this.loadProducts()
    // this.createUsers()
  }

  // Random user generation automation!
  createUsers = () => {
    for(var i = 0 ; i < 20 ; i++){
      fetch('https://randomuser.me/api/').then((res) => (
        res.json()
      ).then((res) => {
        console.log(res.results[0])
        let user = res.results[0]
        const username = user.login.username
        const email= user.email
        const password = user.login.password
        const phone= user.phone
        const address= `${user.location.street} ${user.location.city} ${user.location.state} ${user.location.postcode}`
        const name= `${user.name.first} ${user.name.last}`
        fetch('http://localhost:8080/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
            name: name,
            email: email,
            password: password, 
            address: address, 
            username: username, 
            phone: phone})
        }).then((res) => (
          res.json()
        )).then((res) => {
          console.log(res)
          this.setState({IdNo: res[0], isLoggedin: true, isRegistering: false})
        }).catch((err) => window.alert(err))
      }).catch((err) => {
        window.alert(err)
      })
    )
  }
  }

  // Fetch products from the database
  loadProducts = () => {
    fetch('http://localhost:8080/products').then((products) => products.json()).then((products) => {
      this.setState({food: products})
      console.log(this.state.food)
    })
  }

  // Compares login information entered with login of the database
  // If the user name and password match it returns the 
  // user's information
  _login = () => {
    const {email, password} = this.state;

    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: password})
    })
    .then((user) => (user.json()))
    .then((user) => {
      if(user.err){
        alert(user.err)
      }else{
        window.localStorage.setItem("user", JSON.stringify(user))
        console.log(JSON.stringify(user.id))
        this.setState({ user: user,
          username: user.username,
          IdNo: user.id,
          name: user.name,
          isLoggedin: true,
          isRegistering: false })
      }
    })
    .catch((err)=> {
      console.error(err)
    })
  }

  // Registers a new user 
  _register = () => {
    // Destructure our state
    const {address, phone, email, username, password, name} = this.state
    // Validate all inputs
    if (address === null || address.length > 255 ) {
      window.alert("Address should be at max 255 characters")
      return false;
    } else if (phone === null || phone.length !== 12) {
      window.alert(" Phone number should be in format ###-###-####")
      return false
    } else if (email === null || email.length > 100) {
      window.alert("Email should be max 100 characters.")
      return false
    } else if (username  === null || (username < 8 || username > 12 )) {
      window.alert("Username should be between 8 and 12 characters long")
      return false
    } else if (password  === null || (password < 8 || password > 12)) {
      window.alert("Password should be between 8 and 12 characters long")
      return false
    }

    // Call the server
    fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
        name: name,
        email: email,
        password: password, 
        address: address, 
        username: username, 
        phone: phone})
    }).then((res) => (
      res.json()
    )).then((res) => {
      console.log(res)
      this.setState({IdNo: res[0], isLoggedin: true, isRegistering: false})
    }).catch((err) => window.alert(err))
    // On success, set the user
    // this.setState({isLoggedin: true, isRegistering: false})
  }

  // Creates a product
  _createProduct = () => {
    const { 
      productName,
      productDescription,
      productImage,
      productPrice,
      isAppetizer,
      isBeverage,
      isDessert,
      isMainDish,
      isSalad } = this.state
    
      // Validates information in input boxes
    if (productName === null) {
      window.alert("Enter a Product Name")
      return false;
    } else if (productImage  === null) {
      window.alert("Enter a Product Image")
      return false;
    } else if (productDescription  === null) {
      window.alert("Enter a Product Decription")
      return false;
    } else if (productPrice === null) {
      window.alert("Enter a Price")
      return false;
    }
    // 
    fetch('http://localhost:8080/products/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          Product_Image: productImage,
          Description: productDescription,
          Price: productPrice, 
          isSalad: isSalad, 
          isMainDish: isMainDish, 
          isDessert: isDessert,
          isAppetizer: isAppetizer,
          isBeverage: isBeverage,
          ProductName: productName,
        })
    }).then((res) => (
      res.json()
    )).then((res) => {
      console.log(res)
      this.setState({ProductID: res[0], isCreatingProduct: false})
    }).catch((err) => window.alert(err))
    
  }

  // Updates the state with order information ie the product and the total
  _createPayment = () => {
    console.log(this.state.choosenProduct)
    this.setState({isOrdering: false, isPaying: true, isFoodVisible: false, total: this.state.Quantity * this.state.choosenProduct.Price})
  }

  // Creates an order 
  _createOrder = () => {
    const { 
      choosenProduct,
      total, //order total
      credit, //credit card information
      IdNo,
      Quantity 
     } = this.state
     // Validate credit card information
     if (credit === null) {
      window.alert("Enter a valid credit card number")
      return false;
    }
    //Calls the server
    fetch('http://localhost:8080/orders/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          product_id: choosenProduct.ProductId,
          customer_id: IdNo,
          quantity: Quantity,
          total_price: total,
          credit_card_number: credit
        })
    }).then((res) => (
      res.json()
    )).then((res) => {
      console.log(res)
      this.setState({orderId: res[0], isPaying: false, isFoodVisible: true}) //the database assigns an order id and the server sends it back as res[0]
      window.alert("Order Complete! Have a nice day!")
   }).catch((err) => window.alert(err))
  }

  // Updates the state with the email address of the user when they type in the email input box during login
  handleEmail = (e) => {
    this.setState({email: e.target.value})

  }
  // Updates the state with the password  of the user when they type in the password input box during login
  handlePassword = (e) => {
    this.setState({password: e.target.value})
  }

  //Updates the state so the user is brought to the order page
  handleOrder = (choosenProduct) => {
    // Validates if the user is logged in before creating an order
    if(!this.state.isLoggedin) {
      window.alert("Please login to create an order")
      return false;
    }
    this.setState({isOrdering: true, choosenProduct })
  }
  // When the radio buttons are pressed during CreateProduct and UpdateProduct this updates the state
  handleOptionChange = (changeEvent) => {

    this.setState({
      selectedOption: changeEvent.target.value,
      isSalad: 0,
      isAppetizer: 0,
      isBeverage: 0,
      isMainDish: 0,
      isDessert: 0,
    })

    // Change the selected values boolean to true by creating an object to pass into the state
    const key = `is${changeEvent.target.value}`
    var obj  = {}
    obj[key] = 1
    console.log(key)
    this.setState(obj)
  }

  // Deletes a User
  deleteAccount = () => {
    //Clears local Storage
    window.localStorage.clear();

    //Calls server and clears all user information in the state
    fetch('http://localhost:8080/users/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          IdNo: this.state.IdNo
        })
    }).then((res) => {
      console.log(res)
      this.setState({
        user: null,      
        username: null,
        email: null,
        password: null,
        IdNo: null,
        phone: null,
        address: null,
        name: null,
        credit: null,
        isLoggedin: false
      })
    }).catch((err) => window.alert(err))

  }

  // If the user presses the edit button the product they want to edit is updated in the state
  handleEdit = (choosenProduct) => {
    //Validates if the user is loggined 
    if(!this.state.isLoggedin) {
      window.alert("Please login to edit a product")
      return false;
    }
    this.setState({
      isEditing: true,
      isFoodVisible: false,
      choosenProduct: choosenProduct,
      productName: choosenProduct.ProductName,
      productDescription: choosenProduct.Description,
      productImage: choosenProduct.Product_Image,
      productPrice: choosenProduct.Price,

     })

     console.log(Object.keys(choosenProduct))
  }
  
  // Updates the state to bring user to register page
  setRegisterState = () => {
    this.setState({isRegistering: true})
    
  }

  // Updates state if the user is loggedin
  userLoggedIn = () => {
    this.setState({isRegistering: false, isLoggedin: true})
  }

  // After a product is edited the server is called to update the product information
  handleEditSumbit = () => {
    //Get's values of the state
    const { 
      productName,
      productDescription,
      productImage,
      productPrice,
      isSalad,
      isMainDish,
      isDessert,
      isAppetizer,
      isBeverage
     } = this.state
    

    //Validates information entered
    if (productName === null) {
      window.alert("Enter a Product Name")
      return false;
    } else if (productImage  === null) {
      window.alert("Enter a Product Image")
      return false;
    } else if (productDescription  === null) {
      window.alert("Enter a Product Decription")
      return false;
    } else if (productPrice === null) {
      window.alert("Enter a Price")
      return false;
    }
    //Calls the server and updates the product and the state
    fetch('http://localhost:8080/products/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          ProductId: this.state.choosenProduct.ProductId,
          Product_Image: productImage,
          Description: productDescription,
          Price: productPrice, 
          isSalad: isSalad, 
          isMainDish: isMainDish, 
          isDessert: isDessert,
          isAppetizer: isAppetizer,
          isBeverage: isBeverage,
          ProductName: productName,
        })
    }).then((res) => (
      res.json()
    )).then((res) => {
      this.loadProducts()
      this.setState({isFoodVisible: true, isEditing: false})
    }).catch((err) => err)
    
  }


  render() {

    return (
      <div className="App">
        {/* This is the title and login header */}
        <header className="App-header">
          <h1>Munchies</h1>
          <div>
              {!this.state.isLoggedin ? (
              <Auth 
              login={this._login} 
              emailChange={this.handleEmail}
              passwordChange={this.handlePassword}
              setRegisterState={this.setRegisterState}
              setLoggedIn={this.setRegisterState}
              isLoggedin={this.state.isLoggedin}
              isRegistering={this.state.isRegistering}
              />) : (
              <div className="User-settings">
                Welcome, {this.state.name}!
                <div>
                  <button onClick= { () => this.setState({isCreatingProduct: true})}> Add Product </button>
                  <button onClick= { () => this.deleteAccount()}> Delete Account </button>
                </div>
              </div>)}
          </div>
        </header>
        {/* Registration Page: If the user hits the register button */}
        {
          !this.state.isLoggedIn && this.state.isRegistering && (
            <div>
              <div>To get started, fill out the details below</div>
                {/* username */}
                <input onChange={(e) => {this.setState({username: e.target.value})}}
                placeholder="username" />
                {/* email */}
                <input onChange={this.handleEmail}
                type="email"
                placeholder="email" />
                {/* password */}
                <input onChange={this.handlePassword}
                  placeholder={"enter your password"}
                  type="password" />
                {/* name */}
                <input onChange={(e) => {this.setState({name: e.target.value})}}
                  placeholder="name" />
                {/* address */}
                <input onChange={(e) => {this.setState({address: e.target.value})}}
                placeholder="address" />
                {/* phone number */}
                <input onChange={(e) => {this.setState({phone: e.target.value})}}
                type="phone"
                placeholder="phone number" />

            <button onClick={this._register} className="No-focus Red-button"> Register </button>
          </div>
          )
        }
        {/* Add Product Page if user hits addProduct button */}
        {
          this.state.isLoggedin && this.state.isCreatingProduct && (
            <div>
              <button className="Red-button" onClick={ () => {this.setState({isCreatingProduct: false})}}> Back </button>
              <div> Add product information </div>
                <input onChange={(e) => {this.setState({productName: e.target.value})}}
                  placeholder="Product Name" />
                <input onChange={(e) => {this.setState({productImage: e.target.value})}}
                  placeholder="Product Image Url" />
                <input onChange={(e) => {this.setState({productDescription: e.target.value})}}
                  placeholder="Description" />
                <input onChange={(e) => {this.setState({productPrice: e.target.value})}}
                  placeholder="Price" />
                  {/* Radio Buttons for product types */}
                 <form>
                  <div className="radio">
                    <label>
                      <input type="radio" value="Salad" checked={this.state.selectedOption === "Salad" } onChange={this.handleOptionChange} />
                      Salad
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" value="MainDish" checked={this.state.selectedOption === "MainDish" } onChange={this.handleOptionChange}/>
                      MainDish
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" value="Dessert" checked={this.state.selectedOption === "Dessert" } onChange={this.handleOptionChange}/>
                      Dessert
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" value="Appetizer" checked={this.state.selectedOption === "Appetizer" } onChange={this.handleOptionChange}/>
                      Appetizer
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" value="Beverage" checked={this.state.selectedOption === "Beverage" } onChange={this.handleOptionChange}/>
                      Beverage
                    </label>
                  </div>
                </form>
              <button className="Red-button" onClick={ this._createProduct}> Create </button>
            </div>
          )
        }
        {/* Displays Products: default displaying all products */}
        {/* Gets all the products from the state and displays them on the page*/}
        <div className="Food-products-list">
        {
          !this.state.isPaying && !this.state.isLoggedIn && !this.state.isRegistering && !this.state.isCreatingProduct && !this.state.isOrdering && (
            
            this.state.isFoodVisible && this.state.food.map((foodItem) => (
              <div className="Food-div">
                 <button className="Food-button" key={foodItem.ProductId} onClick={()=>this.handleOrder(foodItem)} >
                <div className="Button-format">
                  <div>
                    <img src={foodItem.Product_Image} alt={"hi"} height={350} width={400}/>
                  </div>
                  <div className="Button-detail">
                    <div>
                    {foodItem.ProductName}
                    </div>
                    <div>
                    ${foodItem.Price}
                    </div>
                    <div>
                    {foodItem.Description}
                    </div>
                  </div>
                </div>
              </button>
              <button onClick = {()=> this.handleEdit(foodItem) } className="Red-button Red-Background"> Edit {foodItem.ProductName} </button>
              </div>
            ))
          )
        }
        </div>
        
        {/* Order Page : The user chooses a quanity of the specific product they chose */}
        {
          !this.state.isLoggedIn && !this.state.isRegistering && !this.state.isCreatingProduct && this.state.isOrdering && (
            <div>
              <button className="Red-button" onClick={ () => {this.setState({isOrdering: false})}}> Back </button>
              <div> Create an Order </div>
              <img src={this.state.choosenProduct.Product_Image} alt={"hi"} />
              <p>price: ${this.state.choosenProduct.Price} * {this.state.Quantity || 0} = ${this.state.Quantity * this.state.choosenProduct.Price}</p>
              <input onChange={(e) => {this.setState({Quantity: e.target.value})}}
                  placeholder="Quantity" />

              <button className="Red-button" onClick={this._createPayment}> Proceed to Payment </button>
            </div>
          )
        }
        {/* Payment Page: Total is displayed and User enters in their credit card information */}
        {
          this.state.isPaying && !this.state.isFoodVisible && (
            <div>
              <button className="Red-button" onClick={ () => {this.setState({isPaying: false, isOrdering: false, isFoodVisible: true})}}> Back </button>
              <div> Credit Card </div>
              <p>Total: ${this.state.total}</p>
              <input onChange={(e) => {this.setState({credit: e.target.value})}} placeholder="credit card" max={16} />
              <button className="Red-button" onClick={this._createOrder}> Place order </button>
          </div>
          )
        }
        {/* Edit Product Page : User updates the product information */}
        {
          this.state.isEditing && this.state.isLoggedin && !this.state.isFoodVisible && (
            <div>
              <button className="Red-button" onClick={ () => {this.setState({isEditing: false, isFoodVisible:true})}}>back</button>
              <p> Edit {this.state.choosenProduct.ProductName} </p>
              <div>
                <img src={this.state.choosenProduct.Product_Image} alt={" "} height={500} width={500}/>
              </div>
              <input onChange={(e) => {this.setState({productName: e.target.value})}}
                  value={this.state.productName} />
                <input onChange={(e) => {this.setState({productImage: e.target.value})}}
                  value={this.state.productImage} />
                <input onChange={(e) => {this.setState({productDescription: e.target.value})}}
                  value={this.state.productDescription} />
                <input onChange={(e) => {this.setState({productPrice: e.target.value})}}
                  value={this.state.productPrice} />
                  <form>
                  <div className="radio">
                    <label>
                      <input type="radio" value="Salad" checked={this.state.selectedOption === "Salad" } onChange={this.handleOptionChange} />
                      Salad
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" value="MainDish" checked={this.state.selectedOption === "MainDish" } onChange={this.handleOptionChange}/>
                      MainDish
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" value="Dessert" checked={this.state.selectedOption === "Dessert" } onChange={this.handleOptionChange}/>
                      Dessert
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" value="Appetizer" checked={this.state.selectedOption === "Appetizer" } onChange={this.handleOptionChange}/>
                      Appetizer
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input type="radio" value="Beverage" checked={this.state.selectedOption === "Beverage" } onChange={this.handleOptionChange}/>
                      Beverage
                    </label>
                  </div>
                </form>
                <button className="Red-button" onClick = { this.handleEditSumbit }> Submit </button>
            </div>
          )
        }
      </div>
    );
  }
}

export default App;
