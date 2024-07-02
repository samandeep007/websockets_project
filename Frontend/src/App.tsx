import { useState, useEffect } from 'react'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null) //Can either be a WebSocket or null
  const [latestMessage, setLatestMessage] = useState<string>("");

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')  //WebSocket comes from the browser

    ws.onopen = () => {
      console.log('Connected to server');
      setSocket(ws)
    }

    ws.onmessage = (message) => {
      console.log('Received:', message.data);
      setLatestMessage(message.data)
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
