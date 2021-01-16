import React, { Fragment } from 'react';
import ContentBox from '../custom/ContentBox/ContentBox';
import "./NewHuntingRecord.css";

const NewHuntRecStep2 = ({ setForm, formData, navigation }) => {
  const { firstName, lastName, nickName } = formData;

  const { previous, next } = navigation;

  const content = (
         <Fragment>
        
           <div id="formContainer">
             <div className="set">
               <h1 className="setTitle">Supplies*</h1>
               <img className="goldenArmor" src={"../images/Backpack.gif"}/>
    
               <div className="setImgContainer">
                 <img src={"../images/set.jpg"}/>
               </div>
              
             </div>
    
             <div className="location">
               <h1 className="locationTitle">Experience*</h1>
               <img className="treasureMap" src={"../images/XP_Boost.png"}/>
    
               <div className="locationInfo">
                 <p>City:</p>
                 <select></select>
                 <p>Spot Name:</p>
                 <select></select>
               </div>
              
             </div>
    
             <div className="teamComp">
               <h1 className="teamCompTitle">Loot*</h1>
               <img className="partyHat" src={"../images/Treasure_Chest.gif"}/>
    
               <div className="teamCompData">
                 <p>Your Character:</p>
                 <select></select>
    
                 <div className="others">
                   <div className="other">
                     <p>Other Members:</p>
                     <select className="otherMemberSelector"></select>
                   </div>
    
                   <div className="level">
                     <p>Level:</p>
                     <select className="otherLevelSelector"></select>
                    
                   </div>
                   <i className="fas fa-plus-circle"></i>
                 </div>
               
               </div>
             </div>
           </div>
    
             <div className="mandatory">
               <strong>*Mandatory information</strong>
             </div>
    
           <div className="buttons__box">
             <button className="button" onClick={previous}>Back</button>
             <button className="button" onClick={next}>Next</button>
           </div>
    
           <div className="nextPage">
             <i class="far fa-circle"></i>
             <i class="fas fa-circle"></i>
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

export default NewHuntRecStep2;