import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

import ContentBox from '../custom/ContentBox/ContentBox';
import "./HomePage.css";



function HomePage() {

  const content = (
    <Fragment>
      <div className="text">
        <p className="lore">Dear tibians,</p>
        <p className="lore">Welcome to the <strong>beta</strong> version of <strong>Tibia Hunting Records</strong>, a platform that has been created with a clear idea: solve the "where to hunt" problem.</p>
        <p className="lore">We want to invite you to join this wonderful community and together build the biggest database for hunting spots ever!</p>    
        <p className="lore">Join us in this exciting quest and share your best achievents in this wonderful game that is Tibia!</p>
      </div>
      <div className="buttons__box">
        <Link className="button" to="/login">Log In</Link>
        <Link className="button" to="/all-records">Hunting Records</Link>
      </div>
    </Fragment>
  )

    return (
    <ContentBox
      width="370"
      title="Tibia Hunting Records"
      content={content}
    ></ContentBox>
    )
}

export default HomePage

