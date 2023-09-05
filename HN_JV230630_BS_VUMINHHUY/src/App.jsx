import { useState } from 'react'
import Index from './Components/Index'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Index />
    </>
  )
}

export default App
