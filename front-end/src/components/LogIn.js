import React, { Fragment } from 'react';
import Button from './custom/Button/Button';
import {Link} from 'react-router-dom';
import ContentBox from './custom/ContentBox/ContentBox';
import "./styles/LogIn.css";



function LogIn() {

  const content = (
    <Fragment>
    <div className="logIn">
          <form>
              <label className="dividers">
                  Email Adress:
                  <input type="text" name="name" />
              </label>
          </form>

          <form>
              <label className="dividers">
                  Password:
                  <input type="text" name="name" />
              </label>
          </form>

          <p className="toSignUp">Not a member yet?<u>Sign Up</u></p>
    </div>

    <div className="buttons__box">
      <button className="button">Login</button>
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
