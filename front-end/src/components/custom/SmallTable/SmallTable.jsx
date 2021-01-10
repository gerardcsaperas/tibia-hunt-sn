import React from 'react'
import './SmallTable.scss'

function SmallTable(props) {

    const differentEvenOdd = (index) => (index % 2 > 0 ? '#E1D8C6' : '#F5EFE4') 
    
    if (!props.data || props.data.length === 0) {
        return null;
    }

    const rows = props.data.map( (row, index) =>
        <div key={index} className="SmallTable-row" style={{background: differentEvenOdd(index)}}>
            {row.map( (string, index) => {
                if (string.length > 10) {
                    return <p key={index}>{`${string.slice(0, 7)}...`}</p>
                } else {
                    return <p key={index}>{string}</p>
                }
                
            })}
        </div>
    )

    return (
        <div className="SmallTable">
            <h4 className="SmallTable-title">{props.title}</h4>
            {rows}
        </div>
    )
}

export default SmallTable
