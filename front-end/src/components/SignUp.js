import React, { Fragment } from 'react';
import Button from './custom/Button/Button';
import {Link} from 'react-router-dom';
import ContentBox from './custom/ContentBox/ContentBox';
import "./styles/SignUp.css";



function SignUp() {

  const content = (
    <Fragment>
    <div className="signUp">
          <form >
              <label className="dividers">
                  User Name:
                  <input type="text" name="name" />
              </label>
          </form>

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
    </div>
    
    <div className="buttons__box">
      <button className="button">Sign Up</button>
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
