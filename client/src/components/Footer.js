import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ChatBox from '../screens/ChatBox';

const FooterWrapper = styled.footer`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
`;

const Footer = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <FooterWrapper>
      {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo}></ChatBox>}
      <div className="row center">All right reserved</div>
    </FooterWrapper>
  );
};

export default Footer;
