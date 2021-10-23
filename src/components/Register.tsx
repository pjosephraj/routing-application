import { useState } from "react";

const Register = () => {

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatch, setPasswordMisMatch] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const submitForm = async () => {
    if (first_name && last_name && email && phone_number && password && confirmPassword) {
      try {
        setErrorMessage('');
        setSuccessMessage('');
        let response: any = await fetch("http://localhost:3004/api/v1/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ first_name, last_name, email, phone_number, password }),
        });
        response = await response.json();
        const respErrMsg = response?.errors?.message;
        if (respErrMsg) {
          setErrorMessage(respErrMsg);
        } else {
          setSuccessMessage('User Successfully Created!');
          resetForm();
        }
      } catch (err) {
        setErrorMessage('Unknown Error!');
        console.error(err);
      }
    } else {
      setErrorMessage('Please fill all the fields!');
    }
  }

  const checkConfirmPassword = () => {
    if (confirmPassword === password) {
      setPasswordMisMatch(false);
    } else {
      setPasswordMisMatch(true);
    }
  }

  const onChangeConfirmPassword = (e: any) => {
    setConfirmPassword(e.target.value);
    setPasswordMisMatch(false);
  }

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPasswordMisMatch(false);
  }

  return (
    <>
      <div className="err-success-wrapper">
        <div className={`error-wrapper ${errorMessage ? 'active' : ''}`}>
          <div className="error-text">{errorMessage}</div>
          <span className="error-close" onClick={() => setErrorMessage('')}></span>
        </div>
        <div className={`success-wrapper ${successMessage ? 'active' : ''}`}>
          <div className="success-text">{successMessage}</div>
          <span className="success-close" onClick={() => setSuccessMessage('')}></span>
        </div>
      </div>
      <div className="form-wrapper form-wrapper__register">
        <div className="form-title">Register</div>
        <div className="form">
          <div className="form-field">
            <label htmlFor="first_name">First Name</label>
            <input id="first_name" name="first_name" value={first_name} type="text" onChange={e => setFirstName(e.target.value)} placeholder="Enter First Name" />
          </div>
          <div className="form-field">
            <label htmlFor="last_name">Last Name</label>
            <input id="last_name" name="last_name" value={last_name} type="text" onChange={e => setLastName(e.target.value)} placeholder="Enter Last Name" />
          </div>
          <div className="form-field">
            <label htmlFor="phone_number">Phone Number</label>
            <input id="phone_number" name="phone_number" value={phone_number} type="text" onChange={e => setPhoneNumber(e.target.value)} placeholder="Enter Phone Number" />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" value={email} type="text" onChange={e => setEmail(e.target.value)} placeholder="Enter Email Address" />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder="Enter Password" />
          </div>
          <div className={`form-field ${passwordMismatch ? 'has-error' : ''}`} >
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" name="confirmPassword" value={confirmPassword} type="password" onBlur={checkConfirmPassword} onChange={onChangeConfirmPassword} placeholder="Enter Confirm Password" />
            <div className="form-field-error">Password mismatch!</div>
          </div>
          <div className="form-btns">
            <button className="btn" onClick={submitForm}>Register</button>
          </div>
        </div>
      </div>
    </>
  )
};

export default Register;
