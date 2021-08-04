import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  padding: 2rem 0.4rem 3rem;
`;

const StyledRow = styled.tr`
  > th {
    text-align: left;
    width: 1rem;
  }
  :nth-of-type(odd) {
    background-color: #f4f4f4;
  }
  > td {
    max-width: 150px;
    word-wrap: break-word;
  }
`;

const StyledButton = styled.button`
  margin: 0.3rem;
  padding: 0.6rem;
`;
const MobileTableWrapper = ({ key, children = [] }) => {
  return <StyledTable key={key}>{children}</StyledTable>;
};

export const MobileRow = ({ title, tableData = [] }) => {
  return (
    <StyledRow>
      <th>{title}</th>
      <td>{tableData}</td>
    </StyledRow>
  );
};

export const ButtonWrapper = ({ onClick, text }) => {
  return (
    <StyledButton type="button" onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export const RowWithButton = ({ title, children }) => {
  return (
    <StyledRow>
      <th>{title}</th>
      <td>{children}</td>
    </StyledRow>
  );
};

export default MobileTableWrapper;
