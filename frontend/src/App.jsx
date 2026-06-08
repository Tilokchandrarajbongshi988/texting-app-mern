import './index.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import { Route, Routes, Navigate} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext'



function App() {
  const {authUser} = useAuthContext();
  return <div className='p-4 h-screen flex items-center justify-center '>
    <Routes>
      <Route path='/' element ={authUser ? <Home/> : <Navigate to={"/login"}/>}/>
      <Route path='/login' element ={authUser ? <Navigate to='/'/> : <Login/>}/>
      <Route path='/signup' element ={authUser ? <Navigate to='/'/> : <SignUp/>}/>
    </Routes>
    <Toaster/>
  </div>
}

export default App
/*
ROUTING LOGIC:

React Router looks at the current URL and finds
the matching route.

authUser determines whether the user is logged in.

Route "/":
- If authUser exists -> render Home
- If authUser is null -> redirect to Login

Route "/login":
- If authUser exists -> redirect to Home
- If authUser is null -> render Login page

Route "/signup":
- If authUser exists -> redirect to Home
- If authUser is null -> render Signup page

Purpose:
- Prevent unauthenticated users from accessing protected pages
- Prevent logged-in users from seeing login/signup pages

<Navigate /> performs the redirect.
element={} specifies what should be rendered for a route.
*/
/*
APP AUTHENTICATION FLOW

App starts
    ↓
AuthContext provides authUser
    ↓

authUser exists?
    ↓

YES ------------------> User is logged in
 |                          |
 |                          ├─ "/" → Home
 |                          ├─ "/login" → redirect to "/"
 |                          └─ "/signup" → redirect to "/"
 |
 NO ------------------> User is not logged in
                            |
                            ├─ "/" → redirect to "/login"
                            ├─ "/login" → Login page
                            └─ "/signup" → Signup page

When logout occurs:
    ↓
setAuthUser(null)
    ↓
Context updates
    ↓
App re-renders
    ↓
Protected routes become inaccessible
    ↓
User is redirected to Login page
*/