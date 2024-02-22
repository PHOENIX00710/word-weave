import React from 'react'
import ProfileSidebar from '../components/profile/ProfileSidebar'
import ProfileMain from '../components/profile/ProfileMain'

function Profile() {
  return (
    <div className='flex flex-col tablet:flex-row'>
      <ProfileSidebar/>
      < ProfileMain />
    </div>
  )
}

export default Profile