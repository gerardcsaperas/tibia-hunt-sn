import React, { Fragment } from 'react';
import axios from "axios";
// import { API_URL } from "./config";
import Button from './custom/Button/Button';
import {Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import ContentBox from './custom/ContentBox/ContentBox';
import "./styles/LogIn.css";



function LogIn() {

  // const handleLogIn = (e) => {
  //   e.preventDefault();
  //   const { email, password } = e.currentTarget;
  //   axios
  //     .post(
  //       `${API_URL}/auth/login`,
  //       {
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
    <div className="logIn">
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

          {/* <Form.Text className="toSignUp">
          Not a member yet? <Link to="/signup">Sign Up</Link>
        </Form.Text> */}

        <p className="toSignUp">Not a member yet?<u>Sign Up</u></p>
    </div>

    <div className="buttons__box">
      <button className="button" type="submit" onClick={this.handleLogIn}>Login</button>
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
