import React, { Fragment, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_URL } from '../../config'
import axios from 'axios'
import ContentBox from '../custom/ContentBox/ContentBox'
import FormBox from '../custom/FormBox/FormBox'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import {
	setUsername,
	setAvatar,
	setEmail,
	setCountry,
	setStars,
	setToken,
	setUid,
	authenticate,
	selectUser
} from './userSlice'

function ResetPassword() {
    const user = useSelector(selectUser);
	const dispatch = useDispatch()
    const { resetPasswordToken }  = useParams();
    const [ password, setPassword ] = useState();
    const [ repeatPassword, setRepeatPassword ] = useState();
    const [ error, setError ] = useState(false);
    const [ tokenExpired, setTokenExpired ] = useState(false);

    useEffect(() => {
        window.addEventListener('keypress', () => {
            setError(false);
        })
    }, [])

    const recoverAccount = async () => {

        if ( password !== repeatPassword ) {
            setError(true);
            return;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = {
            password
        }

        try {
            const response = await axios.put(`${API_URL}/user/reset-password/${resetPasswordToken}`, body, config);
            if (response.status === 200) {
                localStorage.setItem('TibiaHuntingRecordsUser', JSON.stringify(response.data));
                let { username, avatar, email, country, stars, _id } = response.data.user;
                let { token } = response.data;

                dispatch(setUsername(username));
				dispatch(setAvatar(avatar));
				dispatch(setEmail(email));
				dispatch(setCountry(country));
				dispatch(setStars(stars));
				dispatch(setUid(_id));
				dispatch(setToken(token));
				dispatch(authenticate());
            }

            if (response.status === 401) {
                setTokenExpired(true);
            }
        } catch(e) {
            console.error(e.message);
        }
    }

    const form = (
        <form className="login-form">
            <div className="form-input-row">
                <label>New Password:</label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} autoComplete="off"/>
            </div>
            <div className="form-input-row">
                <label>Repeat Password:</label>
                <input type="password" name="repeat-password" onChange={(e) => setRepeatPassword(e.target.value)} autoComplete="off"/>
            </div>
            { error && <p className="error">Passwords do not match!</p> }
        </form>
    )

    const tokenExpiredContent = (
        <Fragment>
            <p>It looks like your token has expired.</p>
            <Link to="/account-lost">Recover account</Link>
        </Fragment>
    )
    
    const content =
        <Fragment>
            <FormBox form={form} />
            <div className="buttons__box">
                <button className="button" type="submit" onClick={recoverAccount}>Save</button>
            </div>
        </Fragment>
    
    return (
    <ContentBox
        width="370"
        title="Recover Account"
        content={ tokenExpired ? tokenExpiredContent: content }
    />
    )
}

export default ResetPassword
