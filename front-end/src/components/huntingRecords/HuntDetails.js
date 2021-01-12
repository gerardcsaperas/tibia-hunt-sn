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

            const response = await axios.get(`${API_URL}/huntingRecord/:id`, config);
            console.log(response)
            
            if (response.status === 200 && response.data.length > 0) {
                const huntDetails = response.data.map(details => {
                    return [details.spot, 
                            details.supplies, 
                            details.imbuements,
                            details.charms,
                            details.preys,
                            details.huntPicture,
                            details.expH,
                            details.profitH,
                            details.expRatio,
                            details.specialEvents,
                            details.teamComp,
                            details.opComment,
                            details.comments,
                            details.likes,
                            details.dislikes,
                            details.timestamps,
                            details.user
                            ]
                })
                setHuntDetails([...huntDetails]);
            }

        } catch(e) {
            console.error(e);
        }
    }



  
  

  const content = (
    <Fragment>
        <div>
          <div className="leftOrganiser">
            <div>
              <img src="" alt="profilePic"></img>
              <p>User Name</p>
              <p>Ranking</p>
            </div>

            <div className="setContainer">
              <div>
                <p>Set</p>
              </div>

              <div>
                <img src="" alt="set"></img>
              </div>
            </div>

            <div className="charInfoContainer">
              <div>
                <p>Character Information</p>
              </div>
              <div>
                <p>Character: Tociclao</p>
              </div>
              <div>
                <p>Vocation: EK</p>
              </div>
              <div>
                <p>Level: 300</p>
              </div>
              <div>
                <p>Skills: 109/104</p>
              </div>
              <div>
                <p>Magic level: 10</p>
              </div>
            </div>

            <div className="basicInformation">
              <div>
                <p>Basic Information</p>
              </div>
              <div>
                <p>Exp/h: 3.200.000/h</p>
              </div>
              <div>
                <p>Exp ratio: 150%</p>
              </div>
              <div>
                <p>Profit/h: 700.000/h</p>
              </div>
              <div>
                <p>Difficulty: Medium</p>
              </div>
            </div>

            <div className="team">
              <div>
                <p>Team</p>
              </div>
              <div>
                <p>EK(Tociclao) 300</p>
              </div>
              <div>
                <p>ED</p>
              </div>
              <div>
                <p>MS</p>
              </div>
            </div>

            <div className="supplies">
              <div>
                <p>Supplies</p>
              </div>
              <div>
                <img src="" alt="supplies"></img>
              </div>
            </div>

            <div className="imbuements">
              <div>
                <p>Imbuements</p>
              </div>
              <ol>
                <li>2x Powerful Void</li>
                <li>2x Powerful Leech</li>
                <li>1x Powerful Strike</li>
              </ol>
            </div>

            <div className="prey">
              <div>
                <p>Preys</p>
              </div>
              <ol>
                <li>Dodge</li>
                <li>Inflame</li>
                <li>Parry</li>
              </ol>
            </div>

            <div className="event">
              <div>
                <p>Special Event</p>
              </div>
              <div>
                <p>Rapid Respawn</p>
              </div>
            </div>

          </div>


          <div className="rightOrganiser">
            <div>
              <img src="" alt="lootPic"></img>
            </div>

            <div className="comment">
              <div className="date">
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