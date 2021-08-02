import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';
import TableWrapper, { MobileRow } from '../elements/TableWrapper';

const UserListScreen = (props) => {
  const [isMobile, setMobile] = useState(window.innerWidth < 650);
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();

  const updateMedia = () => {
    setMobile(window.innerWidth < 650);
  };
  useEffect(() => {
    dispatch(listUsers());
    dispatch({ type: USER_DETAILS_RESET });
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, [dispatch, successDelete]);
  const deleteHandler = (user) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <div>
      <h1>Users</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">User Deleted Successfully</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {!isMobile && (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>IS SELLER</th>
                    <th>IS ADMIN</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.isSeller ? 'YES' : 'NO'}</td>
                      <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                      <td>
                        <button
                          type="button"
                          className="small"
                          onClick={() =>
                            props.history.push(`/user/${user._id}/edit`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="small"
                          onClick={() => deleteHandler(user)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
          {isMobile && (
            <>
              {users.map((user) => (
                <TableWrapper key={user._id}>
                  <MobileRow title="ID" tableData={user._id} />
                  <MobileRow title="NAME" tableData={user.name} />
                  <MobileRow title="EMAIL" tableData={user.email} />
                  <MobileRow
                    title="IS SELLER"
                    tableData={user.isSeller ? 'YES' : 'NO'}
                  />
                  <MobileRow
                    title="IS ADMIN"
                    tableData={user.isAdmin ? 'YES' : 'NO'}
                  />
                  <MobileRow title="ACTIONS" />
                </TableWrapper>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default UserListScreen;
