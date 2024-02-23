import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import Alert from '@mui/material/Alert';
import { Link, useNavigate } from 'react-router-dom'
import { app } from '../firebase/firebase.config.js';
import { FcGoogle } from "react-icons/fc";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux"
import { signInFailure, signInStart, signInSuccess } from '../features/user/userSlice.js';

function SignUp() {

  // For form of custom signup
  const [formData, setFormData] = useState({})

  // States to deal with loading and failure
  const [failure, setFailure] = useState(null)
  const [loading, setLoading] = useState(false)

  // To navigate to sign in upon succes in signup
  const navigate = useNavigate()

  // To manage GoogleAuth
  const auth = getAuth(app);

  // For google continue we will directly signin
  const dispatch = useDispatch()

  // Signing In using custom username, password by filling the form

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.username || !formData.password || !formData.email) {
      setFormData({
        "email": '',
        "username": '',
        "password": '',
      })
      return setFailure("Fill all required fields")
    }
    try {
      setFailure(null)
      setLoading(true)
      const req = await fetch('/api/v1/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) // HTTP only handles text data
      })
      const data = await req.json()
      if (data.success == false)
        return setFailure("Error in signup. Try Again later!!")
    }
    catch (e) {
      setFailure(e)
    }
    setFormData({
      "email": '',
      "username": '',
      "password": '',
    })
    setLoading(false)
    navigate("/signin")
  }

  const handleChange = (e) => {
    const input = e.target.id
    const val = e.target.value.trim() //.trim() to get rid of useless white spaces at start
    const temp = ({ ...formData, [input]: val }) // Make sure u are using an object and not an
    // array else it will append instead of overwriting
    setFormData(temp)
  }

  //Signing using Google Firebase

  const googleAuth = async (e) => {
    e.preventDefault()
    const provider = new GoogleAuthProvider()

    // To always ask user for account preference
    provider.setCustomParameters({
      prompt: 'select_account'
    })

    try {
      dispatch(signInStart())
      const result = await signInWithPopup(auth, provider)
      // Submit data for database
      try {
        const res = await fetch("/api/v1/google", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              email: result.user.email,
              name: result.user.displayName,
              image: result.user.photoURL,
            }
          )
        })
        const data = await res.json()
        if (data.success == false) {
          dispatch(signInFailure())
          return setFailure(data.message)
        }
        dispatch(signInSuccess({
          email: data.sendInfo.email,
          id: data.sendInfo._id,
          username: data.sendInfo.username,
          photoURL: data.sendInfo.photoURL ? data.sendInfo.photoURL : "https://cdn.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.webp",
        }))
      }
      catch (error) {
        return setFailure(error.message)
      }
    }
    catch (error) {
      const errorMessage = error.message
      return setFailure(errorMessage)
    }
    navigate("/home")
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
              id="username"
              label="Username"
              type="username"
              autoComplete="current-username"
              variant="standard"
              color='warning'
              sx={{
                width: "300px"
              }}
              value={formData.username}
              onChange={handleChange}
            />
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
            {/* Sign up Button */}

            {
              !loading &&
              <Button variant="contained"
                color='warning'
                onClick={handleSubmit}
                disabled={loading}

              >
                SIGN UP
              </Button>
            }

            {/* Google Login */}

            <Button
              variant="outlined"
              color='warning'
              endIcon={<FcGoogle />}
              onClick={googleAuth}
            >
              Continue With Google
            </Button>

            <p className='flex justify-between'>
              <i>Already signed up? </i>
              <Link to={"/signin"} className=' text-teal-500'>Sign In</Link>
            </p>
          </form>
          {/* Alert Section */}

          {
            failure &&
            <Alert
              severity="error"
              sx={{
                marginTop: "1.12rem"
              }}
            >
              {failure}
            </Alert>
          }
        </section>
      </div>
    </div>
  )
}

export default SignUp