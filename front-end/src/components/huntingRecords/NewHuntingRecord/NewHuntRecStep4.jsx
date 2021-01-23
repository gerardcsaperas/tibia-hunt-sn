import React, { Fragment } from 'react';
import ContentBox from '../../custom/ContentBox/ContentBox';
import FormBox from '../../custom/FormBox/FormBox';
import "./NewHuntingRecord.scss";

const NewHuntRecStep4 = ({ navigation }) => {

  const { next, previous } = navigation;

  const content = (
         <Fragment>
        
           <div id="formContainer">

              {/* Events Section */}
              <div className="GlobalEvents">
               <h1 className="eventsTitle">Events</h1>
               <img className="events" src={"../images/Tibia_Coins.gif"}/>
    
               <div className="eventsInfo">
                <div className="eventsContainer">
                  <label>Special Event:</label>
                  <select className="selectCity"/>
                </div>
               </div>
              </div>

              {/* Difficulty Section */}
              <div className="GlobalDifficulty">
               <h1 className="difficultyTitle">Difficulty:</h1>
               <img className="difficulty" src={"../images/Squeezing_Gear_of_Girlpower.gif"}/>
    
               <div className="difficultyInfo">
                <div className="difficultyContainer">
                  <label>Difficulty:</label>
                  <select className="selectCity"/>
                </div>
               </div>
              </div>

              {/* Picture Section */}
              <div className="GlobalPicture">
               <h1 className="pictureTitle">Picture</h1>
               <img className="picture" src={"../images/Norseman_Doll.gif"}/>
    
               <div className="pictureInfo">
                <div className="pictureContainer">
                  <label>Upload:</label>
                  <input className="selectPicture" type="file"/>
                </div>
               </div>
              </div>

              {/* Comment Section */}
              <div className="GlobalComment">
               <h1 className="commentTitle">Comment</h1>
               <img className="comment" src={"../images/Achievement_Grade_Symbol.gif"}/>
    
               <div className="commentInfo">
                <div className="commentContainer">
                  <textarea className="introduceComment" type="number"/>
                </div>
               </div>
              </div>

           </div>
    
           <div className="buttons_NHR">
             <button className="button" onClick={previous}>Back</button>
             <button className="button" onClick={next}>Save</button>
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
           width="1000px"
           title="New Hunting Record"
           content={content}
        ></ContentBox>
        )
         
};

export default NewHuntRecStep4;