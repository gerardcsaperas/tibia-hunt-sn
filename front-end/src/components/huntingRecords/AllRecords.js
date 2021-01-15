import React, { Fragment, useEffect, useState } from 'react';
import ContentBox from '../custom/ContentBox/ContentBox';
import axios from "axios";
import { API_URL } from "../../config";
import HuntSummary from '../huntingRecords/HuntSummary';


import "./AllRecords.css";




// Redux
import { useSelector } from 'react-redux'
import { selectUser } from '../user/userSlice'


function AllRecords() {

    //Code to Filter List of Hunting Records
    const [searchLevel, setSearchLevel] = useState();
    const [searchExpH, setSearchExpH] = useState();
    const [searchProfitH, setSearchProfitH] = useState();
    const [searchVocation, setSearchVocation] = useState();
    const [searchCity, setSearchCity] = useState();
    const [searchTeamComp, setSearchTeamComp] = useState();
    const [searchExpRatio, setSearchExpRatio] = useState();
    const [searchEvent, setSearchEvent] = useState();
    const [searchDifficulty, setSearchDifficulty] = useState();

    const [searchResults, setSearchResults] = useState([]);

    
    const handleChange = event => {
        setSearchLevel||
        setSearchExpH||
        setSearchProfitH||
        setSearchVocation||
        setSearchCity||
        setSearchTeamComp||
        setSearchExpRatio||
        setSearchEvent||
        setSearchDifficulty(event.target.value);
    };
    useEffect(() => {
    const results = mockLevelData.filter(person =>
      person.toLowerCase().includes(searchLevel)
    );
    setSearchResults(results);
    }, [searchLevel]);

    useEffect(() => {
        console.log(searchLevel)
    }, [searchLevel])



    //Code to display List of Hunting Records
    const user = useSelector(selectUser);

    const [ huntList, setHuntList ] = useState();

    // Get hunt list on component initialization
    useEffect(() => {
        getHuntList();
    }, [])

    // Function used to retrieve user hunt list
    const getHuntList = async() => {
        try {
            const config = {
                       headers: {
                           'Authorization': `Bearer ${user.token}`
                       },
                       params: {
                           one: 'two',
                           three: 4,
                           five: [6, 7, 8, 9],
                           itworks: "yeah"
                       }
                   };

            const response = await axios.get(`${API_URL}/huntingRecord`, config);    

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
         huntPicture: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tibiahof.com%2Fiview%2F302&psig=AOvVaw1zfiJwVaQ6bzFZXLpXt73r&ust=1610447355867000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMj79InWk-4CFQAAAAAdAAAAABAJ", 
         spot: {city: "edron", name: "demons"}, 
         teamComp: {name: "Lunatek", level: "250", vocation: "ED"},
         expH: '1.500.000/h', 
         profitH: '250.000/h',
         expRatio: '150%', 
         likes: '50', 
         dislikes: '1',
         comments:'29'
         },

         {
         huntPicture: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tibiahof.com%2Fiview%2F302&psig=AOvVaw1zfiJwVaQ6bzFZXLpXt73r&ust=1610447355867000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMj79InWk-4CFQAAAAAdAAAAABAJ", 
         spot: {city: "yalahar", name: "hellspawns"}, 
         teamComp: {name: "Shovii", level: "260", vocation: "RP"},
         expH: '500.000/h', 
         profitH: '150.000/h',
         expRatio: '150%', 
         likes: '50', 
         dislikes: '1',
         comments:'29'
         }
    ]

    const mockLevelData = [
        "0-100",
        "100-200",
        "200-300",
        "300-400",
        "400-500"
    ]

    const mockExpHData = [
        "0-100.000/h",
        "500.000-1.000.000/h",
        "1.000.000-2.000.000/h"
    ]

    const mockProfitHData = [
        "0-100.000/h",
        "500.000-1.000.000/h",
        "1.000.000-2.000.000/h"
    ]

    const mockVocationData = [
        "EK",
        "RP",
        "ED",
        "MS"
    ]

    const mockCityData = [
        "Edron",
        "Venore",
        "Carlin",
        "thais",
        "Yalahar"
    ]

    const mockTeamCompData = [
        "Solo",
        "Duo",
        "Trio",
        "Full-Team +"
    ]

    const mockExpRatioData = [
        "100%",
        "150%",
        "200%",
        "225%",
        "300%"
    ]

    const mockEventData = [
        "Double Exp",
        "Double Loot",
        "Rapid Respawn",
        "Creature Boost"
    ]

    const mockDifficultyData = [
        "Easy",
        "Medium",
        "High"
    ]



  const content = (
    <Fragment>
        <div className="filters">
        <h1>Filters</h1>
          <img className="loupe" src="./images/Loupe.gif" alt="Loupe" />
            <form className="grill">
              <label className="dividers">
                  Level:
                   <select className="selector" onChange={handleChange}>
                        {mockLevelData.map((level, index) => {
                        return <option>{level}</option>
                        })}
                  </select>
              </label>

              <label className="dividers">
                  Vocation:
                  <select className="selector" onChange={handleChange}>
                        {mockVocationData.map((voc, index) => {
                        return <option>{voc}</option>
                        })}
                  </select>
              </label>

              <label className="dividers">
                  Exp Ratio:
                  <select className="selector" onChange={handleChange}>
                        {mockExpRatioData.map((expRatio, index) => {
                        return <option>{expRatio}</option>
                        })}
                  </select>
              </label>

              <label className="dividers">
                  Exp/h:
                  <select className="selector" onChange={handleChange}>
                        {mockExpHData.map((expH, index) => {
                        return <option>{expH}</option>
                        })}
                  </select>
              </label>

              <label className="dividers">
                  City:
                  <select className="selector" onChange={handleChange}>
                        {mockCityData.map((city, index) => {
                        return <option>{city}</option>
                        })}
                  </select>
              </label>
             

              <label className="dividers">
                  Special Event:
                  <select className="selector" onChange={handleChange}>
                        {mockEventData.map((event, index) => {
                        return <option>{event}</option>
                        })}
                  </select>
              </label>

              <label className="dividers">
                  Profit/h:
                  <select className="selector" onChange={handleChange}>
                        {mockProfitHData.map((profitH, index) => {
                        return <option>{profitH}</option>
                        })}
                  </select>
              </label>

              <label className="dividers">
                  Team:
                  <select className="selector" onChange={handleChange}>
                        {mockTeamCompData.map((team, index) => {
                        return <option>{team}</option>
                        })}
                  </select>
              </label>

              <label className="dividers">
                  Difficulty:
                  <select className="selector" onChange={handleChange}>
                        {mockDifficultyData.map((Difficulty, index) => {
                        return <option>{Difficulty}</option>
                        })}
                  </select>
              </label>

            </form>
        </div>
      
        
        <ol className="listContainer">
            <li className="recordsList">
                {
                    huntList && huntList.length > 0 ? 
                         huntList.map((huntingRecord, index) => {
                        return <HuntSummary data={huntingRecord} key={index} />
                               
                    })
                     : null
                }
            </li>        
        </ol>
        
        
       
    </Fragment>
  )
  


    return (
    <ContentBox
      height="700px"
      width="980px"
      title="All Records"
      content={content}
    ></ContentBox>
    )
}

export default AllRecords