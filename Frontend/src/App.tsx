import { useState, useEffect } from 'react'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')  //WebSocket comes from the browser

    ws.onopen = () => {
      console.log('Connected to server');
      setSocket(ws)
    }

    ws.onmessage = (message) => {
      console.log('Received:', message.data);
    }

  }, [])


  if (!socket) {
    return <>
      <h1>Connecting to the WebSocket server</h1>
    </>
  }


  return (
    <>

    </>
  )
}

export default App
