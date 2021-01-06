import React, { Fragment } from 'react';
import axios from "axios";
// import { API_URL } from "./config";
import Button from './custom/Button/Button';
import {Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import ContentBox from './custom/ContentBox/ContentBox';
import "./styles/SignUp.css";



function SignUp() {

  // const handleSignUp = (e) => {
  //   e.preventDefault();
  //   const { username, email, password } = e.currentTarget;
  //   axios
  //     .post(
  //       `${API_URL}/auth/signup`,
  //       {
  //         username: username.value,
  //         email: email.value,
  //         password: password.value,
  //       },
  //       { withCredentials: true }
  //     )
  //     .then((res) => {
  //       this.setState(
  //         {
  //           loggedInUser: res.data,
  //         },
  //         () => {
  //           this.props.history.push("/profile");
  //         }
  //       );
  //     })
  //     .catch((err) => {
  //       const {errorMessage} = err.response.data
  //     })
  // };



  const content = (
    <Fragment>
    <div className="signUp">
          <form >
              <label className="dividers">
                  User Name:
                  <input type="text" name="username" />
              </label>
          </form>

          <form>
              <label className="dividers">
                  Email Adress:
                  <input type="email" name="email" />
              </label>
          </form>

          <form>
              <label className="dividers">
                  Password:
                  <input type="password" name="password" />
              </label>
          </form>

        {/* <Form.Text className="toLogIn">
          Already a member? <Link to="/login">Login</Link>
        </Form.Text> */}

        <p className="toLogin">Already a member?<u>Login</u></p>
    </div>

    <div className="buttons__box">
      <button className="button" /*onClick={this.handleSignUp}*/>Sign Up</button>
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
