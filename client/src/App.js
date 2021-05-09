import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SigninScreen from './screens/SigninScreen';

const App = () => {
  const cart = useSelector(state => state.cart); //to get access to cart items from redux
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">
            escooterlane shop
          </Link>
        </div>
        <div>
          <Link to="/cart">Cart
          {cartItems.length > 0 && (
            <span className="badge">{cartItems.length}</span>
          )}
          </Link>
          {
            userInfo ? (
              <Link to="#">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )
          }
        </div>
      </header>
      <main>
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/product/:id" component={ProductScreen}></Route>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/" component={HomeScreen} exact></Route>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
    </BrowserRouter>  
  );
}

export default App;