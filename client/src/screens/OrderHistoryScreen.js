import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import MobileTableWrapper, {
  ButtonWrapper,
  MobileRow,
  RowWithButton,
} from '../elements/MobileTableWrapper';

const OrderHistoryScreen = (props) => {
  const [isMobile, setMobile] = useState(window.innerWidth < 650);
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  const updateMedia = () => {
    setMobile(window.innerWidth < 650);
  };
  useEffect(() => {
    dispatch(listOrderMine());
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, [dispatch]);
  return (
    <div>
      <h1>Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <>
          {!isMobile && (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice.toFixed(2)}</td>
                      <td>
                        {order.isPaid ? order.paidAt.substring(0, 10) : 'No'}
                      </td>
                      <td>
                        {order.isDelivered
                          ? order.deliveredAt.substring(0, 10)
                          : 'No'}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="small"
                          onClick={() => {
                            props.history.push(`/order/${order._id}`);
                          }}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          {isMobile && (
            <>
              {orders.map((order) => (
                <MobileTableWrapper key={order._id}>
                  <MobileRow title="ID" tableData={order._id} />
                  <MobileRow
                    title="DATE"
                    tableData={order.createdAt.substring(0, 10)}
                  />
                  <MobileRow
                    title="TOTAL"
                    tableData={order.totalPrice.toFixed(2)}
                  />
                  <MobileRow
                    title="PAID"
                    tableData={
                      order.isPaid ? order.paidAt.substring(0, 10) : 'No'
                    }
                  />
                  <MobileRow
                    title="DELIVERED"
                    tableData={
                      order.isDelivered
                        ? order.deliveredAt.substring(0, 10)
                        : 'No'
                    }
                  />
                  <RowWithButton title="ACTIONS">
                    <ButtonWrapper
                      onClick={() => {
                        props.history.push(`/order/${order._id}`);
                      }}
                      text="Details"
                    />
                  </RowWithButton>
                </MobileTableWrapper>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default OrderHistoryScreen;
