import React, { useState } from 'react'
import NumberFormat from 'react-number-format';
import './FiltersBox.scss';

function FiltersBox(props) {

    const { handleChange, filterClick } = props;

    const handleFormattedData = (values, name) => {
        
        const e = {
            target: {
                value: values.value,
                name: name
            }
        }

        handleChange(e);
    }

    const vocationOptions = [
        "",
        "Druid",
        "Knight",
        "Paladin",
        "Sorcerer"
    ]
    
    const teamOptions = [
        "",
        "Solo",
        "Duo",
        "Trio",
        "Full Team +"
    ]
    
    // const mockExpRatioData = [
    //     "100%",
    //     "150%",
    //     "200%",
    //     "225%",
    //     "300%"
    // ]
    
    // const specialEventOptions = [
    //     "",
    //     "Double Exp",
    //     "Double Loot",
    //     "Rapid Respawn",
    //     "Creature Boost"
    // ]
    
    const difficultyOptions = [
        "",
        "Easy",
        "Medium",
        "Hard",
        "Extreme"
    ]
    

    return (
        <div className="filters">
            <h1>Filters</h1>
            <img className="loupe" src="./images/Loupe.gif" alt="Loupe" />
            <form className="grill">
                <div className="dividers">
                    <label>Max Level:</label>
                    <input name="level" type="number" min="1" onChange={handleChange} autoComplete="off"/>
                </div>

                <div className="dividers">
                    <label>Minimum Exp/h:</label>
                    <NumberFormat
                    autoComplete="off"
                    thousandSeparator={true}
                    allowNegative={false}
                    suffix={' exp/h'}
                    name="expH"
                    onValueChange={(values) => handleFormattedData(values, 'expH')}/>
                </div>            

                <div className="dividers">
                    <label>Minimum Profit/h:</label>
                    <NumberFormat
                    autoComplete="off"
                    thousandSeparator={true}
                    isNumericString={true}
                    allowNegative={false}
                    suffix={' gp/h'}
                    name="profitH"
                    onValueChange={(values) => handleFormattedData(values, 'profitH')}/>
                </div>
                <div className="dividers">
                    <label>Vocation: </label>
                    <select name="vocation" className="selector" onChange={handleChange}>
                        {
                            vocationOptions.map((voc, index) => {
                                return <option key={index}>{voc}</option>
                            })
                        }
                    </select>
                </div>
                <div className="dividers">
                    <label>Team:</label>
                    <select className="selector" name="teamComp" onChange={handleChange}>
                        {teamOptions.map((team, index) => {
                        return <option>{team}</option>
                        })}
                    </select>
                </div>
                <div className="dividers">
                    <label>Difficulty:</label>
                    <select className="selector" name="difficulty" onChange={handleChange}>
                        {
                        difficultyOptions.map((Difficulty, index) => {
                            return <option key={index}>{Difficulty}</option>
                        })
                        }
                    </select>
                </div>
            </form>
            <div className="buttons__box">
                <button className="button" onClick={filterClick}>Filter</button>
            </div>
        </div>
    )
}

export default FiltersBox
