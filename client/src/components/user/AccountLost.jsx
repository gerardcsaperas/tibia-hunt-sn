import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../../config'
import axios from 'axios'
import ContentBox from '../custom/ContentBox/ContentBox'
import FormBox from '../custom/FormBox/FormBox'

function AccountLost() {

    const [ email, setEmail ] = useState();
    const [ sentEmail, setSentEmail ] = useState(false);

    const recoverAccount = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = {
            email
        }

        try {
            const response = await axios.post(`${API_URL}/user/reset-password`, body, config);
            setSentEmail(true);
        } catch(e) {
            console.error(e.message);
        }
    }

    const form = (
        <form className="login-form">
            <div className="form-input-row">
                <label>Email Adress:</label>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} autoComplete="off"/>
            </div>
            <p>Not a member yet?<Link to="/signup">Sign Up</Link></p>
            <Link to="/login">Log In</Link>
        </form>
    )

    const successMsg = (
        <Fragment>
            <p>Thank you.</p>
            <p>If that address matches any of the emails in our database, we sent you a message.</p>
            <p>Kind Regards,</p>
            <p>Tibia Hunting Records</p>
        </Fragment>
    )
    
    const content =
        <Fragment>
            <FormBox form={form} />
            <div className="buttons__box">
                <button className="button" type="submit" onClick={recoverAccount}>Recover</button>
            </div>
        </Fragment>
    
    return (
    <ContentBox
        width="370"
        title="Recover Account"
        content={ sentEmail ? successMsg : content}
    />
    )
}

export default AccountLost
