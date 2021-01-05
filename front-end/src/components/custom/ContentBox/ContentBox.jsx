import React from 'react'
import './ContentBox.scss';

function ContentBox(props) {

    const frameHeight = `${parseInt(props.height.split('px')[0]) - 40}px`;

    return (
        <div className="ContentBox" style={{height: props.height, width: props.width}}>
            <div className="ContentBox__title">
                <h3>{props.title}</h3>
            </div>
            <div className="ContentBox__frame" style={{height: frameHeight}}>
                <div className="ContentBox__content">{props.content}</div>
            </div>
        </div>
    )
}

export default ContentBox
