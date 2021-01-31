import React, { useState, useEffect, useRef } from 'react';
import { API_URL } from "../../config";
import axios from "axios";
import "./MyNavBar.scss";
import { NavLink } from "react-router-dom";
import useOutsideClick from "../../utils/useOutsideClick";
// Store
import { useSelector } from 'react-redux'
import { selectUser } from '../user/userSlice'
import { selectViewport } from './viewportSlice'

function MyNavBar() {
    const { width } = useSelector(selectViewport);
    const user = useSelector(selectUser);
    const { authenticated } = user;
    const ref = useRef(null);
    const [ notifications, setNotifications ] = useState();
    const [ notificationsVisible, setNotificationsVisible ] = useState(false);
    const [ newNotifications, setNewNotifications ] = useState(0)

    useOutsideClick(ref, () => {
        if (notificationsVisible) setNotificationsVisible(false);
      });

    useEffect(() => {
		refreshNotifications();
		setInterval(() => {
			refreshNotifications();
		}, 180000)
    }, [])

    useEffect(() => {
        if (notificationsVisible) {
            notificationsSeen();
        }
    }, [notificationsVisible])

    useEffect(() => {
        if (notifications && notifications.length > 0) {
            const newNotifications = notifications.filter(notification => !notification.seen)
            setNewNotifications(newNotifications.length)
        }
    }, [notifications])

    const refreshNotifications = async () => {
		try {
			const config = {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            };

            const response = await axios.get(`${API_URL}/notification`, config);
            
            if (response.status === 200) {
                setNotifications(response.data);
            }
		} catch(e) {
			console.error(e.message)
		}
    }
    const renderNotification = (notification, index) => {
        const { notificationOrigin, notificationType, notificationReference } = notification;
        
        let icon;
        switch(notificationType) {
            case 'like':
                icon = 'fas fa-thumbs-up';
                break;
            case 'dislike':
                icon = 'fas fa-thumbs-down';
                break;
            case 'comment':
                icon = 'fas fa-comment';
                break;
        }
        let notificationText = notificationOrigin === 'comment' ? 'comment' : 'hunting record'

        return (
        <a href={`http://localhost:3000/record-details/${notificationReference}`} className="notification__card" key={index}>
            <i className={icon} />
            {`You got a new ${notificationType} in your ${notificationText}`}
        </a>
        );
    }
    const notificationsSeen = async () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        };
        try {
            const response = await axios.get(`${API_URL}/notification/seen`, config);
            if ( response.status === 200 ) {
                setNewNotifications(0);
            }
        } catch(e) {
            console.error(e.message);
        }
    }
    
    const renderMenuText = (name) => {
        return width > 600 ? name : null;
    }

    return (
      
        <div id="navbar">

            <div className="section">
                <NavLink to="/profile"><i className="fas fa-user"></i>{renderMenuText('Profile')}</NavLink>
            </div>

            {
                authenticated &&
                <div className="section" onClick={() => setNotificationsVisible(!notificationsVisible)}>
                    <h5 className="/notifications"><i className="fas fa-bell"></i>{renderMenuText('Notifications')}</h5>
                    { newNotifications > 0 && <span className="newNotifications">{newNotifications}</span>}
                    <div ref={ref} className="notifications__box" style={{display: notificationsVisible ? 'block' : 'none'}}>
                        {
                            notifications &&
                            notifications.length > 0 &&
                            notifications.map((notification, index) => {
                                return renderNotification(notification, index);
                            })
                        }
                    </div>
                </div>   
            }
            
            {
                authenticated &&
                <div className="section">
                    <NavLink to="/new-hunting-record"><i className="fas fa-plus-circle"></i>{renderMenuText('New Record')}</NavLink>      
                </div>
            }

            <div className="section">
                <NavLink to="/all-records"><i className="fas fa-dragon"></i>{renderMenuText('Hunting Records')}</NavLink>  
            </div>

            <div className="contact">
                <NavLink to="/contact"><i class="far fa-address-book"></i>{renderMenuText('Contact')}</NavLink>  
            </div>

        </div>
    )
}

export default MyNavBar
