import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import ContentBox from '../custom/ContentBox/ContentBox';
import LikeButtons from '../custom/LikeButtons/LikeButtons';
import SmallTable from '../custom/SmallTable/SmallTable';
import CommentBoxToDisplay from '../custom/CommentBox/CommentBoxToDisplay';
import CommentBoxToComment from '../custom/CommentBox/CommentBoxToComment';
import ModalForm from '../custom/ModalForm/ModalForm';
import NumberFormat from 'react-number-format';
import StarRatings from 'react-star-ratings';
import axios from "axios";
import { API_URL } from "../../config";
import './HuntDetails.scss';


// Redux
import { useSelector } from 'react-redux'
import { selectUser } from '../user/userSlice'


function HuntDetails() {

  const user = useSelector(selectUser);
  const { uid } = user
  const authenticated = user.authenticated;
  let { recordID }  = useParams();
  const [ huntDetails, setHuntDetails ] = useState();
  const [ equipmentTypes, setEquipmentTypes ] = useState();
  const [ showDeleteModal, setShowDeleteModal ] = useState(false);
  
    // Get hunting details on component initialization
    useEffect(() => {
        getHuntDetails();
    }, [])

    useEffect(() => {
        if (huntDetails && huntDetails.set) {
            let equipmentTypes = [];
            for (let property in huntDetails.set) {
              equipmentTypes.push(property)
            }

            setEquipmentTypes(equipmentTypes)
        }
    }, [huntDetails])

    // Function used to retrieve Hunting Details
    const getHuntDetails = async() => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            };
            
            const response = await axios.get(`${API_URL}/huntingRecord/${recordID}`, config);          
            console.log(response);
            if (response.status === 200 && response.data) {
                setHuntDetails(response.data);
            }

        } catch(e) {
            console.error(e);
        }
    }

    const patchLikes = async (likeOrDislike) => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            };

            const body = {
                likes: huntDetails.likes,
                dislikes: huntDetails.dislikes
            }
            
            const response = await axios.put(`${API_URL}/huntingRecord/${recordID}`, body, config);          
            if (response.status === 201 && response.data) {
                const notificationBody = {
                    receiver: huntDetails.user._id,
                    notificationType: likeOrDislike,
                    notificationReference: huntDetails._id,
                    notificationOrigin: 'huntingRecord'                    
                }
                const postNotification = await axios.post(`${API_URL}/notification`, notificationBody, config);
                return
          }
        } catch(e) {
            console.error(e);
        }
    }

    const handleHuntingRecordLike = () => {
        const uidDislikesIndex = huntDetails.dislikes.indexOf(uid)
        let dislikesArray = huntDetails.dislikes
        uidDislikesIndex !== -1 && (dislikesArray.splice(uidDislikesIndex, 1))

        const uidIndex = huntDetails.likes.indexOf(uid)
        let likesArray = huntDetails.likes
        uidIndex === -1 ? likesArray.push(uid) : likesArray.splice(uidIndex, 1)

        setHuntDetails({
            ...huntDetails,
            likes: likesArray,
            dislikes: dislikesArray
        })

        patchLikes('like')
    }

    const handleHuntingRecordDislike = () => {
        const uidIndex = huntDetails.likes.indexOf(uid)
        let likesArray = huntDetails.likes
        uidIndex !== -1 && (huntDetails.likes.splice(uidIndex, 1))

        const uidDislikesIndex = huntDetails.dislikes.indexOf(uid)
        let dislikesArray = huntDetails.dislikes
        uidDislikesIndex === -1 ? dislikesArray.push(uid) : dislikesArray.splice(uidIndex, 1)

        setHuntDetails({
            ...huntDetails,
            likes: likesArray,
            dislikes: dislikesArray
        })

        patchLikes('dislike')
    }

    const deleteHuntingRecord = async (_id) => {
      try {
          const config = {
              headers: {
                  'Authorization': `Bearer ${user.token}`
              }
          };

          const response = await axios.delete(`${API_URL}/huntingRecord/${_id}`, config);
          if (response.status === 204) {
              window.location.href = '/my-records'
          }
      } catch(e) {
          console.error(e.message);
      }
  }
    
    const getRelevantSkills = () => {
        const { teamComp, set } = huntDetails;
        const character = teamComp[0];
        const { vocation, skills } = character;

        if (vocation === 'Knight' || vocation === 'EK') {
          let higherSkill = Math.max(skills.sword, skills.axe, skills.club)
          return (
              <p>
                  <img className="inline-img" src={`../images/${set.Weapons.type}/${set.Weapons.name}.jpg`}/>
                  {higherSkill}
                  <img className="inline-img" src={`../images/${set.Shields.type}/${set.Shields.name}.jpg`}/>
                  {skills.shielding}
              </p>
          )
        }

        if (vocation === 'Paladin' || vocation === 'RP') {    

          return (
            <p>
                <img className="inline-img" src={`../images/Distance_Weapons/Spear.jpg`}/>
                {skills.distanceFighting}
                <img className="inline-img" src={`../images/Shields/Dwarven_Shield.jpg`}/>
                {skills.shielding}
            </p>
        )
        }

        if (vocation === 'Druid' || vocation === 'ED') {
          return `N/A`
        }

        if (vocation === 'Sorcerer' || vocation === 'MS') {
          return `N/A`
        }
    }

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
            ammunition,
            teamComp,
            _id,
            set,
            difficulty
        } = huntDetails
        const johnDoe = {
          _id: '',
          username: '(user deleted)'
        }
        const huntUser = huntDetails.user || johnDoe;
        const team = teamComp.map(member => [ member.vocation, member.level ]);
        const deleteHuntingRecordModalContent = 
        <Fragment>
            <p>Are you sure you want to delete this hunting record?</p>
            <div className="buttons__box">
                <button className="button" onClick={() => setShowDeleteModal(false)}>Back</button>
                <button className="button-warning" onClick={() => deleteHuntingRecord(_id)}>Delete</button>
            </div>
        </Fragment>

      return (
        <div id="huntDetails">
          <p className="createdAt">{new Date(createdAt).toString().slice(0,34)}</p>
          <LikeButtons
              id="huntDetails__likes"
              likes={likes}
              dislikes={dislikes}
              handleClickLike={handleHuntingRecordLike}
              handleClickDislike={handleHuntingRecordDislike}
              comments={false}
          />
          { huntUser._id === uid && (
            <div className="delete-edit__box">
                <Link to={`/edit-hunting-record/${_id}`}>
                    <i className="fas fa-pen" id="editHunt" />
                </Link>
                <i className="fas fa-trash delete-hunting-record" onClick={() => setShowDeleteModal(true)}/>
            </div>
          )}
          { showDeleteModal &&
                <ModalForm
                    title="Delete Hunting Record"
                    _id={_id}
                    content={deleteHuntingRecordModalContent}
                    modalForm={showDeleteModal}
                    setModalForm={setShowDeleteModal}
                />
          }
          <div className="leftOrganiser">

            <div className="userInformation">
              <img src="/images/default_user.jpg" alt="profilePic"></img>
              <p className="username">{huntUser.username}</p>
              <StarRatings
                  rating={huntUser.stars}
                  starDimension="20px"
                  starSpacing="1px"
                  starRatedColor="gold"
              />
            </div>

            {/*-- Set -- */}
            <div className="setContainer">
              <div className="headLine">
                <p>Set</p>
              </div>
              <div className="setImgContainer">
                {
                  equipmentTypes && (
                      equipmentTypes.map((type, index) => {
                          switch(type) {
                              default:
                                  return <img className={`${type}`} src={`../images/${type}/${set[type]}.jpg`} alt={`${set[type]}`} />
                              case 'Shields':
                                  return <img className={`${type}`} src={`../images/${set[type].type}/${set[type].name}.jpg`} alt={`${set[type].name}`} />
                              case 'Weapons':
                                return <img className={`${type}`} src={`../images/${set[type].type}/${set[type].name}.jpg`} alt={`${set[type].name}`} />
                          }
                      })
                  )
                }
              </div>
            </div>

            {/*-- Character Information --*/}
            <div className="details__box">
              <div className="headLine">
                <p>Character Information</p>
              </div>
              <div className="infoLight">
                <p>Character:</p>
                <p>{teamComp[0].name}</p>
              </div>
              <div className="infoDark">
                <p>Vocation:</p>
                <p>{teamComp[0].vocation}</p>
              </div>
              <div className="infoLight">
                <p>Level:</p>
                <p>{teamComp[0].level}</p>

              </div>
              <div className="infoDark">
                <p>Skills:</p>
                {getRelevantSkills()}
              </div>
              <div className="infoLight">
                <p>Magic level:</p>
                <p>
                  <img className="inline-img" src={`../images/Spellbooks/Spellbook.jpg`}/>
                  {teamComp[0].skills.magicLevel}
                </p>
              </div>
            </div>


            {/*-- Basic Information --*/}
            <div className="details__box">
              <div className="headLine">
                <p>Basic Information</p>
              </div>
              <div className="infoLight">
                <p>Exp/h:</p>
                <NumberFormat
					          value={expH}
                    thousandSeparator={true}
                    displayType="text"
                    suffix=' exp/h'
				        />
              </div>
              <div className="infoDark">
                <p>Exp ratio: </p>
                <p>{expRatio * 100}%</p>
              </div>
              <div className="infoLight">
                <p>Profit/h:</p>
                <NumberFormat
					          value={profitH}
                    thousandSeparator={true}
                    displayType="text"
                    suffix=' gp/h'
				        />
              </div>
              <div className="infoDark">
                <p>Difficulty:</p>
                <p>{difficulty}</p>
              </div>
            </div>

            {/*-- Team --*/}
            <SmallTable
            title="Additional Team"
            data={team}
            marginTop={"20px"}
            />

            {/*-- Supplies --*/}
            <div className="details__box">
              <div className="headLine">
                <p>Supplies</p>
              </div>
              <div className="supplies__content">
              {
                supplies && (
                  supplies.map((supply, index) => {
                    return (
                      <span key={index}>
                        <img src={`../images/${supply.type}/${supply.name}.jpg`} />
                        x {supply.ammount}
                      </span>
                    )
                  })
                )
              }
              {
                ammunition && (
                  ammunition.map((ammo, index) => {
                    return (
                      <span key={index}>
                        <img src={`../images/Ammunition/${ammo.name}.jpg`} />
                        x {ammo.ammount}
                      </span>
                    )
                  })
                )
              }
              </div>
            </div>

            {/*-- Imbuements --*/}
            <div className="details__box">
              <div className="headLine">
                <p>Imbuements</p>
              </div>
              <div className="details__content">
                  {
                      imbuements &&
                          imbuements.map((imbuement, index) => {
                            return <p key={index}>{imbuement.name} x {imbuement.ammount}</p>
                          })
                  }
              </div>
            </div>
            

            {/*-- Charms --*/}        
            <div className="details__box">
              <div className="headLine">
                <p>Charms</p>
              </div>
              <div className="details__content">
                  {
                      charms &&
                          charms.map((charm, index) => {
                            return <p key={index}>{charm}</p>
                          })
                  }
              </div>
            </div>

            {/*-- Preys --*/}
            <div className="details__box">
              <div className="headLine">
                <p>Preys</p>
              </div>
              <div className="details__content">
                  {
                      preys &&
                          preys.map((prey, index) => {
                            return <p key={index}>{prey}</p>
                          })
                  }
              </div>
            </div>

            {/*-- Sepcial Events --*/}
            <div className="details__box">
              <div className="headLine">
                <p>Special Event</p>
              </div>
              <div className="details__content">
                <p>{specialEvents}</p>
              </div>
            </div>

          </div>


     {/*--------- Here all the content displayed on the right side ---------*/}
      <div className="rightOrganiser">
          <div className="lootPicDetail">
              <img src={`${huntPicture}`} alt="hunt picture"></img>
          </div>

          <CommentBoxToDisplay comment={opComment} createdAt={createdAt} user={huntUser} isOp={true}/>
          {
            comments.map( comment => {
              let { _id, text, likes, dislikes, createdAt, user} = comment
              return <CommentBoxToDisplay receiver={huntUser._id} notificationReference={huntDetails._id} id={_id} comment={text} likes={likes} dislikes={dislikes} createdAt={createdAt} user={user} isOp={false}/>
            })
          }
          { authenticated && (<CommentBoxToComment receiver={huntUser._id} notificationReference={huntDetails._id} />) }
      </div>
  </div>
  )}

  const content = huntDetails ? renderFragment() : null
  
    return (
    <ContentBox
      height="1200px"
      width="1200px"
      title={huntDetails && (`${huntDetails.spot.city}, ${huntDetails.spot.name}`)}
      content={content}
    ></ContentBox>
    )
}

export default HuntDetails