import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { signout } from '../actions/userActions';
import SearchBox from './SearchBox';

const Header = () => {
  const cart = useSelector((state) => state.cart); //to get access to cart items from redux
  const [isDesktop, setDesktop] = useState(window.innerWidth > 850);
  const [isMobile, setMobile] = useState(window.innerWidth < 585);
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
    setMobile(window.innerWidth < 585);
  };
  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);
  return (
    <>
      <header className="row">
        {!isDesktop && (
          <div>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
          </div>
        )}
        <div>
          <Link className="brand" to="/">
            escooterlane shop
          </Link>
        </div>
        <div>
          <Route
            render={({ history }) => <SearchBox history={history}></SearchBox>}
          ></Route>
        </div>
        {isDesktop && (
          <>
            <div>
              <Link to="/cart">
                Cart
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
              </Link>
              {userInfo ? (
                <div className="dropdown">
                  <Link to="#">
                    {userInfo.name} <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
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
                  </ul>
                </div>
              ) : (
                <Link to="/signin">Sign In</Link>
              )}
              {userInfo && userInfo.isSeller && (
                <div className="dropdown">
                  <Link to="#admin">
                    Seller <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/productlist/seller">Products</Link>
                    </li>
                    <li>
                      <Link to="/orderlist/seller">Orders</Link>
                    </li>
                  </ul>
                </div>
              )}
              {userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to="#admin">
                    Admin <i className="fa fa-caret-down"></i>
                  </Link>
                  <ul className="dropdown-content">
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
                  </ul>
                </div>
              )}
            </div>
          </>
        )}
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
