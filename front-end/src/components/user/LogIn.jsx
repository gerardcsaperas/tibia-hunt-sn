import React, { Fragment, useState } from 'react';
import axios from "axios";
import { API_URL } from '../../config';
import {Link} from 'react-router-dom';
import ContentBox from '../custom/ContentBox/ContentBox';
import FormBox from '../custom/FormBox/FormBox';



function LogIn() {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState(false);

  const updateEmail = (e) => {
    setEmail(e.target.value);
    setError(false);
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
    setError(false);
  }

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			};
			const body = JSON.stringify({ email, password });
      const response = await axios.post(`${API_URL}/auth/login`, body, config);
      
      if (response.status === 200) {
				// store the user in localStorage (can only store strings)
				localStorage.setItem('TibiaHuntingRecordsUser', JSON.stringify(response.data));
				window.location.href = '/profile';
      } else {

      }
      
    } catch(e) {
      console.error(e);
    }
  };

  const form = (
    <form className="login-form">
        <div className="form-input-row">
          <label>Email Adress:</label>
          <input type="email" name="email" onChange={(e) => updateEmail(e)} autoComplete="off"/>
        </div>
        <div className="form-input-row">
          <label>Password:</label>
          <input type="password" name="password" onChange={(e) => updatePassword(e)} autoComplete="off"/>
        </div>
        {error ? <p style={{color: "red"}}>Invalid credentials</p> : null }
        <p>Not a member yet?<Link to="/signup">Sign Up</Link></p>
    </form>
  )

  const content = (
    <Fragment>
    <FormBox form={form} />
    <div className="buttons__box">
      <button className="button" type="submit" onClick={handleLogIn}>Login</button>
    </div>
  </Fragment>
    
  )

    return (
    <ContentBox
      width="370"
      title="Login"
      content={content}
    ></ContentBox>
    )
}

export default LogIn
