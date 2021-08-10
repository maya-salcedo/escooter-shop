import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import Product from '../components/Product';
import OrderScreenWrapper, {
  ImageWrapper,
} from '../elements/OrderScreenWrapper';

const SellerScreen = (props) => {
  const sellerId = props.match.params.id;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(sellerId));
    dispatch(listProducts({ seller: sellerId }));
  }, [dispatch, sellerId]);
  return (
    <OrderScreenWrapper>
      <div className="column1">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <ul className="container">
            <li>
              <OrderScreenWrapper justifyContent="flex-start">
                <div className="p1">
                  <ImageWrapper
                    maxWidth="5rem"
                    src={user.seller.logo}
                    alt={user.seller.name}
                  ></ImageWrapper>
                </div>
                <div className="p1">
                  <h1>{user.seller.name}</h1>
                </div>
              </OrderScreenWrapper>
            </li>
            <li>
              <Rating
                rating={user.seller.rating}
                numReviews={user.seller.numReviews}
              ></Rating>
            </li>
            <li>
              <a href={`mailto:${user.email}`}>Contact Seller</a>
            </li>
            <li>{user.seller.description}</li>
          </ul>
        )}
      </div>
      <div className="column3">
        {loadingProducts ? (
          <LoadingBox></LoadingBox>
        ) : errorProducts ? (
          <MessageBox variant="danger">{errorProducts}</MessageBox>
        ) : (
          <>
            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
            <OrderScreenWrapper justifyContent="center">
              {products.map((product) => (
                <Product key={product._id} product={product}></Product>
              ))}
            </OrderScreenWrapper>
          </>
        )}
      </div>
    </OrderScreenWrapper>
  );
};

export default SellerScreen;
