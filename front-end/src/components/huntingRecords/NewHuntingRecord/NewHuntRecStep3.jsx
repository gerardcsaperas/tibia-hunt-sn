import React, { Fragment } from 'react';
import ContentBox from '../../custom/ContentBox/ContentBox';
import FormBox from '../../custom/FormBox/FormBox';
import Imbuements from '../../../assets/objects/Imbuements.json'
import Charms from '../../../assets/objects/Charms.json'
import "./NewHuntingRecord.scss";

const NewHuntRecStep3 = ({ navigation, preys, setPreys, imbuements, setImbuements, charms, setCharms }) => {

  const { next, previous } = navigation;
  const preyOptions = [ '', 'Experience', 'Loot', 'Damage Reduction', 'Damage Reduction' ];
  const handlePreysChange = (e) => {
    const newArray = preys;
    newArray[e.target.name] = e.target.value;
    setPreys(newArray);
  }
  const preysForm = <div className="form preys">
    <div className="form-input-row">
      <select name="0" onChange={handlePreysChange}>
        {
          preyOptions.map((bonus, index) => {
            return <option key={index} value={bonus}>{bonus}</option>
          })  
        }
      </select>
      <select name="1" onChange={handlePreysChange}>
        {
          preyOptions.map((bonus, index) => {
            return <option key={index} value={bonus}>{bonus}</option>
          })  
        }
      </select>
      <select name="2" onChange={handlePreysChange}>
        {
          preyOptions.map((bonus, index) => {
            return <option key={index} value={bonus}>{bonus}</option>
          })  
        }
      </select>
    </div>
  </div>

// HERE first loop through Imbuements, sepparate by type, then blabla
  const imbuementsForm = <div className="form imbuements">
      <div className="form-input-row">
          <select name="0" onChange={handlePreysChange}>
              {
                Imbuements.map((imbuement, index) => {
                  return <option key={index} value={bonus}>{bonus}</option>
                })  
              }
          </select>
      </div>
  </div>

  const charmsForm = <div className="form charms"></div>

  const content = (
         <Fragment>
        
           <div id="formContainer">
           <FormBox title="Preys" imgSrc="../images/Demon_Trophy.gif" form={preysForm} margin="10px" />

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