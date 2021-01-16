import React from 'react'

function Logout() {
    
    localStorage.clear();

    setTimeout(() => {
        window.location.href = '/'
    }, 1500)

    return (
        <div>
            <p>Logged out successfully.</p>
        </div>
    )
}

export default Logout
