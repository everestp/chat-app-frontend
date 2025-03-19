import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import AppRoute from './Routes/AppRoute.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
   <Toaster/>
 <AppRoute/>
    </BrowserRouter>
    
  </StrictMode>,
)
