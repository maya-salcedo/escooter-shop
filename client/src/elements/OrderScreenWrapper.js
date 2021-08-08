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
  & img {
    max-width: 5rem;
    width: 100%;
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
`;

const OrderScreenWrapper = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export const DetailWrapper = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default OrderScreenWrapper;
