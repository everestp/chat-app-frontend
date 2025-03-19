import React from 'react'
import { Router,Routes,Route } from 'react-router'
import App from '../App'
import Chatpage from '../pages/Chatpage'
const AppRoute = () => {
  return (
    <div>
     <Routes>
     <Route path='/' element={<App/>}/>
     <Route path='/chat' element={<Chatpage/>}/>
    </Routes>
    </div>
  )
}

export default AppRoute