import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants/orderConstants';
import OrderScreenWrapper, {
  DetailWrapper,
  ImageWrapper,
} from '../elements/OrderScreenWrapper';
import YellowButtonWrapper from '../elements/YellowButtonWrapper';

const OrderScreen = (props) => {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <OrderScreenWrapper>
        <div className="column2">
          <ul>
            <li>
              <div className="container">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address:</strong> {order.shippingAddress.address},{' '}
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="container">
                <h2>Payment </h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox>Paid at {order.paidAt}</MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="container">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
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
                        <div className="price">
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
                  <div>€ {order.itemsPrice.toFixed(2)}</div>
                </DetailWrapper>
              </li>
              <li>
                <DetailWrapper>
                  <div>Shipping</div>
                  <div>€ {order.shippingPrice.toFixed(2)}</div>
                </DetailWrapper>
              </li>
              <li>
                <DetailWrapper>
                  <div>Tax</div>
                  <div>(€ {order.taxPrice.toFixed(2)})</div>
                </DetailWrapper>
              </li>
              <li>
                <DetailWrapper>
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>€ {order.totalPrice.toFixed(2)}</strong>
                  </div>
                </DetailWrapper>
              </li>
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <YellowButtonWrapper
                    onClick={deliverHandler}
                    text="Deliver Order"
                    width="100%"
                  >
                    Deliver Order
                  </YellowButtonWrapper>
                </li>
              )}
            </ul>
          </div>
        </div>
      </OrderScreenWrapper>
    </div>
  );
};

export default OrderScreen;
