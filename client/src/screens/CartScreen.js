import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

const CartScreenWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  align-items: flex-start;
`;

const ListWrapper = styled.div`
  flex: 2 1 50rem;
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const ImageWrapper = styled.img`
  max-width: 5rem;
  width: 100%;
`;

const ProductNameWrapper = styled.div`
  min-width: 30rem;
`;

const CheckoutWrapper = styled.div`
  flex: 1 1 25rem;
  > div {
    border: 0.1rem #c0c0c0 solid;
    background-color: #f8f8f8;
    border-radius: 0.5rem;
    margin: 1rem;
    padding: 1rem;
  }
`;

const CheckoutButtonWrapper = styled.button`
  background-color: #f0c040;
  width: 100%;
`;
const CartScreen = (props) => {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };

  return (
    <CartScreenWrapper>
      <ListWrapper>
        <h1>Shopping Cart</h1>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <DetailsWrapper>
                  <div>
                    <ImageWrapper
                      src={item.image}
                      alt={item.name}
                    ></ImageWrapper>
                  </div>
                  <ProductNameWrapper>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </ProductNameWrapper>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>€ {item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </DetailsWrapper>
              </li>
            ))}
          </ul>
        )}
      </ListWrapper>
      <CheckoutWrapper>
        <div>
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : €{' '}
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <CheckoutButtonWrapper
                type="button"
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </CheckoutButtonWrapper>
            </li>
          </ul>
        </div>
      </CheckoutWrapper>
    </CartScreenWrapper>
  );
};

export default CartScreen;
