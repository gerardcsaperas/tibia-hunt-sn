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

    useEffect(() => {
      console.log(huntDetails)

      
    }, [huntDetails] )

    // Function used to retrieve Hunting Details
    const getHuntDetails = async() => {
        try {
            const config = {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                }
            };

            let id = this.props.match.params.challengeID;
            const response = await axios.get(`${API_URL}/huntingRecord/${id}`, config);
            console.log(response)
            
            if (response.status === 200 && response.data > 0) {
                setHuntDetails(response.data);
            }

        } catch(e) {
            console.error(e);
        }
    }



  
  

  const content = (
    <Fragment>
        <div id="huntDetails">
          <div className="leftOrganiser">
            <div className="userInformation">
              <img src="/images/default_user.jpg" alt="profilePic"></img>
              <p>User Name</p>
              <p>Ranking</p>
            </div>

            <div className="setContainer">
              <div className="headLine">
                <p>Set</p>
              </div>

              <div className="set">
                <img src="/images/set.jpg" alt="set"></img>
              </div>
            </div>

            <div className="charInfoContainer">
              <div className="headLine">
                <p>Character Information</p>
              </div>
              <div className="infoLight">
                <p>Character:</p>
                <p>Tociclao</p>
              </div>
              <div className="infoDark">
                <p>Vocation:</p>
                <p>EK</p>
              </div>
              <div className="infoLight">
                <p>Level:</p>
                <p>300</p>

              </div>
              <div className="infoDark">
                <p>Skills:</p>
                <p>109/104</p>
              </div>
              <div className="infoLight">
                <p>Magic level:</p>
                <p>10</p>
              </div>
            </div>

            <div className="basicInformation">
              <div className="headLine">
                <p>Basic Information</p>
              </div>
              <div className="infoLight">
                <p>Exp/h:</p>
                <p>3.200.000/h</p>
              </div>
              <div className="infoDark">
                <p>Exp ratio: </p>
                <p>150%</p>
              </div>
              <div className="infoLight">
                <p>Profit/h:</p>
                <p>700.000/h</p>
              </div>
              <div className="infoDark">
                <p>Difficulty:</p>
                <p>Medium</p>
              </div>
            </div>

            <div className="team">
              <div className="headLine">
                <p>Team</p>
              </div>
              <div className="infoLight">
                <p>EK(Tociclao)</p>
                <p>300</p>
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
                <img src="" alt="supplies"></img>
              </div>
            </div>

            <div className="supplies">
              <div className="headLine">
                <p>Imbuements</p>
              </div>
              <ol className="suppliesContent">
                <li>- 2x Powerful Void</li>
                <li>- 2x Powerful Leech</li>
                <li>- 1x Powerful Strike</li>
              </ol>
            </div>

            <div className="supplies">
              <div className="headLine">
                <p>Preys</p>
              </div>
              <ol className="suppliesContent">
                <li>- Dodge</li>
                <li>- Inflame</li>
                <li>- Parry</li>
              </ol>
            </div>

            <div className="supplies">
              <div className="headLine">
                <p>Special Event</p>
              </div>
              <div className="suppliesContent">
                <p>Rapid Respawn</p>
              </div>
            </div>

          </div>


          <div className="rightOrganiser">
            <div className="lootPicDetail">
              <img src="/images/default_user.jpg" alt="lootPic"></img>
            </div>

            <div className="commentBox">
              <div className="headLine">
                <p>2020 Dec 30, 12:30pm</p>
              </div>

              <div className="commentContent">
                <div className="leftData">
                  <div>
                    <p>User Name</p>
                    <p>Ranking</p>
                    <p>Posts: 234</p>
                  </div>
                </div>

                <div className="rightData">
                  <p>Wow, man. I really loved this place. Today I was making  820 k/h profit actually. I play on a very 
                      populated Optional PVP, so maybe that’s why.

                      Incredible respawn! Thank you for sharing!
                      Jow </p>
                </div>
              </div>
            </div>

          </div>

        </div>
    </Fragment>
  )
  


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