import React from 'react'
import SignUp from './components/SignUp'
import { Route, Routes } from 'react-router-dom'
import LogIn from './components/LogIn'
import Home from './components/Home'
import Admin from './components/Admin'
import AddEvent from './components/AddEvent'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/SignUp' element={<SignUp/>}></Route>
        <Route path='/LogIn' element={<LogIn/>}></Route>
        <Route path='/Admin' element={<Admin/>}></Route>
        <Route path='/Addevent' element={<AddEvent/>}></Route>
      </Routes>
      
    </div>
  )
}

export default App