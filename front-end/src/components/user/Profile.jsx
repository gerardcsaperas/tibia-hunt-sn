import React, { Fragment, useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import {Link} from 'react-router-dom';
import './Profile.scss';

// Child Components
import ContentBox from '../custom/ContentBox/ContentBox';
import SmallTable from '../custom/SmallTable/SmallTable';
import StarSytemModal from '../misc/StarSystemModal';

// State Store
import { useSelector } from 'react-redux'
import { selectUser } from './userSlice'
import { selectCharacters } from '../character/characterSlice'


function Profile() {
    const user = useSelector(selectUser);
    const { characters } = useSelector(selectCharacters);
    const [ deleteCharacterModal, setDeleteCharacterModal ] = useState(false);

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
            <Link to="/logout"><i className="fas fa-sign-out-alt"></i></Link>
            <div className="image-box">
                <img className="profile-image" src={user.avatar || "/images/default_user.jpg"}/>
            </div>
            <p className="username">{user.username}</p>

            <div className="stars-box">
                { renderStars() }
                {/* <Link to="/star-system"><i className="help fas fa-question-circle"></i></Link> */}
            </div>
            <SmallTable
            title="Account Information"
            data={ passUserData() }
            />
            <SmallTable
            title="Characters"
            data={characters}
            icons={[
                'fas fa-edit'
            ]}
            />
            <Link className="link" to="/characters/new"><i className="fas fa-plus-circle"></i>Add New Character</Link>
            <div className="buttons__box">
                <Link className="button" to="/new-hunting-record">Create New Record</Link>
                <Link className="button" to="/my-records">My Records</Link>
            </div>
        </div>
    )
    
    return (
        <ContentBox
          width="370"
          title="Profile"
          content={content}
        />
    )
}

export default Profile
