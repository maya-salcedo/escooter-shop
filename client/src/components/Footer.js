import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ChatBox from '../screens/ChatBox';

const FooterWrapper = styled.footer`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #144d53;
  color: #ffffff;
  height: 3rem;
  > div {
    display: flex;
    align-items: center;
  }
`;

const year = new Date().getFullYear();

const Footer = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <FooterWrapper>
      {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo}></ChatBox>}
      <div>escooter shop © {year}</div>
    </FooterWrapper>
  );
};

export default Footer;
