import React, { useState, useEffect } from 'react'
import './ContentBox.scss';

// Redux Store
import { useSelector } from 'react-redux'
import { selectViewport } from '../../layout/viewportSlice'

function ContentBox(props) {  

    const windowDimensions = useSelector(selectViewport);

    const height = parseInt(props.height);
    const frameHeight = height - 40;
    const contentBoxHeight = frameHeight - 8;
    const width = parseInt(props.width);
    const contentBoxWidth = width - 8

    const desktopComponent = (
        <div className="ContentBox" style={{height: height, width: width}}>
            <div className="ContentBox__title">
                <h3>{props.title}</h3>
            </div>
            <div className="ContentBox__frame" style={{height: frameHeight, width: width}}>
                <div className="ContentBox__content" style={{height: contentBoxHeight, width: contentBoxWidth}}>{props.content}</div>
            </div>
        </div>
    )

    const mobileComponent = (
        <h1 style={{color: "white"}}>Hi! I'm mobile, motherfucker! Reactive! Boooyah!</h1>
    )

    return windowDimensions.width > 700 ? desktopComponent : mobileComponent;
}

export default ContentBox
