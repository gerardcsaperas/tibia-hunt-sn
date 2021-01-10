import React, { Fragment, useState, useEffect } from 'react'
import ContentBox from '../custom/ContentBox/ContentBox';
import axios from "axios";
import {Link} from 'react-router-dom';
import { API_URL } from "../../config";
import FormBox from '../custom/FormBox/FormBox';
import './NewCharacter.scss';

// Redux
import { useSelector } from 'react-redux'
import {
	selectUser
} from '../user/userSlice'

function NewCharacter(props) {
    const user = useSelector(selectUser);
    
    const [ characterName, setCharacterName ] = useState();
    const [ apiSync, setApiSync ] = useState(false);
    const [ disabledInputs, setDisabledInputs ] = useState(false);
    useEffect(() => {
        if (apiSync) {
            setDisabledInputs(true);
        } else {
            setDisabledInputs(false);
        }
    }, [apiSync])
    const [ level, setLevel ] = useState();
    const [ vocation, setVocation ] = useState();
    const [ world, setWorld ] = useState();
    const [ page, setPage ] = useState(1);

    const form = page === 1 ? (
        <div className="form NewCharacter" style={{paddingTop: "40px"}}>
            <h1>General Information</h1>
            <img className="box-icon" src={"../images/option_server_location_all.png"}/>
            <div className="form-input-row">
                <label>Character Name:</label>
                <input type="text" name="characterName" onChange={(e) => setCharacterName(e)} autoComplete="off" />
            </div>
            <div className="form-input-row" style={{flexDirection: "row", alignItems: "center"}}>
                <label>Sync with Tibia.com?</label>
                <input type="checkbox" style={{width: "30px"}} onChange={() => setApiSync(!apiSync)}/>
            </div>
            <div className="form-input-row">
                <label>Level:</label>
                <input type="number" name="level" min="1" onChange={(e) => setLevel(e)} autoComplete="off" disabled={disabledInputs} />
            </div>
            <div className="form-input-row">
                <label>Vocation:</label>
                <input type="text" name="vocation" onChange={(e) => setVocation(e)} autoComplete="off" disabled={disabledInputs} />
            </div>
            <div className="form-input-row">
                <label>World:</label>
                <input type="text" name="world" onChange={(e) => setWorld(e)} autoComplete="off" disabled={disabledInputs} />
            </div>
        </div>
    ) : (
        
    <form>

    </form>
    )

    const content = (
        <Fragment>
          <FormBox form={form} />
          <div className="buttons__box absolute-bot">
            { page === 1 ? <button className="button" onClick={() => setPage(2)}>Next</button> : null }
            { page === 2 ? <button className="button" onClick={() => setPage(1)}>Back</button> : null }
            { page === 2 ? <button className="button" onClick={() => console.log('save')}>Save</button> : null }
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

