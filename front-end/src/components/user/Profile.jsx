import React, { Fragment, useEffect, useState } from 'react';
import ContentBox from '../custom/ContentBox/ContentBox';
import axios from "axios";
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

    // Get characters on component initialization
    useEffect(() => {
        getCharacters();
    }, [])

    useEffect(() => {
        console.log(characters);
    }, [characters])

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
                setCharacters([...characters])
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
        ['Elpuma', 'EK', '333']
    ]

    const content = (
        <Fragment>
            <i className="fas fa-cog"></i>
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
            </div>
            <SmallTable
            title="Account Information"
            data={mockUserData}
            />
            <SmallTable
            title="Characters"
            data={mockCharData}
            />
        </Fragment>
      )
    
        return (
        <ContentBox
          height="500"
          width="370"
          title="Profile"
          content={content}
        ></ContentBox>
        )
}

export default Profile
