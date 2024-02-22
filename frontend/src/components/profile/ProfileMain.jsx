import { TextField, Button } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

function ProfileMain() {

    const userDetails = useSelector((state) => state.user.userDetails)
    console.log(userDetails);

    return (
        <div className='w-full flex justify-center items-center min-h-screen mb-8 p-4'>
            <form action="/" method='PUT' className=' tablet:w-1/3 flex justify-center flex-col gap-8'>
                <h1 className='text-center text-3xl font-bold'>PROFILE</h1>
                <input type="file" name="" id="" className='m-auto w-64' />
                <div className='w-32 h-32 border-4 border-slate-600 rounded-full flex justify-center items-start overflow-hidden m-auto'>
                    <img src={`${userDetails.photoURL}`} className='rounded-full w-full h-full object-cover' alt="" />
                </div>
                <TextField
                    id='Username'
                    variant='filled'
                    value={userDetails?.username}
                />
                <TextField
                    id='Password'
                    label='Password'
                    variant='filled'
                />
                <Button
                    variant='contained'
                    color='warning'
                >
                    Save Changes
                </Button>
                <div id='extra-options' className='flex justify-between'>
                    <Link to={"/removeUser"}>
                        <section className='text-red-700 italic font-medium cursor-pointer hover:text-red-900'>Delete User</section>
                    </Link>
                    <Link to={"/signout"}>
                        <section className='text-red-700 italic font-medium cursor-pointer hover:text-red-900'>Sign Out</section>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default ProfileMain