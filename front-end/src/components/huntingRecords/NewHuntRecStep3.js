import React, { Fragment } from 'react';
import ContentBox from '../custom/ContentBox/ContentBox';
import "./NewHuntingRecord.css";

const NewHuntRecStep3 = ({ setForm, formData, navigation }) => {
  const { firstName, lastName, nickName } = formData;

  const { next, previous } = navigation;

  const content = (
         <Fragment>
        
           <div id="formContainer">

              {/* Preys Section */}
             <div className="GlobalPreys">
               <h1 className="preysTitle">Preys</h1>
               <img className="preys" src={"../images/Demon_Trophy.gif"}/>

               <div className="preysInfo">
                <div className="preyContainer">
                  <label>Prey1:</label>
                  <select className="selectCity"/>
                </div>
                <div className="preyContainer">
                  <label>Prey2:</label>
                  <select className="selectCity"/>
                </div>
                <div className="preyContainer">
                  <label>Prey3:</label>
                  <select className="selectCity"/>
                </div>
               </div>

             </div>

             {/* Imbuements Section */}
             <div className="GlobalImbuements">
               <h1 className="imbuementsTitle">Imbuements</h1>
               <img className="imbuements" src={"../images/Fire_Sword.gif"}/>
    
              <div className="others">
                    <div className="other">
                      <label>Imbuements:</label>
                      <select className="otherMemberSelector"/>
                    </div>
      
                    <div className="level">
                      <label>Amount:</label>
                      <input className="levelSelector" type="number"/> 
                    </div>
                    <i className="fas fa-plus-circle"></i>
                  </div>
             </div>

              {/* Charms Section */}
             <div className="GlobalCharms">
               <h1 className="charmsTitle">Charms</h1>
               <img className="charms" src={"../images/Charm_Expansion.png"}/>
    
               <div className="locationInfo">
                <div className="spotContainer">
                  <label>Charms:</label>
                  <select className="otherMemberSelector"/>
                </div>
                <i className="fas fa-plus-circle"></i>
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
             <i class="far fa-circle"></i>
             <i class="fas fa-circle"></i>
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

export default NewHuntRecStep3;