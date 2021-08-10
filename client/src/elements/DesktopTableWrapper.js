import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  > tbody tr:nth-of-type(odd) {
    background-color: #f4f4f4;
  }
  & th {
    text-align: left;
    border: 0.1rem solid #e4e4e4;
    padding: 0.5rem;
  }
  & td {
    text-align: left;
    border: 0.1rem solid #e4e4e4;
    padding: 0.5rem;
  }
  & button {
    margin: 0 0.2rem;
    font-size: 1.2rem;
  }
`;

const DesktopTableWrapper = ({ children = [] }) => {
  return <StyledTable>{children}</StyledTable>;
};

export default DesktopTableWrapper;
