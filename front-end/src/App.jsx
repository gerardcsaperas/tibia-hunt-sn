import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


// Own Components
import MyNavBar from "./components/layout/MyNavBar";
import Logo from "./components/layout/Logo";
import HomePage from "./components/layout/HomePage";
import SignUp from "./components/user/SignUp";
import LogIn from "./components/user/LogIn";
import Profile from './components/user/Profile';
import EditProfile from './components/user/EditProfile';
import NewCharacter from './components/character/NewCharacter';
import MyRecords from "./components/huntingRecords/MyRecords";
import AllRecords from "./components/huntingRecords/AllRecords";
import HuntDetails from "./components/huntingRecords/HuntDetails";
import Contact from "./components/misc/Contact";
import Footer from "./components/layout/Footer";



// Utils
import isTokenValid from './utils/isTokenValid';

// State Store
import { useSelector, useDispatch } from 'react-redux'
import {
	setUsername,
	setEmail,
	setCountry,
	setStars,
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
    // if (process.env.NODE_ENV == "development") {
    //   dispatch(authenticate());
    // }
		// If token is stored in local storage, see if token is valid
		if (user && user.token) {
			const checkAuthentication = async () => await isTokenValid(user.token);
			let isAuthenticated = checkAuthentication();
			// If token is valid, user is authenticated
			// set all values for user
			if (isAuthenticated) {
				dispatch(authenticate());
				dispatch(setUsername(user.user.username));
				dispatch(setEmail(user.user.email));
				dispatch(setCountry(user.user.country));
				dispatch(setStars(user.user.stars));
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
			<Logo/>
    	<Switch>
        	<Route exact path="/" >
				{ authenticated ? <Redirect to="/profile" /> : <HomePage /> }
			</Route>
			<Route exact path="/contact" >
				<Contact />
			</Route>
			<Route exact path="/login" >
				{ authenticated ? <Redirect to="/profile" /> : <LogIn /> }
			</Route>
			<Route exact path="/signup" >
				{ authenticated ? <Redirect to="/profile" /> : <SignUp /> }
			</Route>
			<Route exact path="/profile" >
				{ authenticated ? <Profile /> : <Redirect to="/login" /> }
			</Route>
			<Route exact path="/edit-profile" >
				{ authenticated ? <EditProfile /> : <Redirect to="/login" /> }
			</Route>
			<Route exact path="/characters/new">
				{ authenticated ? <NewCharacter /> : <Redirect to="/login" /> }
			</Route>
			<Route exact path="/my-records" >
				{/* { authenticated ? <Profile /> : <Redirect to="/login" /> } */}
				<MyRecords />
			</Route>
			<Route exact path="/all-records" >
				{/* { authenticated ? <Profile /> : <Redirect to="/login" /> } */}
				<AllRecords />
			</Route>
			<Route exact path="/record-details/:recordID" >
				{/* { authenticated ? <Profile /> : <Redirect to="/login" /> } */}
				<HuntDetails />
			</Route>
      	</Switch>

		<Footer />
    </Router>
  );
}

export default App;
