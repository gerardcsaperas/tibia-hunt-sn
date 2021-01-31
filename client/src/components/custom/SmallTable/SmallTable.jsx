import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import './SmallTable.scss'

function SmallTable(props) {

    const differentEvenOdd = (index) => (index % 2 > 0 ? '#E1D8C6' : '#F5EFE4') 
    
    useEffect(() => {
        console.log(props.icons)
    }, [props.icons])

    if (!props.data || props.data.length === 0) {
        return null;
    }

    const style = {
        marginTop: props.marginTop || "10px"
    }

    const rows = props.data.map( (row, index) =>
        <div
            key={index}
            className="SmallTable-row"
            style={{
                cursor: props.rowCursor || 'auto',
                background: differentEvenOdd(index)
            }}>
            {row.map( (string, index) => {
                if (index < 3 ) {
                    return <p key={index}>{string}</p>
                }
            })}
            { props.icons && props.icons.length > 0 && (
                props.icons.map((icon, index) => {
                    return <Link to={`characters/edit/${row[3]}`} key={index}><i className={icon} /></Link>
                })
            )}
        </div>
    )

    return (
        <div className="SmallTable" style={style}>
            <h4 className="SmallTable-title">{props.title}</h4>
            {rows}
        </div>
    )
}

export default SmallTable
