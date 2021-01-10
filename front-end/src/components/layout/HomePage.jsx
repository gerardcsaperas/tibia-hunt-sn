import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

import ContentBox from '../custom/ContentBox/ContentBox';
import "./HomePage.css";



function HomePage() {

  const content = (
    <Fragment>
      <div className="text">
        <p className="lore">Dear tibians,</p>
        <p className="lore">Welcome to Tibia Hunting Records, a platform that has been created with a clear idea: Solve the where to go problem.</p>
        <p className="lore">We want to invite you to join this wonderful community and together build the biggest data base for hunting spots ever!</p>    
        <p className="lore">Join us in this exciting quest and share your best achievents in this wonderful game called tibia!</p>
      </div>
      <div className="buttons__box">
        <Link className="button" to="/login">Create an account</Link>
        <Link className="button" to="/hunting-records">Hunting Records</Link>
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

