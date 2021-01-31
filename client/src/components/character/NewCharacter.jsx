import React, { Fragment, useState, useEffect } from 'react'
import ContentBox from '../custom/ContentBox/ContentBox';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import { API_URL, vocations } from "../../config";
import { shortenVocation } from '../../utils/shortenVocation';
import worlds from '../../assets/worlds.json';
import FormBox from '../custom/FormBox/FormBox';
import ModalForm from '../custom/ModalForm/ModalForm';
import './NewCharacter.scss';

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../user/userSlice'
import { addCharacter } from './characterSlice'

function NewCharacter(props) {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const { _id } = useParams();
    const [ characterName, setCharacterName ] = useState('');
    const [ nameError, setNameError ] = useState(false);
    const [ tibiaApiSync, setApiSync ] = useState(false);
    const [ charDoesNotExistError, setCharDoesNotExistError ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ disabledInputs, setDisabledInputs ] = useState(false);
    const [ level, setLevel ] = useState(1);
    const [ levelError, setLevelError ] = useState(false);
    const [ vocation, setVocation ] = useState();
    const [ vocationError, setVocationError ] = useState(false);
    const [ world, setWorld ] = useState();
    const [ axeFighting, setAxeFighting ] = useState(1);
    const [ swordFighting, setSwordFighting ] = useState(1);
    const [ clubFighting, setClubFighting ] = useState(1);
    const [ distanceFighting, setDistanceFighting ] = useState(1);
    const [ shielding, setShielding ] = useState(1);
    const [ magicLevel, setMagicLevel ] = useState(1)
    const [ page, setPage ] = useState(1);
    const [ success, setSuccess ] = useState(false);
    const [ showDeleteModal, setShowDeleteModal ] = useState(false);

    useEffect(() => {
		if (_id) {
			fetchCharacterById(_id)
		}
	}, [_id])

    useEffect(() => {
        if (tibiaApiSync) {
            getTibiaData(characterName);
            setDisabledInputs(true);
        } else {
            setDisabledInputs(false);
        }
    }, [tibiaApiSync])

    const fetchCharacterById = async (_id) => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            };
            const response = await axios.get(`${API_URL}/character/${_id}`, config);
            if (response.status === 200) {
                let {
                    level,
                    name,
                    skills,
                    tibiaApiSync,
                    vocation,
                    world
                } = response.data;
                
                setCharacterName(name);
                setLevel(level);
                setWorld(world);
                setVocation(vocation);
                setSwordFighting(skills.sword);
                setAxeFighting(skills.axe);
                setClubFighting(skills.club);
                setDistanceFighting(skills.distanceFighting);
                setMagicLevel(skills.magicLevel);
                setShielding(skills.shielding);
                setApiSync(tibiaApiSync);
            }
        } catch(e) {
            console.error(e.message);
        }
    }

    const getTibiaData = async(characterName) => {
        setLoading(true);
        const response = await axios.get(`https://api.tibiadata.com/v2/characters/${characterName}.json`);
        
        if (response.data.characters.error === "Character does not exist.") {
            setApiSync(false);
            setDisabledInputs(false);
            setCharDoesNotExistError(true);
            setLoading(false);
            return;
        }

        const character = response.data.characters.data;
        setLevel(character.level);
        setVocation(shortenVocation(character.vocation));
        setWorld(character.world);
        setLoading(false);
    }

    const updateCharacterName = (characterName) => {
        setApiSync(false);
        setNameError(false);
        setCharacterName(characterName);
    }

    const updateLevel = (level) => {
        setLevelError(false);
        setLevel(level);
    }

    const updateVocation = (vocation) => {
        setVocationError(false);
        setVocation(vocation);
    }

    const nextPage = () => {
        if (characterName === '') {
            return setNameError(true);
        }

        if (parseInt(level) <= 1) {
            return setLevelError(true);
        }

        if (!vocation) {
            return setVocationError(true);
        }

        return setPage(2);
    }

    const saveCharacter = async () => {

        const character = {
            name: characterName,
            tibiaApiSync,
            level,
            vocation,
            world,
            skills: {
                sword: swordFighting,
                axe: axeFighting,
                club: clubFighting,
                distanceFighting: distanceFighting,
                shielding: shielding,
                magicLevel: magicLevel
            }
        }

        try {
            const config = {
                      headers: {
                          'Authorization': `Bearer ${user.token}`
                    }
            };

            if (_id) {
                const response = await axios.put(`${API_URL}/character/${_id}`, character, config);
                if (response.status === 200) {
                    setSuccess(true);
                    setPage(3);
                    setTimeout(() => {
                        window.location.href = '/profile'
                    }, 1500)
                }
            } else {
                const response = await axios.post(`${API_URL}/character`, character, config);

                if (response.status === 201) {
                    setSuccess(true);
                    setPage(3);
                    setTimeout(() => {
                        window.location.href = '/profile'
                    }, 1500)
                }
            }

        } catch(e) {
            console.error(e);
        }
    }

    const form = page === 1 ? (
        <div className="form NewCharacter" style={{paddingTop: "40px"}}>
            <h1>General Information</h1>
            <div className="form-input-row">
                <label>Character Name*</label>
                <input type="text" name="characterName" value={characterName} onChange={(e) => updateCharacterName(e.target.value)} autoComplete="off" />
                { nameError ? <p className="error">Please provide a name for your character.</p> : null}
            </div>
            <div className="form-input-row" style={{flexDirection: "row", alignItems: "center"}}>
                <label>Sync with Tibia.com?</label>
                <input type="checkbox" style={{width: "30px"}} onChange={() => setApiSync(!tibiaApiSync)} checked={tibiaApiSync} disabled={loading}/>
            </div>
            <div className="form-input-row">
                <label>Level*</label>
                <input type="number" name="level" min="1" value={level} onChange={(e) => updateLevel(e.target.value)} autoComplete="off" disabled={disabledInputs} />
                { levelError ? <p className="error">Please provide a valid level for your character.</p> : null}
            </div>
            <div className="form-input-row">
                <label>Vocation*</label>
                <select name="vocation" value={vocation} onChange={(e) => updateVocation(e.target.value)} autoComplete="off" disabled={disabledInputs}>
                    {
                        vocations.map( (voc, index) => {
                            return <option key={index} value={voc}>{voc}</option>
                        })
                    }
                </select>
                { vocationError ? <p className="error">Please provide a valid vocation for your character.</p> : null}
            </div>
            <div className="form-input-row">
                <label>World</label>
                <select name="world" value={world} onChange={(e) => setWorld(e.target.value)} autoComplete="off" disabled={disabledInputs}>
                    {
                        worlds.map( (world, index) => {
                            return <option key={index} value={world.Name}>{world.Name}</option>
                        })
                    }
                </select>
            </div>
            <p className="form-tip">*Mandatory field.</p>
        </div>
    ) : (       
        <div className="form NewCharacter" style={{paddingTop: "40px"}}>
            <h1>Skills</h1>
            <div className="form-input-row">
                <label><img className="label-miniature" src={"../../images/Axe.gif"}/>Axe Fighting</label>
                <input type="number" name="axeFighting" min="1" value={axeFighting} onChange={(e) => setAxeFighting(e.target.value)} autoComplete="off" />
            </div>
            <div className="form-input-row">
                <label><img className="label-miniature" src={"../../images/Mace.gif"}/>Club Fighting</label>
                <input type="number" name="clubFighting" min="1" value={clubFighting} onChange={(e) => setClubFighting(e.target.value)} autoComplete="off" />
            </div>
            <div className="form-input-row">
                <label><img className="label-miniature" src={"../../images/Sword.gif"}/>Sword Fighting</label>
                <input type="number" name="swordFighting" min="1" value={swordFighting} onChange={(e) => setSwordFighting(e.target.value)} autoComplete="off" />
            </div>
            <div className="form-input-row">
                <label><img className="label-miniature" src={"../../images/Spear.gif"}/>Distance Fighting</label>
                <input type="number" name="distanceFighting" min="1" value={distanceFighting} onChange={(e) => setDistanceFighting(e.target.value)} autoComplete="off" />
            </div>
            <div className="form-input-row">
                <label><img className="label-miniature" src={"../../images/Shields/Dwarven_Shield.jpg"}/>Shielding</label>
                <input type="number" name="shielding" min="1" value={shielding} onChange={(e) => setShielding(e.target.value)} autoComplete="off" />
            </div>
            <div className="form-input-row">
                <label><img className="label-miniature" src={"../../images/Spellbook.gif"}/>Magic Level</label>
                <input type="number" name="magicLevel" min="1" value={magicLevel} onChange={(e) => setMagicLevel(e.target.value)} autoComplete="off" />
            </div>
        </div>)

    const successMsg = (
        <Fragment>
            <p>Congratulations, {user.username}!</p>
            <p>{characterName} was saved successfully.</p>
            <p>You will be redirected to your profile.</p>
        </Fragment>
    )

    const deleteCharacter = async (_id) => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            };

            const response = await axios.delete(`${API_URL}/character/${_id}`, config);
            if (response.status === 204) {
                window.location.href = '/profile'
            }
        } catch(e) {
            console.error(e.message);
        }
    }


    const deleteCharModalContent = 
        <Fragment>
            <p>Are you sure you want to delete this character?</p>
            <div className="buttons__box">
                <button className="button" onClick={() => setShowDeleteModal(false)}>Back</button>
                <button className="button-warning" onClick={() => deleteCharacter(_id)}>Delete</button>
            </div>
        </Fragment>

    const content = (
        <Fragment>
            { !success ?
                <FormBox
                    imgSrc={ page === 1 ? "../../images/option_server_location_all.png" : "../../images/option_server_pvp_type_hardcore.gif" }
                    form={form}
                />
                : successMsg
            }
            { _id && (<i className="fas fa-trash delete-character" onClick={() => setShowDeleteModal(true)}/>) }
            { showDeleteModal &&
                <ModalForm
                    title="Delete Character"
                    _id={_id}
                    content={deleteCharModalContent}
                    modalForm={showDeleteModal}
                    setModalForm={setShowDeleteModal}
                />
            }
          <div className="buttons__box">
            { page === 1 ? <Link className="button" to="/profile">Back</Link> : null }
            { page === 1 ? <button className="button" onClick={() => nextPage()}>Next</button> : null }
            { page === 2 ? <button className="button" onClick={() => setPage(1)}>Back</button> : null }
            { page === 2 ? <button className="button" onClick={() => saveCharacter()}>Save</button> : null }
          </div>
        </Fragment> 
    )

    return (
        <div>
            <ContentBox
                width="370"
                title={ _id ? "Edit Character" : "New Character" }
                content={content}
            ></ContentBox>
        </div>
    )
}

export default NewCharacter

