import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  > div {
    border-top: 0.3rem #c0c0c0 solid;
    color: #c0c0c0;
    flex: 1;
    padding: 1rem;
    font-weight: bold;
    @media screen and (max-width: 466px) {
      padding: 0.2rem;
    }
    @media screen and (max-width: 398px) {
      font-size: 1.2rem;
    }
  }
  & .active {
    border-top-color: #f08000;
    color: #f08000;
  }
`;

const CheckoutSteps = (props) => {
  return (
    <Wrapper>
      <div className={props.step1 ? 'active' : ''}>Sign-in</div>
      <div className={props.step2 ? 'active' : ''}>Shipping</div>
      <div className={props.step3 ? 'active' : ''}>Payment</div>
      <div className={props.step4 ? 'active' : ''}>Place Order</div>
    </Wrapper>
  );
};

export default CheckoutSteps;
