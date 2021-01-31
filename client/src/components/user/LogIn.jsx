import React, { Fragment, useState } from 'react';
import axios from "axios";
import { API_URL } from '../../config';
import {Link} from 'react-router-dom';
import ContentBox from '../custom/ContentBox/ContentBox';
import FormBox from '../custom/FormBox/FormBox';
import { useSelector, useDispatch } from 'react-redux'
import {
	setUsername,
	setAvatar,
	setEmail,
	setCountry,
	setStars,
	setToken,
	setUid,
	authenticate,
	selectUser
} from './userSlice'


function LogIn() {

  const user = useSelector(selectUser);
	const { authenticated } = user;
	const dispatch = useDispatch()

  const [ email, setBodyEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState();

  const updateEmail = (e) => {
    setBodyEmail(e.target.value);
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
      const response = await axios.post(`${API_URL}/user/login`, body, config);
      
      if (response.status === 200) {
        localStorage.setItem('TibiaHuntingRecordsUser', JSON.stringify(response.data));
        let { username, avatar, email, country, stars, _id } = response.data.user;
        let { token } = response.data;

        dispatch(setUsername(username));
				dispatch(setAvatar(avatar));
				dispatch(setEmail(email));
				dispatch(setCountry(country));
				dispatch(setStars(stars));
				dispatch(setUid(_id));
				dispatch(setToken(token));
				dispatch(authenticate());
      } else {
        console.log('here')
        setError(true);
      }
      
    } catch(e) {
      setError(true);
      if (e.request.status === 400) {
        setErrorMsg('Invalid Credentials');
      } else {
        setErrorMsg('Something went wrong, please contact us if the error persists.')
      }
      
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
        {error ? <p style={{color: "red"}}>{ errorMsg }</p> : null }
        <p>Not a member yet?<Link to="/signup">Sign Up</Link></p>
        <Link to="/account-lost">Account Lost?</Link>
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
