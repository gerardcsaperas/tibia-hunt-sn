import React, { Fragment } from 'react';
import ContentBox from '../custom/ContentBox/ContentBox';
import './Profile.scss';

// Child Components
import SmallTable from '../custom/SmallTable/SmallTable'
import StarSytemModal from '../misc/StarSystemModal';

function Profile() {
    const mockUserData = [
        ['User Name:', 'Jararu'],
        ['Country:', 'Poland']
    ]
    const mockCharData = [
        ['Jararu', 'Master Sorcerer', '111'],
        ['Topotamadre', 'Royal Paladin', '222'],
        ['Elpuma', 'Elite Knight', '333']
    ]

    const content = (
        <Fragment>
            <i className="fas fa-cog"></i>
            <div className="image-box">
                <img className="profile-image" src=""/>
            </div>
            <p className="char-name">Charname</p>
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
