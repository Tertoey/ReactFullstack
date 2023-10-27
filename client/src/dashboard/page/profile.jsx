import React from 'react'
import Navbar from '../component/nav_bar'
import Userprofile from '../component/profile/userprofile'

function Profile() {
  return (
    <div className='flex'>
        <Navbar/>
        <main className="bg-gray-200 flex-1">
        <Userprofile/>
        </main>
    </div>
  )
}

export default Profile