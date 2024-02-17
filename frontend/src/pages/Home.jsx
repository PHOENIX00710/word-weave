import React from 'react'
import { useDispatch, useSelector } from "react-redux"

function Home() {
  const userDetails = useSelector((state) => state.userDetails);
  return (
    <div>Hi,{userDetails.username}</div>
  )
}

export default Home