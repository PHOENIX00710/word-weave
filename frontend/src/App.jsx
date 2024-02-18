import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Header from './components/Header'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Footer from './components/Footer'
import Profile from './pages/Profile'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' Component={SignUp} />
          <Route path='/home' Component={Home} />
          <Route path="/signup" Component={SignUp} />
          <Route path='/signin' Component={SignIn} />
          <Route path="/about" Component={About} />
          <Route path="/profile" Component={Profile} />
          <Route path="/dashboard" Component={Dashboard} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
