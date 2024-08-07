import { useState, useEffect } from 'react'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null) //Can either be a WebSocket or null
  const [latestMessage, setLatestMessage] = useState<string>("");
  const[message, setMessage] = useState<string>("");

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')  //WebSocket comes from the browser

    ws.onopen = () => { //This function runs when the WebSocket connection is opened
      console.log('Connected to server');
      setSocket(ws)
    }

    ws.onmessage = (message) => { //This function runs when the WebSocket receives a message
      console.log('Received:', message.data);
      setLatestMessage(message.data)
    }

    return () => { //This is the cleanup function that runs when the component is unmounted or the WebSocket is closed --> unmounted means the component is removed from the DOM
      ws.close()
    }

  }, [])


  if (!socket) {
    return <>
      <h1>Connecting to the WebSocket server</h1>
    </>
  }


  return (
      <>
        {latestMessage ? <h1> Latest message: {latestMessage} </h1> : null}

        <input type="text" onChange={(e) => setMessage(e.target.value)}/>
        <button onClick={() => socket.send(message)}>Send Message</button>
        </>

      
    )
}

export default App
