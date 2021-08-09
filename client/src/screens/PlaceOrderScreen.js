import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import OrderScreenWrapper, {
  DetailWrapper,
  ImageWrapper,
} from '../elements/OrderScreenWrapper';
import YellowButtonWrapper from '../elements/YellowButtonWrapper';

const PlaceOrderScreen = (props) => {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push('/payment');
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); //5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(1);
  cart.taxPrice = toPrice(0.2 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <OrderScreenWrapper>
        <div className="column2">
          <ul>
            <li>
              <div className="container">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Address:</strong> {cart.shippingAddress.address},{' '}
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  , {cart.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="container">
                <h2>Payment </h2>
                <p>
                  <strong>Method:</strong> {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="container">
                <h2>Order Items</h2>
                <ul>
                  {cart.cartItems.map((item) => (
                    <li key={item.product}>
                      <DetailWrapper>
                        <div>
                          <ImageWrapper
                            maxWidth="5rem"
                            src={item.image}
                            alt={item.name}
                          ></ImageWrapper>
                        </div>
                        <div className="item">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          {item.qty} x € {item.price} = €{item.qty * item.price}
                        </div>
                      </DetailWrapper>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="column1">
          <div className="container">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <DetailWrapper>
                  <div>Items</div>
                  <div>€ {cart.itemsPrice.toFixed(2)}</div>
                </DetailWrapper>
              </li>
              <li>
                <DetailWrapper>
                  <div>Shipping</div>
                  <div>€ {cart.shippingPrice.toFixed(2)}</div>
                </DetailWrapper>
              </li>
              <li>
                <DetailWrapper>
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>€ {cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </DetailWrapper>
              </li>
              <li>
                <YellowButtonWrapper
                  onClick={placeOrderHandler}
                  disabled={cart.cartItems.length === 0}
                  text="Place Order"
                  width="100%"
                ></YellowButtonWrapper>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </OrderScreenWrapper>
    </div>
  );
};

export default PlaceOrderScreen;
