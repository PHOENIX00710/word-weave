import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signOutFailure, signOutStart, signOutSuccess } from '../features/user/userSlice'
import { Navigate, useNavigate } from 'react-router-dom'

function Signout() {

    const userDetails = useSelector((state) => state.user.userDetails)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const signOutHandler = async () => {
            console.log("I am here");
            dispatch(signOutStart())
            try {
                let req = await fetch("/api/v1/signout", {
                    method: 'GET',
                    headers: {
                        'Content-Type': "application/json"
                    }
                })
                let data = await req.json()
                console.log(data);
                if (data.success != true) {
                    console.log("Here Too");
                    dispatch(signOutFailure())
                    navigate("/home")
                    return
                }
                dispatch(signOutSuccess(null))
                navigate("/")
            }
            catch (error) {
                console.log(error);
                dispatch(signOutFailure())
            }
        }
        signOutHandler()
    })

    return (
        <>
            <div
                className='min-h-screen flex justify-center items-center'
            >
                <div className='h-48 w-48 text-3xl text-orange-950 flex jsutify-center items-center'>
                    Signing Out!!
                </div>
            </div>
        </>
    )
}

export default Signout