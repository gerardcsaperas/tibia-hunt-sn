import React, { Fragment } from 'react';
import ContentBox from './custom/ContentBox/ContentBox';
import "./styles/HomePage.css";



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
        <button className="button">Create an account</button>
        <button className="button">Hunting Records</button>
      </div>
    </Fragment>
  )

    return (
    <ContentBox
      height="480px"
      width="370px"
      title="Tibia Hunting Records"
      content={content}
    ></ContentBox>
    )
}

export default HomePage

