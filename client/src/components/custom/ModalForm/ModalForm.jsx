import React, { useRef, useEffect } from 'react';
import useOutsideClick from '../../../utils/useOutsideClick';
import './ModalForm.scss'


function ModalForm(props) {

    const { modalForm, setModalForm } = props;
    const ref = useRef(null);

    useOutsideClick(ref, () => {
        if (props.modalForm) setModalForm(false);
    });

    return (
        <div className="ModalFormBg">
            <div className="ModalForm" ref={ref}>
                <div className="ModalForm__title">
                    <h3>{props.title}</h3>
                </div>
                <div className="ModalForm__frame">
                    <div className="ModalForm__content">
                        { props.content }
                        { props.success ? <p style={{textAlign: "center"}}><i className="fas fa-check success" style={{marginRight: "10px"}}></i>Profile saved successfully</p> : null }
                        { props.error ? <p className="error" style={{textAlign: "center"}}>Alas! Brave adventurer, there was an error updating your profile. Please try again later.</p> : null }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalForm
