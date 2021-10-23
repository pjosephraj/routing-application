import { useState } from "react";
import { useHistory } from "react-router";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const submitForm = async () => {
    if (email && password) {
      try {
        setErrorMessage('');
        let response: any = await fetch("http://localhost:3004/api/v1/users/authenticate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        response = await response.json();
        const respErrMsg = response?.errors?.message;
        if (respErrMsg) {
          setErrorMessage(respErrMsg);
        } else {
          history.push('/');
        }
      } catch (err) {
        setErrorMessage('Unknown Error!');
        console.error(err);
      }
    } else {
      setErrorMessage('Please fill all the fields!');
    }
  }

  return (
    <>
      <div className="err-success-wrapper">
        <div className={`error-wrapper ${errorMessage ? 'active' : ''}`}>
          <div className="error-text">{errorMessage}</div>
          <span className="error-close" onClick={() => setErrorMessage('')}></span>
        </div>
      </div>
      <div className="form-wrapper form-wrapper__register">
        <div className="form-title">Login</div>
        <div className="form">
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" value={email} type="text" onChange={e => setEmail(e.target.value)} placeholder="Enter Email Address" />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder="Enter Password" />
          </div>
          <div className="form-btns">
            <button className="btn" onClick={submitForm}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
