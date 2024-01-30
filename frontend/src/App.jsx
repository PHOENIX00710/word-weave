import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Header from './components/Header'
import SignUp from './pages/SignUp'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" Component={SignUp} />
          <Route path="/about" Component={About} />
          <Route path="/projects" Component={Projects} />
          <Route path="/dashboard" Component={Dashboard} />
        </Routes>
      </Router>
    </>
  )
}

export default App
