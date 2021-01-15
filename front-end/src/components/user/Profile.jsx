import React, { Fragment, useEffect, useState } from 'react';
import ContentBox from '../custom/ContentBox/ContentBox';
import StarRatings from 'react-star-ratings';
import axios from "axios";
import {Link} from 'react-router-dom';
import { API_URL } from "../../config";
import './Profile.scss';

// Child Components
import SmallTable from '../custom/SmallTable/SmallTable'
import StarSytemModal from '../misc/StarSystemModal';

// State Store
import { useSelector, useDispatch } from 'react-redux'
import {
	setUsername,
    setEmail,
    setCountry,
    setStars,
	selectUser
} from './userSlice'

function Profile() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const [ characters, setCharacters ] = useState();
    const [ loading, setLoading ] = useState(true);

    // Get characters on component initialization
    useEffect(() => {
        getUser();
        getCharacters();
    }, [])

    const getUser = async() => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            };

            const response = await axios.get(`${API_URL}/user`, config);
            
            if (response.status === 200 && response.data) {
                dispatch(setUsername(response.data.username));
				dispatch(setEmail(response.data.email));
                dispatch(setCountry(response.data.country));
                dispatch(setStars(response.data.stars));
            }

        } catch(e) {
            console.error(e);
        }
    }

    // Function used to retrieve user characters
    const getCharacters = async() => {
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
                    setCharacters([...characters]);
                }
                setLoading(false);
            }

        } catch(e) {
            console.error(e);
        }
    }
    
    const passUserData = () => {

        let country = user.country ? user.country : "N/A"

        return ([
            [ 'User Name:', user.username ],
            [ 'Country:',  country]
        ])
    }

    const renderStars = () => {
        return (
            <StarRatings
                rating={user.stars}
                starDimension="20px"
                starSpacing="1px"
                starRatedColor="gold"
            />
        )
    }

    const content = (
        <div className="Profile">
            <Link to="/edit-profile"><i className="fas fa-cog"></i></Link>
            <div className="image-box">
                <img className="profile-image" src="/images/default_user.jpg"/>
            </div>
            <p className="char-name">{user.username}</p>
            <div className="stars-box">
                { loading ? null : renderStars() }
                <Link to="/star-system"><i className="help fas fa-question-circle"></i></Link>
            </div>
            <SmallTable
            title="Account Information"
            data={loading ? null : passUserData()}
            />
            <SmallTable
            title="Characters"
            data={!characters ? null : characters}
            />
            <Link className="link" to="/characters/new"><i className="fas fa-plus-circle"></i>Add New Character</Link>
            <div className="buttons__box">
                <Link className="button" to="/new-hunting-record">Create New Record</Link>
                <Link className="button" to="/my-hunting-records">My Records</Link>
            </div>
        </div>
      )
    
        return (
        <ContentBox
          width="370"
          title="Profile"
          loading={loading}
          content={content}
        ></ContentBox>
        )
}

export default Profile
