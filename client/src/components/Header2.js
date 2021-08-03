import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { signout } from '../actions/userActions';
import SearchBox from './SearchBox';

const Header2Wrapper = styled.header`
  background-color: #144d53;
  padding: 0 0.5rem 0.5rem;
`;

const ContainerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
`;

const UserWrapper = styled.div`
  flex: 0 0 auto;
  margin: 0.2rem;
  display: inline-block;
  position: relative;
`;

const DropdownWrapper = styled.ul`
  position: absolute;
  display: none;
  right: 0;
  min-width: 12rem;
  padding: 1rem;
  z-index: 1;
  background-color: #144d53;
  margin: 0;
  margin-top: 0.4rem;
  border-radius: 0.5rem;
  ${UserWrapper}:hover & {
    display: block;
  }
`;

const Header2 = (props) => {
  const [isMobile, setMobile] = useState(window.innerWidth < 650);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  const updateMedia = () => {
    setMobile(window.innerWidth < 650);
  };
  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);
  return (
    <Header2Wrapper>
      {!isMobile && (
        <ContainerWrapper>
          {userInfo ? (
            <UserWrapper>
              <Link to="#">
                {userInfo.name} <i className="fa fa-caret-down"></i>
              </Link>
              <DropdownWrapper>
                <li>
                  <Link to="/profile">User Profile</Link>
                </li>
                <li>
                  <Link to="/orderhistory">Order History</Link>
                </li>
                <li>
                  <Link to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </li>
              </DropdownWrapper>
            </UserWrapper>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
          {userInfo && userInfo.isSeller && (
            <UserWrapper>
              <Link to="#admin">
                Seller <i className="fa fa-caret-down"></i>
              </Link>
              <DropdownWrapper>
                <li>
                  <Link to="/productlist/seller">Products</Link>
                </li>
                <li>
                  <Link to="/orderlist/seller">Orders</Link>
                </li>
              </DropdownWrapper>
            </UserWrapper>
          )}
          {userInfo && userInfo.isAdmin && (
            <UserWrapper>
              <Link to="#admin">
                Admin <i className="fa fa-caret-down"></i>
              </Link>
              <DropdownWrapper>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/productlist">Products</Link>
                </li>
                <li>
                  <Link to="/orderlist">Orders</Link>
                </li>
                <li>
                  <Link to="/userlist">Users</Link>
                </li>
                <li>
                  <Link to="/support">Support</Link>
                </li>
              </DropdownWrapper>
            </UserWrapper>
          )}
        </ContainerWrapper>
      )}
      {isMobile && (
        <div>
          <Route
            render={({ history }) => <SearchBox history={history}></SearchBox>}
          ></Route>
        </div>
      )}
    </Header2Wrapper>
  );
};

export default Header2;
