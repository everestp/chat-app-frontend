import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import toast, { Toaster } from 'react-hot-toast'
import JoinCreateChat from './components/JoinCreateChat'

function App() {
  const [count, setCount] = useState(0)
  const btnClick = ()=>{
    toast.success("This is the event hander for the button and this clicked")
    toast.error("This is the error message to displayed")
  }

  return (
  <>
<JoinCreateChat/>
  </>
  )
}

export default App
