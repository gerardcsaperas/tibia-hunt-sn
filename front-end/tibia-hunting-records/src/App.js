import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Switch, Route, withRouter } from "react-router-dom";
import { API_URL } from "./config";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


//Components
import CharacterEdit from "./components/CharacterEdit";
import NewCharacter from "./components/NewCharacter";
import AllRecords from "./components/AllRecords";
import EditHuntingRecord from "./components/EditHuntingRecord";
import HomePage from "./components/HomePage";
import LogIn from "./components/LogIn";
import MyRecords from "./components/MyRecords";
import MyNavBar from "./components/MyNavBar";
import NewHuntingRecord from "./components/NewHuntingRecord";
import Profile from "./components/Profile";
import ProfileEdit from "./components/ProfileEdit";
import RecordDetails from "./components/RecordDetails";
import SignUp from "./components/SignUp";
import StarSystem from "./components/StarSystem";




class App extends React.Component {

  state = {
    loggedInUser: null,
    showGeneralModal: false,
    modalMessage : "",
    modalHeader: "",
    modalButtonType: "",
    modalButtonStyle: {}
  };

  componentDidMount() {
    if (!this.state.loggedInUser) {
      axios
        .get(`${API_URL}/auth/user`, { withCredentials: true })
        .then((res) => {
          axios
            .get(`${API_URL}/users/${res.data._id}`, { withCredentials: true })
            .then((user) => {
              this.setState({
                loggedInUser: user.data,
              });
            });
        });
    }
  }

  handleSignUp = (e) => {
    e.preventDefault();
    const { username, email, password } = e.currentTarget;
    axios
      .post(
        `${API_URL}/auth/signup`,
        {
          username: username.value,
          email: email.value,
          password: password.value,
        },
        { withCredentials: true }
      )
      .then((res) => {
        this.setState(
          {
            loggedInUser: res.data,
          },
          () => {
            this.props.history.push("/hero-home");
          }
        );
      })
      .catch((err) => {
        const {errorMessage} = err.response.data
        this.setState({
          showGeneralModal: true,
          modalMessage : errorMessage,
          modalHeader: "Oops!",
          modalButtonType: "info",
          modalButtonStyle: {}
        })
      })
  };

  handleLogIn = (e) => {
    e.preventDefault();
    const { email, password } = e.currentTarget;
    axios
      .post(
        `${API_URL}/auth/signin`,
        {
          email: email.value,
          password: password.value,
        },
        { withCredentials: true }
      )
      .then((res) => {
        this.setState(
          {
            loggedInUser: res.data,
          },
          () => {
            this.props.history.push("/profile");
          }
        );
      })
      .catch((err) => {
        const {errorMessage} = err.response.data
        this.setState({
          showGeneralModal: true,
          modalMessage : errorMessage,
          modalHeader: "Oops!",
          modalButtonType: "info",
          modalButtonStyle: {}
        })
      })
  };

  handleLogOut = () => {
    axios
      .post(`${API_URL}/auth/logout`, {}, { withCredentials: true })
      .then(() => {
        this.setState(
          {
            loggedInUser: null,
          },
          () => {
            this.props.history.push("/");
          }
        );
      });
  };


  handleEdit = (updatedUser) => {
    if (updatedUser.username === ""){
      this.setState({
        showGeneralModal: true,
        modalMessage : "Username can't be blank",
        modalHeader: "Oops!",
        modalButtonType: "info",
        modalButtonStyle: {}
      })
    } else if (updatedUser.email === ""){
      this.setState({
        showGeneralModal: true,
        modalMessage : "Email can't be blank",
        modalHeader: "Oops!",
        modalButtonType: "info",
        modalButtonStyle: {}
      })
    } else if (updatedUser.password === ""){
      this.setState({
        showGeneralModal: true,
        modalMessage : "Password can't be blank",
        modalHeader: "Oops!",
        modalButtonType: "info",
        modalButtonStyle: {}
      })
    } else {
    let cloneUser = {
      username: updatedUser.username,
      email: updatedUser.email,
      image: updatedUser.image,
      password: updatedUser.password,
    };
    axios
      .patch(
        `${API_URL}/users/${this.state.loggedInUser._id}/edit`,
        cloneUser,
        { withCredentials: true }
      )
      .then((res) => {
        delete cloneUser.password;
        cloneUser._id = res.data._id;
        cloneUser.points = res.data.points;
        cloneUser.rank = res.data.rank;
        cloneUser.passwordHash = res.data.passwordHash;
        this.setState(
          {
            loggedInUser: cloneUser,
          },
          () => {
            this.props.history.push("/profile");
          }
        );
      })
      .catch((err) => {
        const {errorMessage} = err.response.data
        let message
        if(errorMessage.codeName === "DuplicateKey"){
          if(Object.keys(errorMessage.keyPattern).includes("username")){
            message = "This username already exists. Please select a new one."
          } else if(Object.keys(errorMessage.keyPattern).includes("email")){
            message = "This email is already in use. Please select a new one."
          }
        } else {
          message = errorMessage
        }
        this.setState({
          showGeneralModal: true,
          modalMessage : message,
          modalHeader: "Oops!",
          modalButtonType: "info",
          modalButtonStyle: {}
        })
      })
    }
  };


  handleEditChar = (updatedChar) => {
    if (updatedChar.charactername === ""){
      this.setState({
        showGeneralModal: true,
        modalMessage : "Character Name can't be blank",
        modalHeader: "Oops!",
        modalButtonType: "info",
        modalButtonStyle: {}
      })
    } else if (updatedChar.level === ""){
      this.setState({
        showGeneralModal: true,
        modalMessage : "Level can't be blank",
        modalHeader: "Oops!",
        modalButtonType: "info",
        modalButtonStyle: {}
      })
    } else if (updatedChar.vocation === ""){
      this.setState({
        showGeneralModal: true,
        modalMessage : "Vocation can't be blank",
        modalHeader: "Oops!",
        modalButtonType: "info",
        modalButtonStyle: {}
      })
    } else if (updatedChar.world === ""){
      this.setState({
        showGeneralModal: true,
        modalMessage : "World can't be blank",
        modalHeader: "Oops!",
        modalButtonType: "info",
        modalButtonStyle: {}
      })
    } else {
    let cloneChar = {
      charactername: updatedChar.charactername,
      level: updatedChar.level,
      vocation: updatedChar.vocation,
      world: updatedChar.world,
    };
    axios
      .patch(
        `${API_URL}/character/${this.state.loggedInUser._id}/edit`,
        cloneChar,
        { withCredentials: true }
      )
      .then((res) => {
        delete cloneChar.password;
        cloneChar._id = res.data._id;
        cloneChar.points = res.data.points;
        cloneChar.rank = res.data.rank;
        cloneChar.passwordHash = res.data.passwordHash;
        this.setState(
          {
            loggedInUser: cloneUser,
          },
          () => {
            this.props.history.push("/profile");
          }
        );
      })
      .catch((err) => {
        const {errorMessage} = err.response.data
        let message
        if(errorMessage.codeName === "DuplicateKey"){
          if(Object.keys(errorMessage.keyPattern).includes("username")){
            message = "This username already exists. Please select a new one."
          } else if(Object.keys(errorMessage.keyPattern).includes("email")){
            message = "This email is already in use. Please select a new one."
          }
        } else {
          message = errorMessage
        }
        this.setState({
          showGeneralModal: true,
          modalMessage : message,
          modalHeader: "Oops!",
          modalButtonType: "info",
          modalButtonStyle: {}
        })
      })
    }
  };


  // handleEditRec = (updatedChar) => {
  //   if (updatedChar.charactername === ""){
  //     this.setState({
  //       showGeneralModal: true,
  //       modalMessage : "Character Name can't be blank",
  //       modalHeader: "Oops!",
  //       modalButtonType: "info",
  //       modalButtonStyle: {}
  //     })
  //   } else if (updatedChar.level === ""){
  //     this.setState({
  //       showGeneralModal: true,
  //       modalMessage : "Level can't be blank",
  //       modalHeader: "Oops!",
  //       modalButtonType: "info",
  //       modalButtonStyle: {}
  //     })
  //   } else if (updatedChar.vocation === ""){
  //     this.setState({
  //       showGeneralModal: true,
  //       modalMessage : "Vocation can't be blank",
  //       modalHeader: "Oops!",
  //       modalButtonType: "info",
  //       modalButtonStyle: {}
  //     })
  //   } else if (updatedChar.world === ""){
  //     this.setState({
  //       showGeneralModal: true,
  //       modalMessage : "World can't be blank",
  //       modalHeader: "Oops!",
  //       modalButtonType: "info",
  //       modalButtonStyle: {}
  //     })
  //   } else {
  //   let cloneChar = {
  //     charactername: updatedChar.charactername,
  //     level: updatedChar.level,
  //     vocation: updatedChar.vocation,
  //     world: updatedChar.world,
  //   };
  //   axios
  //     .patch(
  //       `${API_URL}/character/${this.state.loggedInUser._id}/edit`,
  //       cloneChar,
  //       { withCredentials: true }
  //     )
  //     .then((res) => {
  //       delete cloneChar.password;
  //       cloneChar._id = res.data._id;
  //       cloneChar.points = res.data.points;
  //       cloneChar.rank = res.data.rank;
  //       cloneChar.passwordHash = res.data.passwordHash;
  //       this.setState(
  //         {
  //           loggedInUser: cloneUser,
  //         },
  //         () => {
  //           this.props.history.push("/profile");
  //         }
  //       );
  //     })
  //     .catch((err) => {
  //       const {errorMessage} = err.response.data
  //       let message
  //       if(errorMessage.codeName === "DuplicateKey"){
  //         if(Object.keys(errorMessage.keyPattern).includes("username")){
  //           message = "This username already exists. Please select a new one."
  //         } else if(Object.keys(errorMessage.keyPattern).includes("email")){
  //           message = "This email is already in use. Please select a new one."
  //         }
  //       } else {
  //         message = errorMessage
  //       }
  //       this.setState({
  //         showGeneralModal: true,
  //         modalMessage : message,
  //         modalHeader: "Oops!",
  //         modalButtonType: "info",
  //         modalButtonStyle: {}
  //       })
  //     })
  //   }
  // };


  handleModalClose = () => {
    this.setState({
      showGeneralModal: false
    })
  }


  hanldeNotification = (aMessage) => {
    setTimeout(this.handleModalClose, 1500)
    this.setState({
      showGeneralModal: true,
      modalMessage : aMessage,
      modalHeader: "Youpi!",
      modalButtonStyle: {display: "none"}
    }, this.props.history.push("/goals-success"))
  }


  render() {
    return (
      <div id="app">
        <MyNavBar onLogOut={this.handleLogOut} loggedInUser={this.state.loggedInUser} />
        {this.state.loggedInUser ? <Dashboard /> : ""}

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signup" render={(routeProps) => {
              return <SignUp onSignUp={this.handleSignUp} {...routeProps} />;
            }}/>
          <Route path="/login" render={(routeProps) => {
              return <LogIn onLogIn={this.handleLogIn} {...routeProps} />;
            }}/>
          <Route path="/star-system" component={StarSystem} />
          <Route exact path="/profile" render={(routeProps) => {
              return <Profile loggedInUser={this.state.loggedInUser} onDelete={this.handleLogOut} {...routeProps} />
            }}/>
          <Route path="/profile/edit" render={(routeProps) => {
              return <ProfileEdit loggedInUser={this.state.loggedInUser} onEdit={this.handleEdit} {...routeProps} />
            }}/>
          <Route path="/new-character" render={(routeProps) => {
              return <NewCharacter loggedInUser={this.state.loggedInUser} {...routeProps} />
            }} />
          <Route path="/character/edit" render={(routeProps) => {
              return <CharacterEdit loggedInUser={this.state.loggedInUser} onEdit={this.handleEditChar} {...routeProps} />
            }}/>
          <Route exact path="/my-records" render={(routeProps) => {
              return <MyRecords loggedInUser={this.state.loggedInUser} {...routeProps} />
            }}/>
          <Route path="/record-details" render={(routeProps) => {
              return <RecordDetails loggedInUser={this.state.loggedInUser} {...routeProps} />
            }}/>
          <Route path="/new-hunting-record" render={(routeProps) => {
              return <NewHuntingRecord loggedInUser={this.state.loggedInUser} {...routeProps} />;
            }}/>
          <Route path="/hunting-record/edit" render={(routeProps) => {
              return <EditHuntingRecord loggedInUser={this.state.loggedInUser} onEdit={this.handleEditRec} {...routeProps} />;
            }}/>
          <Route path="/all-records" render={(routeProps) => {
              return <AllRecords loggedInUser={this.state.loggedInUser} {...routeProps} />;
            }}/>
          <Route path="*" component={NotFoundPage} />    
        </Switch>
        <Modal className="modalContainer" show={this.state.showGeneralModal} onHide={this.handleModalClose} >
          <Modal.Header className="modalTitleContainer" style={this.state.modalButtonStyle}>
            <Modal.Title className="modalTitle">{this.state.modalHeader}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modalText">
            {this.state.modalMessage}
          </Modal.Body>
          <Modal.Footer className="modalButtonsContainer" style={this.state.modalButtonStyle}>
            <Button className="buttonYes" variant={this.state.modalButtonType} onClick={this.handleModalClose}>
              Ok, got it
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withRouter(App);