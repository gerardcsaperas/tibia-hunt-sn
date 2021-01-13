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

  let charms;
  let huntUser;
  let expH

  
  const user = useSelector(selectUser);

  const [ huntDetails, setHuntDetails ] = useState();

  if (huntDetails) {
    const {charms, comments, createdAt, dislikes, expH, expRatio, huntPicture, imbuements, likes, opComment, preys, profitH, specialEvents, spot, supplies, teamComp, _id, set } = huntDetails
    const huntUser = huntDetails.user;
  } 
  
    // Get hunting details on component initialization
    useEffect(() => {
      getHuntDetails();
    }, [])

    useEffect(() => {
      if (huntDetails) {
        huntUser = huntDetails.user
        expH = huntDetails.expH
      }
    }, [huntDetails] )

    // Function used to retrieve Hunting Details
    const getHuntDetails = async() => {
        try {
            const config = {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                }
            };

            const response = await axios.get(`${API_URL}/huntingRecord/5ffc916a90bbf949300aa367`, config);
            const id = response.data._id
            console.log(response.data)
            // ${id}

            

            if (response.status === 200 && response.data > 0) {
                setHuntDetails(response.data);
            }

        } catch(e) {
            console.error(e);
        }
    }


  const content = huntDetails ? (

    <Fragment>
        <div id="huntDetails">
          <div className="leftOrganiser">
            <div className="userInformation">
              <img src="/images/default_user.jpg" alt="profilePic"></img>
              {/* <p>{huntUser}</p> */}
              <p>{/* <p>{`${user.rank}`}</p> */}</p>
            </div>

            <div className="setContainer">
              <div className="headLine">
                <p>Set</p>
              </div>

              <div className="set">
                <img src="/images/set.jpg" alt="set">{/* <p>{`${set}`}</p> */}</img>
              </div>
            </div>

            <div className="charInfoContainer">
              <div className="headLine">
                <p>Character Information</p>
              </div>
              <div className="infoLight">
                <p>Character:</p>
                <p>{/* <p>{`${character.name}`}</p> */}</p>
              </div>
              <div className="infoDark">
                <p>Vocation:</p>
                <p>{/* <p>{`${character.vocation}`}</p> */}</p>
              </div>
              <div className="infoLight">
                <p>Level:</p>
                <p>{/* <p>{`${character.level}`}</p> */}</p>

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

            <div className="basicInformation">
              <div className="headLine">
                <p>Basic Information</p>
              </div>
              <div className="infoLight">
                <p>Exp/h:</p>
                <p>{expH}</p>
              </div>
              <div className="infoDark">
                <p>Exp ratio: </p>
                {/* <p>{`${expRatio}`}</p> */}
              </div>
              <div className="infoLight">
                <p>Profit/h:</p>
                {/* <p>{`${profitH}`}</p> */}
              </div>
              <div className="infoDark">
                <p>Difficulty:</p>
                {/* <p>{`${difficulty}`}</p> */}
              </div>
            </div>

            <div className="team">
              <div className="headLine">
                <p>Team</p>
              </div>
              <div className="infoLight">
                {/* <p>{`${expRatio}`}</p>
                <p>{`${teamComp.level}`}</p> */}
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

            <div className="supplies">
              <div className="headLine">
                <p>Supplies</p>
              </div>
              <div className="suppliesContent">
                <img src="" alt="supplies">{/* <p>{`${supplies}`}</p> */}</img>
              </div>
            </div>

            <div className="supplies">
              <div className="headLine">
                <p>Imbuements</p>
              </div>
              <ol className="suppliesContent">
              {/* <li>{`${imbuements}`}</li> */}
              </ol>
            </div>

            <div className="supplies">
              <div className="headLine">
                <p>Preys</p>
              </div>
              <ol className="suppliesContent">
                <li>{/* <p>{`${imbuements}`}</p> */}</li>
              </ol>
            </div>

            <div className="supplies">
              <div className="headLine">
                <p>Special Event</p>
              </div>
              <ol className="suppliesContent">
                <li>{/* <p>{`${specialEvents}`}</p> */}</li>
              </ol>
            </div>

          </div>


          <div className="rightOrganiser">
            <div className="lootPicDetail">
              <img src="/images/default_user.jpg" alt="lootPic"></img>
            </div>

            <div className="commentBox">
              <div className="headLine">
                <p>{/* <p>{`${createdAt}`}</p> */}</p>
              </div>

              <div className="commentContent">
                <div className="leftData">
                  <div>
                    <p>{/* <p>{`${user}`}</p> */}</p>
                    <p>{/* <p>{`${user.rank}`}</p> */}</p>
                    <p>{/* <p>{`${user.posts}`}</p> */}</p>
                  </div>
                </div>

                <div className="rightData">
                  <p>{/* <p>{`${opComment}`}</p> */}</p>
                </div>
              </div>
            </div>

          </div>

        </div>
    </Fragment>
  ) : null
  


    return (
    <ContentBox
      height="1200px"
      width="1200px"
      title="Record Details"
      content={content}
    ></ContentBox>
    )
}

export default HuntDetails