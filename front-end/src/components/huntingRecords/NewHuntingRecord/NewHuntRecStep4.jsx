import React, { Fragment } from 'react';
import ContentBox from '../../custom/ContentBox/ContentBox';
import FormBox from '../../custom/FormBox/FormBox';
import { API_URL, vocations } from '../../../config';
import axios from 'axios';
import "./NewHuntingRecord.scss";

// State Store
import { useSelector } from 'react-redux'
import { selectUser } from '../../user/userSlice'

const NewHuntRecStep4 = ({
  _id,
  navigation, 
  specialEvent,
  setSpecialEvent,
  difficulty,
  setDifficulty,
  opComment,
  setOpComment,
  picture,
  setPicture,
  saveHuntingRecord,
  saving,
  saved
}) => {
  const { user } = useSelector(selectUser);
  const { next, previous } = navigation;

  const specialEvents = [ '', 'Double Exp', 'Double Loot', 'Rapid Respawn', 'Boosted Creature' ]
  const specialEventForm = <div className="form specialEvent">
    <div className="form-input-row">
      <select name="specialEvent" value={specialEvent} onChange={(e) => setSpecialEvent(e.target.value)}>
        {
          specialEvents.map((event, index) => {
            return <option key={index} value={event}>{event}</option>
          })
        }
      </select>
    </div>
  </div>

  const difficulties = [ '', 'Easy', 'Medium', 'Hard', 'Extreme' ];
  const difficultiesForm = <div className="form difficulties">
    <div className="form-input-row">
      <select name="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        {
          difficulties.map((difficulty, index) => {
            return <option key={index} value={difficulty}>{difficulty}</option>
          })
        }
      </select>
    </div>
  </div>

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        setPicture(reader.result);
    }
  }

  const huntPictureForm = <div className="form">
    <div className="form-input-row">
      <input className="file" type="file" name="picture" onChange={(e) => handleFileInputChange(e)} autoComplete="off"/>
      </div>
        { picture && (
          <img
            src={picture}
            alt="chosen"
            style={{height: '100px'}}
          />
        )}
  </div>

  const commentForm = <div className="form">
    <div className="form-input-row">
        <textarea name="opComment" value={opComment} onChange={(e) => setOpComment(e.target.value)}></textarea>
    </div>
  </div>

  const content = (
         <Fragment>
        
           <div id="formContainer">

              <FormBox
                title="Special Event"
                imgSrc="../images/Tibia_Coins.gif"
                form={specialEventForm}
              />

              <FormBox
                title="Difficulty"
                imgSrc="../images/Squeezing_Gear_of_Girlpower.gif"
                form={difficultiesForm}
              />

              <FormBox
                title="Hunt Picture"
                imgSrc="../images/Norseman_Doll.gif"
                form={huntPictureForm}
              />

              <FormBox
                title="Comment"
                imgSrc="../images/Achievement_Grade_Symbol.gif"
                form={commentForm}
              />
           </div>
    
           <div className="buttons_NHR">
             <button className={ !saving ? 'button' : 'disabled-button' } onClick={previous}>Back</button>
             { !saved && <button className={ !saving ? 'button' : 'disabled-button' } onClick={saveHuntingRecord}>{ !saving ? 'Save' : 'Saving...' }</button> }
             { saved && <button className='button disabled'>Saved</button> }
           </div>
    
           <div className="nextPage">
             <i class="far fa-circle"></i>
             <i class="far fa-circle"></i>
             <i class="far fa-circle"></i>
             <i class="fas fa-circle"></i>
           </div>
    
         </Fragment>
       )
    
        return (
        <ContentBox
            width="1200px"
            title={ _id ? "Edit Hunting Record" : "New Hunting Record" }
            content={content}
        />
        )
         
};

export default NewHuntRecStep4;