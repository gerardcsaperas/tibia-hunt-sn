import React, { Fragment, useState } from 'react';
import axios from "axios";
import { API_URL } from "../config";
import {Link} from 'react-router-dom';
import ContentBox from './custom/ContentBox/ContentBox';
import "./styles/LogIn.css";



function LogIn() {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

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
      }
      
    } catch(e) {
      console.error(e);
    }
  };

  const content = (
    <Fragment>
    <div className="logIn">
          <form>
              <label className="dividers">
                  Email Adress:
                  <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} autoComplete="off"/>
              </label>
              <label className="dividers">
                  Password:
                  <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} autoComplete="off"/>
              </label>
          </form>
        <p className="toSignUp">Not a member yet?<Link to="/signup">Sign Up</Link></p>
    </div>
    <div className="buttons__box">
      <button className="button" type="submit" onClick={handleLogIn}>Login</button>
    </div>
  </Fragment>
    
  )

    return (
    <ContentBox
      height="400px"
      width="370px"
      title="Login"
      content={content}
    ></ContentBox>
    )
}

export default LogIn
