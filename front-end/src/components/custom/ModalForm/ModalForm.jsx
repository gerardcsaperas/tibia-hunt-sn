import React, { useRef, useEffect } from 'react'
import './ModalForm.scss'


function ModalForm(props) {

    //HERE PENDING CLOSE ON OUTSIDE CLICK 
    const wrapperRef = useRef(null);

    return (
        <div className="ModalFormBg">
            <div className="ModalForm" ref={wrapperRef}>
                <div className="ModalForm__title">
                    <h3>{props.title}</h3>
                </div>
                <div className="ModalForm__frame">
                    <div className="ModalForm__content">{props.content}</div>
                </div>
            </div>
        </div>
    )
}

export default ModalForm
