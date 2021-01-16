import React, { Fragment } from 'react';
import ContentBox from '../custom/ContentBox/ContentBox';
import "./NewHuntingRecord.css";

const NewHuntRecStep1 = ({ setForm, formData, navigation }) => {
  const { firstName, lastName, nickName } = formData;

  const { next } = navigation;

  const content = (
         <Fragment>
        
           <div id="formContainer">
             <div className="GlobalSet">
               <h1 className="setTitle">Set*</h1>
               <img className="goldenArmor" src={"../images/Golden_Armor.gif"}/>
    
               <div className="setImgContainer">
                 <img src={"../images/set.jpg"}/>
               </div>
              
             </div>
    
             <div className="GlobalLocation">
               <h1 className="locationTitle">Location*</h1>
               <img className="treasureMap" src={"../images/Treasure_Map.gif"}/>
    
               <div className="locationInfo">
                <div>
                  <label>City:</label>
                  <select className="selectCity"/>
                </div>
                <div>
                  <label>Spot Name:</label>
                  <input className="selectSpot" type="text"/>
                </div>
               </div>
              
             </div>
    
             <div className="GlobalTeamComp">
               <h1 className="teamCompTitle">Team Comp*</h1>
               <img className="partyHat" src={"../images/Party_Hat.gif"}/>
    
               <div className="teamCompData">
                <div className="leftData">
                  <label>Your Character:</label>
                  <select></select>
      
                  <div className="others">
                    <div className="other">
                      <label>Other Members:</label>
                      <select className="otherMemberSelector"></select>
                    </div>
      
                    <div className="level">
                      <label>Level:</label>
                      <input type="number"/> 
                    </div>
                    <i className="fas fa-plus-circle"></i>
                  </div>
                </div>

                <div className="rightData">
                  <label>Team</label>
                    <ol>
                      <li></li>
                    </ol>
                </div>      
               </div>
             </div>
           </div>
    
             <div className="mandatory">
               <strong>*Mandatory information</strong>
             </div>
    
           <div className="buttons__box">
             <button className="button" onClick={next}>Next</button>
           </div>
    
           <div className="nextPage">
             <i class="fas fa-circle"></i>
             <i class="far fa-circle"></i>
             <i class="far fa-circle"></i>
             <i class="far fa-circle"></i>
           </div>
    
         </Fragment>
       )
    
        return (
        <ContentBox
           width="1000px"
           title="New Hunting Record"
           content={content}
        ></ContentBox>
        )
         
};

export default NewHuntRecStep1;