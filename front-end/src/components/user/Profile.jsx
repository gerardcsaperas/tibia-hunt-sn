import React, { Fragment, useEffect, useState } from 'react';
import ContentBox from '../custom/ContentBox/ContentBox';
import axios from "axios";
import {Link} from 'react-router-dom';
import { API_URL } from "../../config";
import './Profile.scss';

// Child Components
import SmallTable from '../custom/SmallTable/SmallTable'
import StarSytemModal from '../misc/StarSystemModal';

// Redux
import { useSelector } from 'react-redux'
import {
	selectUser
} from './userSlice'

function Profile() {
    const user = useSelector(selectUser);

    const [ characters, setCharacters ] = useState();
    const [ loading, setLoading ] = useState(true);

    // Get characters on component initialization
    useEffect(() => {
        getCharacters();
    }, [])

    // Function used to retrieve user characters
    const getCharacters = async() => {
        try {
            const config = {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                }
            };

            const response = await axios.get(`${API_URL}/character`, config);
            
            if (response.status === 200 && response.data.length > 0) {
                const characters = response.data.map(char => {
                    return [char.name, char.vocation, char.level]
                })
                setCharacters([...characters]);
                setLoading(false);
            }

        } catch(e) {
            console.error(e);
        }
    }
    
    const mockUserData = [
        ['User Name:', 'Jararu'],
        ['Country:', 'Poland']
    ]
    const mockCharData = [
        ['Jararu', 'Sorcerer', '111'],
        ['Topotamadre', 'RP', '222'],
        ['Elpuma', 'EK', '333'],
        ['Jararu', 'Sorcerer', '111'],
        ['Topotamadre', 'RP', '222'],
        ['Elpuma', 'EK', '333']
    ]

    const content = (
        <div className="Profile">
            <Link to="/edit-profile"><i className="fas fa-cog"></i></Link>
            <div className="image-box">
                <img className="profile-image" src=""/>
            </div>
            <p className="char-name">{user.username}</p>
            <div className="stars-box">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half"></i>
                <Link to="/star-system"><i className="help fas fa-question-circle"></i></Link>
            </div>
            <SmallTable
            title="Account Information"
            data={mockUserData}
            />
            <SmallTable
            title="Characters"
            data={mockCharData}
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
