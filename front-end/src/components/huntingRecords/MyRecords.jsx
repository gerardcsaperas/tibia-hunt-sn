import React, { Fragment, useEffect, useState } from 'react';
import ContentBox from '../custom/ContentBox/ContentBox';
import axios from "axios";
import { API_URL } from "../../config";
import HuntSummary from '../huntingRecords/HuntSummary';
import "./MyRecords.css";




// Redux
import { useSelector } from 'react-redux'
import { selectUser } from '../user/userSlice'


function MyRecords() {

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
                    return setHuntList([...response.data])      
                }

        }   
            catch(e) {
                console.error(e);
            }
    }

    const mockHuntData = [
        {
        huntPicture: "Pic_id", 
        spot: {city: "edron", name: "demons"}, 
        teamComp: {name: "Lunatek", level: "250", vocation: "ED"},
        expH: '1.500.000/h', 
        profitH: '250.000/h',
        expRatio: '150%', 
        likes: '50', 
        dislikes: '1',
        comments:'29'
        }
    ]


  const content = (
    <Fragment>
        <div className="filters">
        <h1>Filters</h1>
          <img className="loupe" src="./assets/Loupe.gif" alt="Loupe" />
            <form className="grill">
              <label className="dividers">
                  Level:
                  <select className="selector"/>
              </label>

              <label className="dividers">
                  Vocation:
                  <select className="selector"/>
              </label>

              <label className="dividers">
                  Exp Ratio:
                  <select className="selector"/>
              </label>

              <label className="dividers">
                  Exp/h:
                  <select className="selector"/>
              </label>

              <label className="dividers">
                  City:
                  <select className="selector"/>
              </label>

              <label className="dividers">
                  Special Event:
                  <select className="selector"/>
              </label>

              <label className="dividers">
                  Profit/h:
                  <select className="selector"/>
              </label>

              <label className="dividers">
                  Team:
                  <select className="selector"/>
              </label>

              <label className="dividers">
                  Difficulty:
                  <select className="selector"/>
              </label>
            </form>
        </div>


        <ol className="recordSummaryList">
            <li className="recordSummary">
                <HuntSummary title="huntList" data={mockHuntData} />  
            </li>
        </ol>

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

export default MyRecords