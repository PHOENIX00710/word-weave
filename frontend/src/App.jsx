import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import Signout from './components/Signout'
import AdminOnlyPrivate from './components/private_Routes/AdminOnlyPrivate'
import CreatePost from './components/posts/CreatePost'
import PrivateRoute from './components/private_Routes/PrivateRoute'
import { Dashboard } from '@mui/icons-material'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path="/signout" element={<Signout />} />
          <Route element={<AdminOnlyPrivate />}>
            <Route path='create-post' element={<CreatePost />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path='/home' element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App


// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './pages/Home';
// import Header from './components/Header';
// import SignUp from './pages/SignUp';
// import SignIn from './pages/SignIn';
// import Footer from './components/Footer';
// import Profile from './pages/Profile';
// import Signout from './components/Signout';
// import AdminOnlyPrivate from './components/private_Routes/AdminOnlyPrivate';
// import CreatePost from './components/posts/CreatePost';
// import PrivateRoute from './components/private_Routes/PrivateRoute';
// import Dashboard from './pages/Dashboard'; // Assuming Dashboard is a page and not an icon

// function App() {
//   return (
//     <>
//       <Router>
//         <Header />
//         <Routes>
//           <Route path='/' element={<SignUp />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path='/signin' element={<SignIn />} />
//           <Route path="/signout" element={<Signout />} />
//           <Route path='/create-post' element={<AdminOnlyPrivate><CreatePost /></AdminOnlyPrivate>} />
//           <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
//           <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
//           <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
//         </Routes>
//         <Footer />
//       </Router>
//     </>
//   )
// }

// export default App;
