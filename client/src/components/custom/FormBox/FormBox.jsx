import React from 'react'
import './FormBox.scss';

function FormBox({ title, imgSrc, form, className}) {

    return (
        <div className={`FormBox ${className}`}>
            <h1>{title}</h1>
            { imgSrc && <img className="box-icon" src={imgSrc} alt="box-icon"/> }
            {form}
        </div>
    )
}



export default FormBox
