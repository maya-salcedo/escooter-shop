import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { signout } from '../actions/userActions';
import SearchBox from './SearchBox';

const BurgerWrapper = styled.div`
  > button {
    font-size: 3rem;
    padding: 0.2rem 0.5rem;
    margin: 0 0.5rem;
    background: none;
    color: #ffffff;
    cursor: pointer;
    border: none;
  }
`;

const Header = (props) => {
  const cart = useSelector((state) => state.cart); //to get access to cart items from redux
  const [isDesktop, setDesktop] = useState(window.innerWidth > 850);
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
    setDesktop(window.innerWidth > 850);
    setMobile(window.innerWidth < 650);
  };
  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);
  return (
    <>
      <header className="row">
        {!isDesktop && (
          <BurgerWrapper>
            <button
              type="button"
              className="sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars" aria-hidden="true"></i>
            </button>
          </BurgerWrapper>
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
            <span className="badge">{cartItems.length}</span>
          )}
        </Link>
      </header>
      <aside className={sidebarIsOpen ? 'open' : ''}>
        <ul className="categories" onClick={() => setSidebarIsOpen(false)}>
          <li>
            <button
              onClick={() => setSidebarIsOpen(false)}
              className="close-sidebar"
              type="button"
            >
              <i className="fa fa-close"></i>
            </button>
          </li>
          <li>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
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
      </aside>
    </>
  );
};

export default Header;
