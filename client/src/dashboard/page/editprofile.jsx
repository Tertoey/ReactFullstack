import React from 'react'
import Navbar from '../component/nav_bar'
import Editprofile from '../component/profile/editprofile'

function Profile() {
  return (
    <div className='flex'>
        <Navbar/>
        <main className="bg-gray-200 flex-1">
        <Editprofile/>
        </main>
    </div>
  )
}

export default Profile