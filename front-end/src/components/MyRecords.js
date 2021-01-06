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