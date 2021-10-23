import { useEffect, useState } from "react";

const Users = () => {

  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const getUsers = async () => {
    try {
      let response: any = await fetch("http://localhost:3004/api/v1/users");
      response = await response.json();
      const respErrMsg = response?.errors?.message;
      if (respErrMsg) {
        setErrorMessage(respErrMsg);
      } else {
        setUsers(response.data);
      }
    } catch (err) {
      setErrorMessage('Unknown Error!');
        console.error(err);
    }
  }

  useEffect(() => {
    getUsers();
  });

  return (
    <>
      <div className="err-success-wrapper">
        <div className={`error-wrapper ${errorMessage ? 'active' : ''}`}>
          <div className="error-text">{errorMessage}</div>
          <span className="error-close" onClick={() => setErrorMessage('')}></span>
        </div>
      </div>
      <div className="table-wrapper">
        <div className="table-title">Users</div>
        <div className="table-content">
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.length ? (users.map((user: any) => {
                return (
                  <tr key={user._id}>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.phone_number}</td>
                    <td>{user.email}</td>
                  </tr>
                )
              })) : (
                <tr><td colSpan={4} className="no-data">No users available!</td></tr>
              )
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Users;
