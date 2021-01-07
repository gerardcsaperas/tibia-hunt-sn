import React, { Fragment } from 'react';
import Button from './custom/Button/Button';
import ContentBox from './custom/ContentBox/ContentBox';
import "./styles/MyRecords.css";




function HomePage() {

  const content = (
    <Fragment>
        <div className="filters">
        <h1>Filters</h1>
          <img className="loupe" src="/images/Loupe.gif" alt="Loupe" />
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

        <ol className="recordSummary">
            <div className="lootPicContainer">
                <img className="lootPicture" src="/images/tibia-background-artwork.jpg" alt="defaultImg"></img>
            </div>

            <div className="basicInfo" >
                <h1 className="location">Demons, Edron</h1>
                <div className="details">
                    <p className="info">Lunatek, 250 ED</p>
                    <p className="info">Exp/h: 1.500.000/h</p>
                    <p className="info">Exp Ratio: 150%</p>
                    <p className="info">Profit/h: 250.000/h</p>
                </div>
            <div className="socialMedia">
                <i class="far fa-thumbs-up"></i>
                <i class="far fa-thumbs-down"></i>
                <i class="fas fa-comment"></i>
            </div>
               
            </div>
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

export default HomePage