import React, { Fragment, useState } from 'react';
import axios from "axios";
import { API_URL } from "../config";
import {Link} from 'react-router-dom';
import ContentBox from './custom/ContentBox/ContentBox';
import "./styles/SignUp.css";
import { setUser } from './user/userSlice';


//HERE
function SignUp() {

  const [ username, setUsername ] = useState('');
  const [ usernameError, setUsernameError ] = useState(false);
  const [ email, setEmail ] = useState('');
  const [ emailError, setEmailError ] = useState(false);
  const [ password, setPassword ] = useState('');
  const [ passwordError, setPasswordError ] = useState(false);

  const updateUsername = (e) => {
    setUsername(e.target.value);
    setUsernameError(false);
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
    setEmailError(false);
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			};
			const body = JSON.stringify({ username, email, password });
      const response = await axios.post(`${API_URL}/user`, body, config);
      
      if (response.status === 201) {
				// store the user in localStorage (can only store strings)
				localStorage.setItem('TibiaHuntingRecordsUser', JSON.stringify(response.data));
				window.location.href = '/profile';
      }
      
    } catch(e) {

      let error = e.response.data.message.toString()
      
      if (error.includes('email')) {
        setEmailError(true);
      }

      if (error.includes('username')) {
        setUsernameError(true);
      }

      if (error.includes('password')) {
        setPasswordError(true);
      }

      
    }
  };

  const content = (
    <Fragment>
    <div className="signUp">
          <form id="signup-form">
            <div className="form-input-row">
              <label className="dividers">User Name:</label>
              <input type="text" name="username" onChange={(e) => updateUsername(e)} autoComplete="off"/>
              {usernameError ? <p style={{color: "red"}}>Username already in use</p> : null }
            </div>
            <div className="form-input-row">
              <label className="dividers"> Email Adress:</label>
              <input type="email" name="email" onChange={(e) => updateEmail(e)} autoComplete="off"/>
              {emailError ? <p style={{color: "red"}}>Email already in use</p> : null }
            </div>   
            <div className="form-input-row">
              <label className="dividers"> Password:</label>
              <input type="password" name="password" onChange={(e) => updatePassword(e)} autoComplete="off"/>
              {passwordError ? <p style={{color: "red"}}>Password must be, at least, 8 characters long</p> : null }
            </div>
          </form>
        <p className="toLogin">Already a member? <Link to="/login"> Login</Link></p>
    </div>

    <div className="buttons__box">
      <button className="button" onClick={handleSignUp}>Sign Up</button>
    </div>
  </Fragment>
    
  )

    return (
    <ContentBox
      height="480px"
      width="370px"
      title="Sign Up"
      content={content}
    ></ContentBox>
    )
}

export default SignUp
