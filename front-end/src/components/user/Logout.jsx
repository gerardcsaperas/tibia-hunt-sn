import React from 'react'
import ContentBox from "../custom/ContentBox/ContentBox"

function Logout() {
    
    localStorage.clear();

    setTimeout(() => {
        window.location.href = '/'
    }, 1500)

    const content = <p>Logged out successfully, please wait.</p>

    return (
        <ContentBox
          width="270"
          title="Logout"
          content={content}
        ></ContentBox>
        )
}

export default Logout
