import React, { Fragment } from 'react';
import ContentBox from '../custom/ContentBox/ContentBox';
import "./Contact.css";



function Contact() {

  const content = (
    <Fragment>
      <div id="contact">
        <p className="lore">Dear Tibians,</p>
        <p className="lore">May you have any questions or want to contact us for any other requirements?</p>
        <p className="reach">Reach us at:</p>
        <a className="email" href="mailto:tibiahuntingrecords@gmail.com">tibiahuntingrecords@gmail.com</a>
        <p className="lore">Your administration team,</p> 
        <p className="lore">Gerard & Joel</p>      
        
      </div>
    </Fragment>
  )

    return (
    <ContentBox
      width="370"
      title="Contact"
      content={content}
    ></ContentBox>
    )
}

export default Contact