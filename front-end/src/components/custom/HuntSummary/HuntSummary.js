import React, { Fragment, useEffect, useState } from 'react';
import ContentBox from './custom/ContentBox/ContentBox';
import axios from "axios";
import { API_URL } from "../../config";
import './HuntSummary.css';


// Redux
import { useSelector } from 'react-redux'
import {
	selectUser
} from './userSlice'


function HuntSummary() {

    const user = useSelector(selectUser);

    const [ huntList, setHuntList ] = useState();

    // Get hunt list on component initialization
    useEffect(() => {
        getHuntList();
    }, [])

    useEffect(() => {
        console.log(huntList);
    }, [huntList])

    // Function used to retrieve user hunt list
    const getHuntList = async() => {
        try {
            const config = {
                      headers: {
                          'Authorization': `Bearer ${user.token}`
                      }
                  };

            const response = await axios.get(`${API_URL}/huntingRecord/mine`, config);
            
            if (response.status === 200 && response.data.length > 0) {
                const huntList = response.data.map(hunt => {
                    return [hunt.huntPicture,
                            hunt.city, 
                            hunt.spot, 
                            hunt.expH, 
                            hunt.profitH, 
                            hunt.expRatio, 
                            hunt.likes, 
                            hunt.dislikes, 
                            hunt.comments]
                })
                setHuntList([...huntList])
            }

          } catch(e) {
            console.error(e);
          }
    }

    const mockHuntData = [
        ['huntPicture:', 'Pic_id'],
        ['city:', 'Edron'],
        ['spot:', 'Demons'],
        ['expH:', '1.500.000/h'],
        ['profitH:', '250.000/h'],
        ['expRatio:', '150%'],
        ['likes:', '50'],
        ['dislikes:', '1'],
        ['comments:', '29']
    ]

    const content = (
        <Fragment>
                <div className="recordSummary">
                        <div className="lootPicContainer">
                            <img className="lootPicture" src="/assets/tibia-background-artwork.jpg" alt="defaultImg"></img>
                        </div>
    
                        <div className="basicInfo" >
                            <h1 className="location">Demons, Edron</h1>
                            <div className="details">
                                <p className="charInfo">Lunatek, 250 ED</p>
                                <p className="info">Exp/h: 1.500.000/h</p>
                                <p className="expRatio">Exp Ratio: 150%</p>
                                <p className="info">Profit/h: 250.000/h</p>
                            </div>
                        <div className="socialMedia">
                            <i class="far fa-thumbs-up"> 0</i>
                            <i class="far fa-thumbs-down"> 0</i>
                            <i class="far fa-comment"> 0</i>
                        </div>
                        
                        </div>
                    </div>
        </Fragment>
    )

    return (
        <ContentBox
          height="700px"
          width="980px"
          title="My Records"
          content={content}
        ></ContentBox>
    )
}

export default HuntSummary
