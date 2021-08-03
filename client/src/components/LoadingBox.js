import React from 'react';
import styled from 'styled-components';

const ContainerWrapper = styled.div`
  display: block;
`;
const LoadingBox = () => {
  return (
    <ContainerWrapper>
      <i className="fa fa-spinner fa-spin"></i> Loading ...
    </ContainerWrapper>
  );
};

export default LoadingBox;
