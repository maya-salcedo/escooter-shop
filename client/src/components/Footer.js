import React from 'react';
import { useSelector } from 'react-redux';
import ChatBox from '../screens/ChatBox';

const Footer = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <footer className="row center">
      {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo}></ChatBox>}
      <div className="row center">All right reserved</div>
    </footer>
  );
};

export default Footer;
