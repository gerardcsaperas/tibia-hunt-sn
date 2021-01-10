import React, { useState, useEffect, useRef } from 'react'
import ScaleLoader from "react-spinners/ScaleLoader";
import './ContentBox.scss';

// Redux Store
import { useSelector } from 'react-redux'
import { selectViewport } from '../../layout/viewportSlice'

function ContentBox(props) {  

    // Variable to continuously store viewport dimensions to redux
    const windowDimensions = useSelector(selectViewport);
    
    /*
    Minimum height is defined at 500px.
    The box automatically detects height in order to style
    other elements.
    */
   const contentBox = useRef();
    const [ frameHeight, setFrameHeight ] = useState('auto');

    useEffect(() => {
        if (contentBox.current) {
            setFrameHeight(contentBox.current.clientHeight + 8);
        }
    }, [contentBox])

    // Width can be hard coded just fine
    const width = parseInt(props.width);
    const contentBoxWidth = width - 8

    const desktopComponent = (
        <div className="ContentBox" style={{width: width}}>
            <div className="ContentBox__title">
                <h3>{props.title}</h3>
            </div>
            <div className="ContentBox__frame" style={{height: frameHeight, width: width}}>
                <div className="ContentBox__content" ref={contentBox} style={{minHeight: 430, width: contentBoxWidth}}>{props.content}</div>
            </div>
        </div>
    )

    const mobileComponent = (
        <h1 style={{color: "white"}}>Hi! I'm mobile, motherfucker! Reactive! Boooyah!</h1>
    )

    return windowDimensions.width > 700 ? desktopComponent : mobileComponent;
}

export default ContentBox
