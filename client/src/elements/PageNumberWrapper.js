import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  > a {
    padding: 1rem;
    margin: 0.5rem;
    border-radius: 0.5rem;
    border: 0.1rem #a4a4a4 solid;
    font-size: 1.6rem;
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  & .active {
    font-weight: bold;
  }
`;

const PageNumberWrapper = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default PageNumberWrapper;
