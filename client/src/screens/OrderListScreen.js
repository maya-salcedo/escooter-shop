import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';
import TableWrapper, {
  ButtonWrapper,
  MobileRow,
  RowWithButton,
} from '../elements/TableWrapper';

const OrderListScreen = (props) => {
  const [isMobile, setMobile] = useState(window.innerWidth < 650);
  const sellerMode = props.match.path.indexOf('/seller') >= 0;
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const updateMedia = () => {
    setMobile(window.innerWidth < 650);
  };
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders({ seller: sellerMode ? userInfo._id : '' }));
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, [dispatch, sellerMode, successDelete, userInfo._id]);
  const deleteHandler = (order) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteOrder(order._id));
    }
  };
  return (
    <div>
      <h1>Orders</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
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
                    <th>USER</th>
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
                      <td>{order.user.name}</td>
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
                        <button
                          type="button"
                          className="small"
                          onClick={() => deleteHandler(order)}
                        >
                          Delete
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
                <TableWrapper key={order._id}>
                  <MobileRow title="ID" tableData={order._id} />
                  <MobileRow title="USER" tableData={order.user.name} />
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
                      onClick={() => props.history.push(`/order/${order._id}`)}
                      text="Edit"
                    />
                    <ButtonWrapper
                      onClick={() => deleteHandler(order)}
                      text="Delete"
                    />
                  </RowWithButton>
                </TableWrapper>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default OrderListScreen;
