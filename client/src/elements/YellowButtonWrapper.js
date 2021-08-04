import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #f0c040;
`;

const YellowButtonWrapper = ({ onClick, text }) => {
  return (
    <StyledButton type="button" onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export default YellowButtonWrapper;
