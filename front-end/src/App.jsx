import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


// Own Components
import MyNavBar from "./components/layout/MyNavBar";
import HomePage from "./components/layout/HomePage";
import SignUp from "./components/user/SignUp";
import LogIn from "./components/user/LogIn";
import Profile from './components/user/Profile';
import NewCharacter from './components/character/NewCharacter';
import MyRecords from "./components/huntingRecords/MyRecords";

// Utils
import isTokenValid from './utils/isTokenValid';

// State Store
import { useSelector, useDispatch } from 'react-redux'
import {
	setUsername,
	setToken,
	setUid,
	authenticate,
	selectUser
} from './components/user/userSlice'
import {
	setWidth,
	setHeight
} from './components/layout/viewportSlice'

function App() {

  	const authenticated = useSelector(selectUser).authenticated;
	const dispatch = useDispatch()

	// Check if user is already authenticated.
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('TibiaHuntingRecordsUser'));
		console.log(user);
		
    // if (process.env.NODE_ENV == "development") {
    //   dispatch(authenticate());
    // }
		// If token is stored in local storage, see if token is valid
		if (user && user.token) {
			let isAuthenticated = async () => await isTokenValid(user.token);
			// If token is valid, user is authenticated
			// set all values for user
			if (isAuthenticated) {
				dispatch(authenticate());
				dispatch(setUsername(user.user.username));
				dispatch(setUid(user.user._id));
				dispatch(setToken(user.token));
			}
		}
	}, [])

	// Window resize listener to make custom responsive components
	useEffect(() => {
        updateWindowDimensions()
        window.addEventListener('resize', updateWindowDimensions);
    }, [])

    const updateWindowDimensions = () => {
		dispatch(setWidth(window.innerWidth));
		dispatch(setHeight(window.innerHeight));
    }

  return (
    <Router>
      <Route>
			<MyNavBar props={authenticated}/>
		</Route>
      <Switch>
        <Route exact path="/" >
					{/* { authenticated ? <Redirect to="/profile" /> : <HomePage /> } */}
					<HomePage />
		</Route>
		<Route exact path="/login" >
					{/* { authenticated ? <Redirect to="/profile" /> : <LogIn /> } */}
					<LogIn />
		</Route>
		<Route exact path="/signup" >
					{/* authenticated ? <Redirect to="/profile" /> : <SignUp /> */}
					<SignUp />
		</Route>
		<Route exact path="/profile" >
					{ authenticated ? <Profile /> : <Redirect to="/login" /> }
		</Route>
		<Route exact path="/characters/new">
					{ authenticated ? <NewCharacter /> : <Redirect to="/login" /> }
		</Route>
      </Switch>
    </Router>
  );
}

export default App;
