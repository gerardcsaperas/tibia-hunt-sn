import React, { useState, useEffect, useRef } from 'react'
import './ContentBox.scss';

// Redux Store
import { useSelector } from 'react-redux'
import { selectViewport } from '../../layout/viewportSlice'

function ContentBox(props) {  

    // Variable to continuously store viewport dimensions to redux
    const windowDimensions = useSelector(selectViewport);
    const desktopComponent = (
        <div className="ContentBox" style={{width: windowDimensions.width > parseInt(props.width) ? parseInt(props.width) : '90%'}}>
            <div className="ContentBox__title">
                <h3>{props.title}</h3>
            </div>
            <div className="ContentBox__frame">
                <div className="ContentBox__content">{props.content}</div>
            </div>
        </div>
    )

    const mobileComponent = (
        <h1 style={{color: "white"}}>Hi! I'm mobile, motherfucker! Reactive! Boooyah!</h1>
    )

    return desktopComponent;
}

export default ContentBox
