import React, { Fragment } from 'react';
import ContentBox from '../custom/ContentBox/ContentBox';
import "./NewHuntingRecord.css";

const NewHuntRecStep2 = ({ setForm, formData, navigation }) => {
  const { firstName, lastName, nickName } = formData;

  const { next, previous } = navigation;

  const content = (
         <Fragment>
        
           <div id="formContainer">

              {/* Supplies Section */}
             <div className="GlobalSupplies">
               <h1 className="suppliesTitle">Supplies*</h1>
               <img className="backpack" src={"../images/Backpack.gif"}/>

               {/* Supplies */}
               <div className="others">
                    <div className="other">
                      <label>Supplies:</label>
                      <select className="otherMemberSelector"/>
                    </div>
      
                    <div className="level">
                      <label>Amount:</label>
                      <input className="levelSelector" type="number"/> 
                    </div>
                    <i className="fas fa-plus-circle"></i>
                  </div>

                  {/* Ammunition */}
                  <div className="others">
                    <div className="other">
                      <label>Ammunition:</label>
                      <select className="otherMemberSelector"/>
                    </div>
      
                    <div className="level">
                      <label>Amount:</label>
                      <input className="levelSelector" type="number"/> 
                    </div>
                    <i className="fas fa-plus-circle"></i>
                  </div>

             </div>

             {/* Experience Section */}
             <div className="GlobalExperience">
               <h1 className="experienceTitle">Experience*</h1>
               <img className="xpBoost" src={"../images/XP_Boost.png"}/>
    
               <div className="locationInfo">
                <div className="cityContainer">
                  <label>Exp Ratio:</label>
                  <select className="selectCity"/>
                </div>
                <div className="spotContainer">
                  <label>Exp/h:</label>
                  <input className="selectSpot" type="number"/>
                </div>
               </div>
             </div>

              {/* Loot Section */}
             <div className="GlobalLoot">
               <h1 className="lootTitle">Loot*</h1>
               <img className="loot" src={"../images/Treasure_Chest.gif"}/>
    
               <div className="locationInfo">
                <div className="spotContainer">
                  <label>Profit/h:</label>
                  <input className="selectLoot" type="number"/>
                </div>
               </div>
             </div>
           </div>

             {/* Footer Section */}
             <div className="mandatory">
               <strong>*Mandatory fields</strong>
             </div>
    
           <div className="buttons_NHR">
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