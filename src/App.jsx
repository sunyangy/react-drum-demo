import { useState } from 'react'
import Drum from './components/Drum'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Drum/>
    </>
  )
}

export default App
