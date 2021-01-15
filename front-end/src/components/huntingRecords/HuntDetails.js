import React, { Fragment, useEffect, useState } from 'react';
import ContentBox from '../custom/ContentBox/ContentBox';
import axios from "axios";
import {Link} from 'react-router-dom';
import { API_URL } from "../../config";
import './HuntDetails.css';


// Redux
import { useSelector } from 'react-redux'
import { selectUser } from '../user/userSlice'


function HuntDetails() {

  const user = useSelector(selectUser);

  const [ huntDetails, setHuntDetails ] = useState();

  
    // Get hunting details on component initialization
    useEffect(() => {
      getHuntDetails();
    }, [])

    // Function used to retrieve Hunting Details
    const getHuntDetails = async() => {
        try {
            const config = {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                }
            };
            
            // const dynamicId = huntDetails._id
            // console.log (dynamicId)
            const response = await axios.get(`${API_URL}/huntingRecord/5ffc916a90bbf949300aa367`, config);          

            if (response.status === 200 && response.data) {
              setHuntDetails(response.data);
            }

        } catch(e) {
            console.error(e);
        }
    }
    console.log(huntDetails)

  const renderFragment = () => {
      const {
          charms,
          comments,
          createdAt,
          dislikes,
          expH,
          expRatio,
          huntPicture,
          imbuements,
          likes,
          opComment,
          preys,
          profitH,
          specialEvents,
          spot,
          supplies,
          teamComp,
          _id,
          set,
          difficulty
      } = huntDetails
      const huntUser = huntDetails.user;
  
      console.log(huntDetails)
      console.log(charms)
      console.log(imbuements)
      console.log(preys)
      console.log(specialEvents)

      return (<Fragment>
      {/*--------- Here all the content displayed on the left side -----------*/}

        {/*-- User Information -- */}
        <div id="huntDetails">
          <div className="leftOrganiser">
            <div className="userInformation">
              <img src="/images/default_user.jpg" alt="profilePic"></img>
              <p>{huntUser}</p>
              <p>{user.rank}</p>
            </div>

            {/*-- Set -- */}
            <div className="setContainer">
              <div className="headLine">
                <p>Set</p>
              </div>

              <div className="set">
                <img src="/images/set.jpg" alt="set">{/*<p>{`${set}`}</p>*/}</img>
              </div>
            </div>

            {/*-- Character Information --*/}
            <div className="charInfoContainer">
              <div className="headLine">
                <p>Character Information</p>
              </div>
              <div className="infoLight">
                <p>Character:</p>
                <p>{teamComp[0].name}</p>
              </div>
              <div className="infoDark">
                <p>Vocation:</p>
                {/* <p>{`${character.vocation}`}</p> */}
              </div>
              <div className="infoLight">
                <p>Level:</p>
                {/* <p>{`${character.level}`}</p> */}

              </div>
              <div className="infoDark">
                <p>Skills:</p>
                <p>{/* <p>{`${character.skills}`}</p> */}</p>
              </div>
              <div className="infoLight">
                <p>Magic level:</p>
                <p>{/* <p>{`${character.magicLevel}`}</p> */}</p>
              </div>
            </div>


            {/*-- Basic Information --*/}
            <div className="basicInformation">
              <div className="headLine">
                <p>Basic Information</p>
              </div>
              <div className="infoLight">
                <p>Exp/h:</p>
                <p>{`${expH}` + "/h"}</p>
              </div>
              <div className="infoDark">
                <p>Exp ratio: </p>
                <p>{`${expRatio}`*100 + "%"}</p>
              </div>
              <div className="infoLight">
                <p>Profit/h:</p>
                <p>{`${profitH}` + "/h"}</p>
              </div>
              <div className="infoDark">
                <p>Difficulty:</p>
                <p>{difficulty}</p>
              </div>
            </div>

            {/*-- Team --*/}
            <div className="team">
              <div className="headLine">
                <p>Team</p>
              </div>
              <div className="infoLight">
                <p>{teamComp[0].name}</p>
                <p>{teamComp[0].level}</p>
              </div>
              <div className="infoDark">
                <p>ED</p>
                <p>250</p>
              </div>
              <div className="infoLight">
                <p>MS</p>
                <p>250</p>
              </div>
            </div>

            {/*-- Supplies --*/}
            <div className="supplies">
              <div className="headLine">
                <p>Supplies</p>
              </div>
              <div className="suppliesContent">
                <img src="" alt="supplies">{/*<p>{supplies.amount}</p>*/}</img>
              </div>
            </div>

            {/*-- Imbuements --*/}
            <div className="supplies">
              <div className="headLine">
                <p>Imbuements</p>
              </div>
              <ol className="suppliesContent">
                <li> {
                     imbuements.length == 0 ? <p>none</p> : <p>{imbuements}</p>
                     }
                </li>
              </ol>
            </div>
            

            {/*-- Charms --*/}        
            <div className="supplies">
              <div className="headLine">
                <p>Charms</p>
              </div>
              <ol className="suppliesContent">
                <li> {
                     charms.length == 0 ? <p>none</p> : <p>{charms}</p>
                     }
                </li>
              </ol>
            </div>

            {/*-- Preys --*/}
            <div className="supplies">
              <div className="headLine">
                <p>Preys</p>
              </div>
              <ol className="suppliesContent">
                <li> {
                     preys.damageBoost && preys.loot && preys.damageReduction && preys.experience == false ? <p>none</p> : <p>{preys.loot}</p>
                     }
                </li>
              </ol>
            </div>

            {/*-- Sepcial Events --*/}
            <div className="supplies">
              <div className="headLine">
                <p>Special Event</p>
              </div>
              <ol className="suppliesContent">
                <li> {
                     specialEvents.BoostedCreature && specialEvents.DoubleLoot && specialEvents.RapidRespawn && specialEvents.doubleExp == false ? <p>none</p> : <p>{specialEvents.BoostedCreature}</p>
                     }
                </li>
              </ol>
            </div>

          </div>


     {/*--------- Here all the content displayed on the right side ---------*/}
          <div className="rightOrganiser">
            <div className="lootPicDetail">
              <img src="/images/default_user.jpg" alt="lootPic"></img>
            </div>


            {/*-------- OP comment section ---------*/}
            <div className="commentBox">
              <div className="headLine">
                <p>{createdAt}</p>
              </div>

              <div className="commentContent">
                <div className="leftData">
                  <div>
                    <p>{huntUser}</p>
                    <p>{user.rank}</p>
                    <p>{user.posts}</p>
                  </div>
                </div>

                <div className="rightData">
                  <p>{opComment}</p>
                  <div className="rating">
                    <i class="far fa-thumbs-up"></i>
                    <p>0</p>
                    <i class="far fa-thumbs-down"></i>
                    <p>0</p>
                  </div>
                </div>
              </div>
            </div>

            {/*--------- Add a comment secion ----------*/}
            <div className="commentBox">
              <div className="headLine">
              </div>

              <div className="commentContent">
                <div className="leftData">
                  <div>
                    <p>{huntUser}</p>
                    <p>{user.rank}</p>
                    <p>{user.posts}</p>
                  </div>
                </div>

                <div className="rightData">
                  <textarea placeholder="Add a comment"></textarea>
                  <button>Post</button>
                </div>
              </div>
            </div>

            {/*------- Rest of the users comments ---------*/}
            <div className="commentBox">
              <div className="headLine">
                <p>{createdAt}</p>
              </div>

              <div className="commentContent">
                <div className="leftData">
                  <div>
                    <p>{huntUser}</p>
                    <p>{user.rank}</p>
                    <p>{user.posts}</p>
                  </div>
                </div>

                <div className="rightData">
                  <p>{opComment}</p>
                  <div className="rating">
                    <i class="far fa-thumbs-up"></i>
                    <p>0</p>
                    <i class="far fa-thumbs-down"></i>
                    <p>0</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
    </Fragment>)

  }

  const content = huntDetails ? renderFragment() : null
  


    return (
    <ContentBox
      height="1200px"
      width="1200px"
      title="My Records"
      content={content}
    ></ContentBox>
    )
}

export default HuntDetails