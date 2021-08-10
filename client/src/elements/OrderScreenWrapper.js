import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: ${(props) => props.alignItems || 'flex - start'};
  > .column2 {
    flex: 2 1 50rem;
  }
  > .column1 {
    flex: 1 1 25rem;
  }
  & .container {
    border: 0.1rem #c0c0c0 solid;
    background-color: #f8f8f8;
    border-radius: 0.5rem;
    margin: 1rem;
    padding: 1rem;
  }
  & .item {
    min-width: 30rem;
  }
  & .price {
    min-width: 15rem;
    font-size: 1.5rem;
    text-align: right;
  }
`;

const StyledImage = styled.img`
  max-width: ${(props) => props.maxWidth};
  width: 100%;
`;

const OrderScreenWrapper = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export const ImageWrapper = ({ children, maxWidth, src, alt }) => {
  return (
    <StyledImage maxWidth={maxWidth} src={src} alt={alt}>
      {children}
    </StyledImage>
  );
};

export const DetailWrapper = ({ children }) => {
  return <StyledDiv alignItems="center">{children}</StyledDiv>;
};

export default OrderScreenWrapper;
