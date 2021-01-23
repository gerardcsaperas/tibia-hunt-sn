import React from 'react'
import './FormBox.scss';


function FormBox({ title, imgSrc, form, width, margin}) {

    const style = {
        width: width && (width),
        margin: margin && (margin)
    }

    return (
        <div className="FormBox" style={style}>
            <h1>{title}</h1>
            <img className="box-icon" src={imgSrc}/>
            {form}
        </div>
    )
}



export default FormBox
