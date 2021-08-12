import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  padding: 1rem;
  > div {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: start;
    align-items: auto;
    align-content: start;
    padding: 1rem;
  }
  & p {
    margin: 0.2rem;
  }
`;

const StyledH1 = styled.h1`
  font-size: 3rem;
  text-align: center;
`;

const ReviewWrapper = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export const HeadingWrapper = ({ children }) => {
  return <StyledH1>{children}</StyledH1>;
};

export default ReviewWrapper;
