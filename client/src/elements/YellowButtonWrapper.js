import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #f0c040;
  width: ${(props) => props.width};
`;

const YellowButtonWrapper = ({ onClick, text, width }) => {
  return (
    <StyledButton type="button" onClick={onClick} width={width}>
      {text}
    </StyledButton>
  );
};

export default YellowButtonWrapper;
