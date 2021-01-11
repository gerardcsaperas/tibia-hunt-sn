import React, { Fragment, useState, useEffect } from 'react'
import ContentBox from '../custom/ContentBox/ContentBox';
import axios from "axios";
import {Link} from 'react-router-dom';
import { API_URL, vocations } from "../../config";
import { shortenVocation } from '../../utils/shortenVocation';
import worlds from '../../assets/worlds.json';
import FormBox from '../custom/FormBox/FormBox';
import './NewCharacter.scss';

// Redux
import { useSelector } from 'react-redux'
import {
	selectUser
} from '../user/userSlice'

function NewCharacter(props) {
    const user = useSelector(selectUser);
    
    const [ characterName, setCharacterName ] = useState('');
    const [ nameError, setNameError ] = useState(false);
    const updateCharacterName = (characterName) => {
        setApiSync(false);
        setNameError(false);
        setCharacterName(characterName);
    }

    const [ tibiaApySync, setApiSync ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ disabledInputs, setDisabledInputs ] = useState(false);
    
    // useEffect(() => {
    //     console.log(characterName);
    // }, [characterName])

    useEffect(() => {
        if (tibiaApySync) {
            getTibiaData(characterName);
            setDisabledInputs(true);
        } else {
            setDisabledInputs(false);
        }
    }, [tibiaApySync])

    const getTibiaData = async(characterName) => {
        setLoading(true);
        const response = await axios.get(`https://api.tibiadata.com/v2/characters/${characterName}.json`);
        const character = response.data.characters.data;
        setLevel(character.level);
        setVocation(shortenVocation(character.vocation));
        setWorld(character.world);
        setLoading(false);
    }

    const [ level, setLevel ] = useState(1);
    const [ levelError, setLevelError ] = useState(false);
    const updateLevel = (level) => {
        setLevelError(false);
        setLevel(level);
    }

    const [ vocation, setVocation ] = useState();
    const [ world, setWorld ] = useState();
    const [ axeFighting, setAxeFighting ] = useState(1);
    const [ swordFighting, setSwordFighting ] = useState(1);
    const [ clubFighting, setClubFighting ] = useState(1);
    const [ distanceFighting, setDistanceFighting ] = useState(1);
    const [ shielding, setShielding ] = useState(1);
    const [ magicLevel, setMagicLevel ] = useState(1)
    const [ page, setPage ] = useState(1);
    const nextPage = () => {
        if (characterName === '') {
            return setNameError(true);
        }

        if (parseInt(level) <= 1) {
            return setLevelError(true);
        }

        return setPage(2);
    }
    const [ success, setSuccess ] = useState(false);

    const saveCharacter = async () => {

        const character = {
            name: characterName,
            tibiaApySync,
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

            const response = await axios.post(`${API_URL}/character`, character, config);
            
            if (response.status === 201) {
                setSuccess(true);
                setPage(3);

                setTimeout(() => {
                    window.location.href = '/profile'
                }, 1500)
            }

        } catch(e) {
            console.error(e);
        }
    }

    const form = page === 1 ? (
        <div className="form NewCharacter" style={{paddingTop: "40px"}}>
            <h1>General Information</h1>
            <img className="box-icon" src={"../images/option_server_location_all.png"}/>
            <div className="form-input-row">
                <label>Character Name*</label>
                <input type="text" name="characterName" value={characterName} onChange={(e) => updateCharacterName(e.target.value)} autoComplete="off" />
                { nameError ? <p className="error">Please provide a name for your character.</p> : null}
            </div>
            <div className="form-input-row" style={{flexDirection: "row", alignItems: "center"}}>
                <label>Sync with Tibia.com?</label>
                <input type="checkbox" style={{width: "30px"}} onChange={() => setApiSync(!tibiaApySync)} checked={tibiaApySync} disabled={loading}/>
            </div>
            <div className="form-input-row">
                <label>Level*</label>
                <input type="number" name="level" min="1" value={level} onChange={(e) => updateLevel(e.target.value)} autoComplete="off" disabled={disabledInputs} />
                { levelError ? <p className="error">Please provide a valid for your character.</p> : null}
            </div>
            <div className="form-input-row">
                <label>Vocation*</label>
                <select name="vocation" value={vocation} onChange={(e) => setVocation(e.target.value)} autoComplete="off" disabled={disabledInputs}>
                    {
                        vocations.map( (voc, index) => {
                            return <option key={index} value={voc}>{voc}</option>
                        })
                    }
                </select>
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
            <img className="box-icon" src={"../images/option_server_pvp_type_hardcore.gif"}/>
            <div className="form-input-row">
                <label><img className="label-miniature" src={"../images/Axe.gif"}/>Axe Fighting</label>
                <input type="number" name="axeFighting" min="1" value={axeFighting} onChange={(e) => setAxeFighting(e.target.value)} autoComplete="off" />
            </div>
            <div className="form-input-row">
                <label><img className="label-miniature" src={"../images/Mace.gif"}/>Club Fighting</label>
                <input type="number" name="clubFighting" min="1" value={clubFighting} onChange={(e) => setClubFighting(e.target.value)} autoComplete="off" />
            </div>
            <div className="form-input-row">
                <label><img className="label-miniature" src={"../images/Sword.gif"}/>Sword Fighting</label>
                <input type="number" name="swordFighting" min="1" value={swordFighting} onChange={(e) => setSwordFighting(e.target.value)} autoComplete="off" />
            </div>
            <div className="form-input-row">
                <label><img className="label-miniature" src={"../images/Spear.gif"}/>Distance Fighting</label>
                <input type="number" name="distanceFighting" min="1" value={distanceFighting} onChange={(e) => setDistanceFighting(e.target.value)} autoComplete="off" />
            </div>
            <div className="form-input-row">
                <label><img className="label-miniature" src={"../images/Spear.gif"}/>Shielding</label>
                <input type="number" name="shielding" min="1" value={shielding} onChange={(e) => setShielding(e.target.value)} autoComplete="off" />
            </div>
            <div className="form-input-row">
                <label><img className="label-miniature" src={"../images/Spellbook.gif"}/>Magic Level</label>
                <input type="number" name="magicLevel" min="1" value={magicLevel} onChange={(e) => setMagicLevel(e.target.value)} autoComplete="off" />
            </div>
        </div>)

    const successMsg = (
        <Fragment>
            <p>Congratulations, {user.username}!</p>
            <p>{characterName} was created successfully.</p>
            <p>You will be redirected to your profile.</p>
        </Fragment>
    )

    const content = (
        <Fragment>
          { !success ? <FormBox form={form} /> : successMsg }
          <div className="buttons__box">
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
                title="New Character"
                content={content}
            ></ContentBox>
        </div>
    )
}

export default NewCharacter

