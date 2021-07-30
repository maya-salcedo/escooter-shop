import React from 'react';
import GlobalStyle from './elements/GlobalStyle';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchScreen from './screens/SearchScreen';
import DashboardScreen from './screens/DashboardScreen';
import SupportScreen from './screens/SupportScreen';
import Header from './components/Header';
import Header2 from './components/Header2';
import Footer from './components/Footer';

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Header2 />
      <main>
        <Route path="/seller/:id" component={SellerScreen}></Route>
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/product/:id" component={ProductScreen} exact></Route>
        <Route
          path="/product/:id/edit"
          component={ProductEditScreen}
          exact
        ></Route>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/shipping" component={ShippingAddressScreen}></Route>
        <Route path="/payment" component={PaymentMethodScreen}></Route>
        <Route path="/placeorder" component={PlaceOrderScreen}></Route>
        <Route path="/order/:id" component={OrderScreen}></Route>
        <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
        <Route
          path="/search/name/:name?"
          component={SearchScreen}
          exact
        ></Route>
        <Route
          path="/search/category/:category"
          component={SearchScreen}
          exact
        ></Route>
        <Route
          path="/search/category/:category/name/:name"
          component={SearchScreen}
          exact
        ></Route>
        <Route
          path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
          component={SearchScreen}
          exact
        ></Route>
        <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
        <AdminRoute
          path="/productlist"
          component={ProductListScreen}
          exact
        ></AdminRoute>
        <AdminRoute
          path="/productlist/pageNumber/:pageNumber"
          component={ProductListScreen}
          exact
        ></AdminRoute>
        <AdminRoute
          path="/orderlist"
          component={OrderListScreen}
          exact
        ></AdminRoute>
        <AdminRoute path="/userList" component={UserListScreen}></AdminRoute>
        <AdminRoute
          path="/user/:id/edit"
          component={UserEditScreen}
        ></AdminRoute>
        <AdminRoute path="/dashboard" component={DashboardScreen}></AdminRoute>
        <AdminRoute path="/support" component={SupportScreen}></AdminRoute>
        <SellerRoute
          path="/productlist/seller"
          component={ProductListScreen}
        ></SellerRoute>
        <SellerRoute
          path="/orderlist/seller"
          component={OrderListScreen}
        ></SellerRoute>
        <Route path="/" component={HomeScreen} exact></Route>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
