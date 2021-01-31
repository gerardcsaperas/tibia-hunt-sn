import React from 'react'
import './FormBox.scss';

// Redux Store
import { useSelector } from 'react-redux'
import { selectViewport } from '../../layout/viewportSlice'

function FormBox({ title, imgSrc, form, className}) {

    return (
        <div className={`FormBox ${className}`}>
            <h1>{title}</h1>
            { imgSrc && <img className="box-icon" src={imgSrc}/> }
            {form}
        </div>
    )
}



export default FormBox
