import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { signout } from '../actions/userActions';
import SearchBox from './SearchBox';

const HeaderWrapper = styled.header`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background-color: #144d53;
  padding: 0.5rem;
  > div {
    > a {
      @media (max-width: 320px) {
        font-size: 2.5rem;
      }
      @media (max-width: 290px) {
        font-size: 2.2rem;
      }
      @media (max-width: 270px) {
        font-size: 2rem;
      }
    }
    > button {
      font-size: 3rem;
      padding: 0.2rem 0.5rem;
      margin: 0 0.5rem;
      background: none;
      color: #ffffff;
      cursor: pointer;
      border: none;
      :hover {
        color: #f0c040;
        border: none;
      }
    }
  }
`;

const BadgeWrapper = styled.span`
  background-color: #ce1212;
  color: #ffffff;
  border-radius: 50%;
  padding: 0.2rem 0.7rem;
  font-size: 1.4rem;
  margin-left: 0.2rem;
`;

const AsideWrapper = styled.aside`
  position: fixed;
  width: 20rem;
  height: 100%;
  background-color: #efefef;
  z-index: 1000;
  transform: translateX(-30rem);
  transition: all 0.5s;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 1rem;
  > ul {
    padding: 0;
    list-style: none;
  }
  > li {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    > button {
      padding: 0.3rem 0.8rem;
    }
  }
`;

const Header = (props) => {
  const cart = useSelector((state) => state.cart); //to get access to cart items from redux
  const [isMobile, setMobile] = useState(window.innerWidth < 650);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;

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
    <>
      <HeaderWrapper>
        {isMobile && (
          <div>
            <button type="button" onClick={() => setSidebarIsOpen(true)}>
              <i className="fa fa-bars" aria-hidden="true"></i>
            </button>
          </div>
        )}
        <div>
          <Link className="brand" to="/">
            escooter shop
          </Link>
        </div>
        {!isMobile && (
          <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
        )}
        <Link to="/cart">
          <i class="fa fa-shopping-cart basket"></i>
          {cartItems.length > 0 && (
            <BadgeWrapper>{cartItems.length}</BadgeWrapper>
          )}
        </Link>
      </HeaderWrapper>
      <AsideWrapper className={sidebarIsOpen ? 'open' : ''}>
        <ul onClick={() => setSidebarIsOpen(false)}>
          <li>
            <button onClick={() => setSidebarIsOpen(false)} type="button">
              <i className="fa fa-close"></i>
            </button>
          </li>
          <li>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <BadgeWrapper>{cartItems.length}</BadgeWrapper>
              )}
            </Link>
          </li>
          {userInfo && userInfo.isAdmin && (
            <>
              <li>
                <strong>Admin</strong>
              </li>
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
            </>
          )}
          {userInfo && userInfo.isSeller && (
            <>
              <li>
                <strong>Seller</strong>
              </li>
              <li>
                <Link to="/productlist/seller">Products</Link>
              </li>
              <li>
                <Link to="/orderlist/seller">Orders</Link>
              </li>
            </>
          )}
          {userInfo ? (
            <>
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
            </>
          ) : (
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
          )}
        </ul>
      </AsideWrapper>
    </>
  );
};

export default Header;
