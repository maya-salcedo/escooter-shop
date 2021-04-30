import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import data from './data';

const initialState = {};

const reducer = (state, action) => {
  return { products: data.products };
};

const store = createStore(reducer, initialState, compose(applyMiddleware(thunk)));

export default store;