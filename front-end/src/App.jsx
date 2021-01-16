import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { API_URL } from "./config";
import axios from "axios";

// Own Components
import MyNavBar from "./components/layout/MyNavBar";
import Logo from "./components/layout/Logo";
import HomePage from "./components/layout/HomePage";
import SignUp from "./components/user/SignUp";
import LogIn from "./components/user/LogIn";
import Logout from './components/user/Logout';
import Profile from './components/user/Profile';
import EditProfile from './components/user/EditProfile';
import NewCharacter from './components/character/NewCharacter';
import MyRecords from "./components/huntingRecords/MyRecords";
import AllRecords from "./components/huntingRecords/AllRecords";
import HuntDetails from "./components/huntingRecords/HuntDetails";
import Contact from "./components/misc/Contact";
import Footer from "./components/layout/Footer";

// State Store
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
} from './components/user/userSlice'
import { setCharacters } from './components/character/characterSlice';
import {
	setWidth,
	setHeight
} from './components/layout/viewportSlice'

function App() {

	const user = useSelector(selectUser);
	const { authenticated } = user;
	const dispatch = useDispatch()

	useEffect(() => {
		getUser();
	}, []);

	useEffect(() => {
		if (authenticated) {
			getCharacters();
		}
	}, [authenticated])

	const getUser = async () => {
		let localStorageUser = JSON.parse(localStorage.getItem('TibiaHuntingRecordsUser'));

		if (localStorageUser && localStorageUser.token) {

			const options = {
				headers: {
					'Authorization': `Bearer ${localStorageUser.token}`
				}
			}
		
			try {
				let user = await axios.get(`${API_URL}/user`, options)
		
				if (!user) {
					throw new Error();
				}
		
				dispatch(setUsername(user.data.username));
				dispatch(setAvatar(user.data.avatar));
				dispatch(setEmail(user.data.email));
				dispatch(setCountry(user.data.country));
				dispatch(setStars(user.data.stars));
				dispatch(setUid(user.data._id));
				dispatch(setToken(localStorageUser.token));
				dispatch(authenticate());

			} catch (e) {
				console.error('There was an error when trying to verify your user. ' + e.message);
			}
		}
	}

	const getCharacters = async () => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            };

            const response = await axios.get(`${API_URL}/character`, config);
            
            if (response.status === 200) {
                if (response.data.length > 0) {
                    const characters = response.data.map(char => {
                        return [char.name, char.vocation, char.level]
					})
                    dispatch(setCharacters(characters));
                }
            }

        } catch(e) {
            console.error(e);
        }
    }

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
				<MyNavBar />
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
				{ authenticated ? <EditProfile /> : <Redirect to="/signup" /> }
			</Route>
			<Route exact path="/characters/new">
				{ authenticated ? <NewCharacter /> : <Redirect to="/signup" /> }
			</Route>
			<Route exact path="/my-records" >
				{ authenticated ? <MyRecords /> : <Redirect to="/signup" /> }
			</Route>
			<Route exact path="/all-records" >
				<AllRecords />
			</Route>
			<Route exact path="/record-details/:recordID" >
				<HuntDetails />
			</Route>
			<Route exact path="/logout">
				<Logout />
			</Route>
      	</Switch>

		<Footer />
    </Router>
  );
}

export default App;
