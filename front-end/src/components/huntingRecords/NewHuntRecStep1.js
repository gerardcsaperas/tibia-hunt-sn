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
                 <select className="selectHelmet"/>
                 <select className="SelectArmor"/>
                 <select className="selectLegs"/>
                 <select className="selectShield"/>
                 <select className="selectWeapon"/>
                 <select className="selectRing"/>
                 <select className="selectNecklace"/>
                 <select className="selectBoots"/>
                 <select className="selectTorch"/>
                 <select className="selectBackpack"/>
               </div>
              
             </div>
    
             <div className="GlobalLocation">
               <h1 className="locationTitle">Location*</h1>
               <img className="treasureMap" src={"../images/Treasure_Map.gif"}/>
    
               <div className="locationInfo">
                <div className="cityContainer">
                  <label>City:</label>
                  <select className="selectCity"/>
                </div>
                <div className="spotContainer">
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
                  <select className="selectCharacter"/>
      
                  <div className="others">
                    <div className="other">
                      <label>Other Members:</label>
                      <select className="otherMemberSelector"/>
                    </div>
      
                    <div className="level">
                      <label>Level:</label>
                      <input className="levelSelector" type="number"/> 
                    </div>
                    <i className="fas fa-plus-circle"></i>
                  </div>
                </div>

                <div className="rightData">
                  <label><strong>Team</strong></label>
                    <ol className="teamMatesList">
                      <li>1500 ED</li>
                    </ol>
                </div>      
               </div>
             </div>
           </div>
    
             <div className="mandatory">
               <strong>*Mandatory fields</strong>
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