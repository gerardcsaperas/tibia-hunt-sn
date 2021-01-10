import React from 'react'
import './FormBox.scss';


function FormBox(props) {
    return (
        <div className="FormBox">
            {props.form}
        </div>
    )
}



export default FormBox
