import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import { prices } from '../utils';

const SearchScreen = (props) => {
  const { name = 'all', category = 'all', min=0, max=0 } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const { loading: loadingCategories, error: errorCategories, categories } = productCategoryList;
  useEffect(() => {
    dispatch(listProducts({ 
      name: name !== 'all' ? name : '',
      category: category !== 'all' ? category : '',
      min,
      max
    }));
  }, [category, dispatch, max, min, name]);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.min === 0 ? 0 : min;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}`;
  }
  return(
    <div>
      <div className="row">
        { loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) :  (
        <div>{products.length} Results</div>) 
        }
      </div>
      <div className="row top">
        <div className="col-1">
          <h3>Department</h3>
          <div>
            { loadingCategories ? (
            <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) :  (
              <ul>
                
                {categories.map((c) => (
                  <li key={c}>
                    <Link 
                      className={c === category ? 'active' : ''} 
                      to={getFilterUrl({ category: c })}
                    >
                    {c}
                    </Link>
                  </li>
                ))}
              </ul>
            ) 
            }
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              {prices.map((p) => (
                <li key={p.name}>
                  <Link 
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    className={`${p.name}-${p.max}` === `${min}-${max}` ? 'active' : ''}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-3">
          { loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) :  (
            <>
              {products.length === 0 && <MessageBox>No Products Found</MessageBox>}
              <div className="row center">
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>
            </>) 
          }
        </div>
      </div>
    </div>
  )
};

export default SearchScreen;