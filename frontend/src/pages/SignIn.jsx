import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import Alert from '@mui/material/Alert';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { signInFailure, signInStart, signInSuccess } from '../features/user/userSlice';

function SignIn() {

  const userDetails = useSelector(state => state.user.userDetails);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const dispatch = useDispatch()
  const navigate = useNavigate() // To navigate to homme upon succes in signin

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.password || !formData.email) {
      setFormData({
        "email": '',
        "password": '',
      })
      return dispatch(signInFailure("Please Enter both Username and Password"))
    }
    try {
      dispatch(signInStart())
      const req = await fetch('http://localhost:3000/api/v1/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) // HTTP only handles text data
      })
      const data = await req.json()
      if (data.success == false)
        return dispatch(signInFailure("Error in signup. Try Again later!!"))
      dispatch(signInSuccess({
        email: data.sendInfo.email,
        id: data.sendInfo._id,
        username: data.sendInfo.username,
        photoURL: data.sendInfo.photoURL ? data.sendInfo.photoURL : "https://cdn.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.webp",
      }))
    }
    catch (e) {
      return dispatch(signInFailure(e.message))
    }
    setFormData({
      "email": '',
      "password": '',
    })
    navigate("/home")
  }

  const handleChange = (e) => {
    const input = e.target.id
    const val = e.target.value.trim()
    const temp = ({ ...formData, [input]: val })
    setFormData(temp)
  }


  return (
    <div className='h-screen flex justify-center '>
      <div id="container" className=' flex flex-col gap-4 items-center tablet:flex-row tablet:gap-14 p-8 basis-1/2 '>
        <section id='left-side' className='p-4 items-center tablet:items-start flex flex-col gap-6 justify-center h-full'>
          <div id='logo' className={`text-white bg-gradient-to-r from-orange-400 via-red-500 to-red-700 w-fit font-bold px-3 py-1 rounded-md  flex justify-center items-center h-auto`}>
            <span className=''><span className={`text-4xl md:text-6xl`}>W</span><span className={`text-2xl md:text-4xl`}>ord</span></span>
            <span className=''><span className={`text-4xl md:text-6xl`}>W</span><span className={`text-2xl md:text-4xl`}>eave</span></span>
          </div>
          <h3>WordWeave is a blogging web app offering custom profiles, post creation, and community engagement features for bloggers seeking to share their thoughts and interact with a like-minded audience.</h3>
        </section>
        <section id='right-side'>
          <form action="" method='POST' className='flex flex-col gap-5  '>
            <TextField
              id="email"
              label="Email"
              type="email"
              autoComplete="current-email"
              variant="standard"
              color='warning'
              value={formData.email}
              helperText="We'll never share your email."
              onChange={handleChange}
              sx={{
                width: "300px",
              }}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
              color='warning'
              value={formData.password}
              onChange={handleChange}
            />
            {/* Loader */}

            {/* Sign up Button */}
            <Button variant="contained"
              color='warning'
              onClick={handleSubmit}
              disabled={userDetails ? true : false}
            >
              SIGN IN
            </Button>
            <p className='flex justify-between'>
              <em>New User? </em>
              <Link to={"/signup"} className=' text-teal-500'>Register</Link>
            </p>
          </form>
          {/* Alert Section */}
          {
            userDetails &&
            <Alert
              severity="error"
              sx={{
                marginTop: "1.12rem"
              }}
            >
              {userDetails.error}
            </Alert>
          }
        </section>
      </div>
    </div>
  )
}

export default SignIn