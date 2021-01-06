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
  const [ email, setEmail ] = useState('');
  const [ emailError, setEmailError ] = useState(false);
  const [ password, setPassword ] = useState('');

  const updateEmail = (e) => {
    setEmail(e.target.value);
    setEmailError(false);
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
      
      if (response.status === 200) {
				// store the user in localStorage (can only store strings)
				localStorage.setItem('TibiaHuntingRecordsUser', JSON.stringify(response.data));
				window.location.href = '/profile';
      }
      
    } catch(e) {

      let error = e.response.data.message.toString()
      
      if (error.includes('The specified email address is already in use')) {
        setEmailError(true);
      }
    }
  };



  const content = (
    <Fragment>
    <div className="signUp">
          <form >
              <label className="dividers">User Name:</label>
              <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} autoComplete="off"/>
              
              <label className="dividers"> Email Adress:</label>
              <input type="email" name="email" onChange={(e) => updateEmail(e)} autoComplete="off"/>
              {emailError ? <p style={{color: "red"}}>Email already in use</p> : null }

              <label className="dividers"> Password:</label>
              <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} autoComplete="off"/>
              
          </form>
        <p className="toLogin">Already a member?<Link to="/login">Login</Link></p>
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
