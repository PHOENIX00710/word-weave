import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function ProfileSidebar() {

    const userDetails = useSelector(state => state.user.userDetails)
    return (
        <div className='tablet:min-h-screen tablet:w-1/4 bg-slate-200 flex flex-col gap-4 p-4'>
            <Link to={"/profile"}>
                <div className='bg-white hover:bg-slate-400 flex justify-between items-center p-3 rounded-md w-full'>
                    <section>Profile</section>
                    <section className='bg-slate-800 text-white font-medium px-3 py-1 rounded-lg'>{userDetails.username}</section>
                </div>
            </Link>
            <Link to={"/signout"} className='p-3 bg-white hover:bg-slate-500 rounded-md'>Signout</Link>
        </div>
    )
}

export default ProfileSidebar