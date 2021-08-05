import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  max-width: 60rem;
  margin: 0 auto;
  > div {
    display: flex;
    flex-direction: column;
    margin: 1rem;
  }
  & label {
    margin: 1rem 0;
  }
  & button {
    background-color: #f0c040;
  }
`;

const FormWrapper = ({ children, onSubmit }) => {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
};

export default FormWrapper;
