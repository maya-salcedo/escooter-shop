import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import MobileTableWrapper, {
  ButtonWrapper,
  MobileRow,
  RowWithButton,
} from '../elements/MobileTableWrapper';

import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from '../constants/productConstants';
import YellowButtonWrapper from '../elements/YellowButtonWrapper';
import DesktopTableWrapper from '../elements/DesktopTableWrapper';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const ProductListScreen = (props) => {
  const [isMobile, setMobile] = useState(window.innerWidth < 650);
  const { pageNumber = 1 } = useParams();
  const sellerMode = props.match.path.indexOf('/seller') >= 0;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const updateMedia = () => {
    setMobile(window.innerWidth < 650);
  };
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(
      listProducts({ seller: sellerMode ? userInfo._id : '', pageNumber })
    );
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, [
    createdProduct,
    dispatch,
    props.history,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
    pageNumber,
  ]);

  const deleteHandler = (product) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id));
    }
  };
  const createHandler = () => {
    dispatch(createProduct());
  };
  return (
    <div>
      <Container>
        <h1>Products</h1>
        <YellowButtonWrapper
          onClick={createHandler}
          text="Create Product"
        ></YellowButtonWrapper>
      </Container>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {!isMobile && (
            <>
              <DesktopTableWrapper>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <button
                          type="button"
                          className="small"
                          onClick={() =>
                            props.history.push(`/product/${product._id}/edit`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="small"
                          onClick={() => deleteHandler(product)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </DesktopTableWrapper>
            </>
          )}
          {isMobile && (
            <>
              {products.map((product) => (
                <MobileTableWrapper key={product._id}>
                  <MobileRow title="ID" tableData={product._id} />
                  <MobileRow title="NAME" tableData={product.name} />
                  <MobileRow title="PRICE" tableData={product.price} />
                  <MobileRow title="CATEGORY" tableData={product.category} />
                  <MobileRow title="BRAND" tableData={product.brand} />
                  <RowWithButton title="ACTIONS">
                    <ButtonWrapper
                      onClick={() =>
                        props.history.push(`/product/${product._id}/edit`)
                      }
                      text="Edit"
                    />
                    <ButtonWrapper
                      onClick={() => deleteHandler(product)}
                      text="Delete"
                    />
                  </RowWithButton>
                </MobileTableWrapper>
              ))}
            </>
          )}
          <div className="row center pagination">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === page ? 'active' : ''}
                key={x + 1}
                to={`/productlist/pageNumber/${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductListScreen;
