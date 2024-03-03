import React, { useEffect, useState } from 'react'
import ProfileSidebar from '../components/profile/ProfileSidebar'
import ProfileMain from '../components/profile/ProfileMain'
import { useLocation } from 'react-router-dom'
import AllPosts from '../components/posts/AllPosts'

function Profile() {

  const location = useLocation()
  const [tab, setTab] = useState()
  useEffect(() => {
    // We use location.search to search for queries
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.has('tab')) {
      setTab(urlParams.get('tab'))
    }
  }, [location.search])

  // We use locaton.search in useEffect to render different components based on tabs

  return (
    <div className='flex flex-col tablet:flex-row'>
      <ProfileSidebar />
      <>
        {tab === "main" && < ProfileMain />}
        {tab === "allPosts" && <AllPosts />}
      </>
    </div>
  )
}

export default Profile