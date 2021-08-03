import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import styled from 'styled-components';

const ContainerWrapper = styled.div`
  border: 0.1rem #c0c0c0 solid;
  background-color: #f8f8f8;
  border-radius: 0.5rem;
  margin: 1rem;
  > div {
    padding: 1rem;
  }
`;

const ImageWrapper = styled.img`
  max-width: 29rem;
  width: 100%;
`;

const PriceWrapper = styled.div`
  font-size: 2rem;
`;

const Product = (props) => {
  const { product } = props;
  return (
    <ContainerWrapper key={product._id}>
      <Link to={`/product/${product._id}`}>
        <ImageWrapper src={product.image} alt={product.name} />
      </Link>
      <div>
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <div>
          <PriceWrapper>€{product.price}</PriceWrapper>
          <div>
            <Link to={`/seller/${product.seller._id}`}>
              {product.seller.seller.name}
            </Link>
          </div>
        </div>
      </div>
    </ContainerWrapper>
  );
};

export default Product;
