import React from 'react'
import SignUp from './components/SignUp'
import { Route, Routes } from 'react-router-dom'
import LogIn from './components/LogIn'
import Home from './components/Home'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/SignUp' element={<SignUp/>}></Route>
        <Route path='/LogIn' element={<LogIn/>}></Route>
      </Routes>
      
    </div>
  )
}

export default App