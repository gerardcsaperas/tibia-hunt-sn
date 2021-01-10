import React, { Fragment, useEffect, useState } from 'react';
import ContentBox from '../custom/ContentBox/ContentBox';
// import axios from "axios";
// import { API_URL } from "../../config";
// import HuntSummary from './custom/HuntSummary/HuntSummary';
import "./styles/MyRecords.css";


// // Redux
// import { useSelector } from 'react-redux'
// import {
// 	selectUser
// } from './userSlice'




function MyRecords() {
    // const handleSearch = (e) => {
    //     let search = e.currentTarget.value.toLowerCase();
    //     let cloneChallenges = this.state.challenges.filter((item) => {
    //       return (
    //         item.title.toLowerCase().includes(search) ||
    //         item.description.toLowerCase().includes(search)
    //       );
    //     });
    //     this.setState({
    //       filteredChallenges: cloneChallenges,
    //     });
    //   };

  const content = (
    <Fragment>
        <div className="filters">
        <h1>Filters</h1>
          <img className="loupe" src={"./assets/Loupe.gif"} alt="Loupe" />
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
{/* 
        <ol className="list">
          {this.state.huntingRecord.map((record) => {
            const {picture, location, city, characterName, level, vocation, expRatio, expH, profitH, likesCount, dislikesCount, commentsCount } = user;
            return (
              <Link to={`/hunting-record/${_id}`}>
                  <li className="recordSummary">
                    {username} {points} points
                  </li> 
              </Link>

            <Link to={`/hunting-record/${_id}`}>
                <li className="recordSummary">
                    <div className="lootPicContainer">
                        {picture}
                    </div>

                    <div className="basicInfo" >
                        <h1 className="location">{location}, {city}</h1>
                        <div className="details">
                            <p className="info">{characterName}, {level} {vocation}</p>
                            <p className="info">Exp/h: {expH}</p>
                            <p className="info">Exp Ratio: {expRatio}</p>
                            <p className="info">Profit/h: {profitH}</p>
                        </div>

                        <div className="socialMedia">
                            <i class="far fa-thumbs-up">{likesCount}</i>
                            <i class="far fa-thumbs-down">{dislikesCount}</i>
                            <i class="fas fa-comment">{commentsCount}</i>
                        </div>
                    </div>
                </li>
            </Link>
            );
          })}
        </ol> */}

        <ol>
            <li className="recordSummary">
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
                </li>
            {/* <HuntSummary/> */}
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