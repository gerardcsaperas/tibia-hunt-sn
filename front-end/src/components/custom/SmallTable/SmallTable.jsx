import React from 'react'
import './SmallTable.scss'

function SmallTable(props) {

    const differentEvenOdd = (index) => (index % 2 > 0 ? '#E1D8C6' : '#F5EFE4') 
    
    const rows = props.data.map( (row, index) =>
        <div className="SmallTable-row" style={{background: differentEvenOdd(index)}}>
            {row.map( string => {
                if (string.length > 10) {
                    return <p>{`${string.slice(0, 7)}...`}</p>
                } else {
                    return <p>{string}</p>
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
