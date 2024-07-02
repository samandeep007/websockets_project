# Websockets in React Client using ws

In this guide, we will explore how to implement websockets in a React client using the `ws` library. Websockets allow real-time communication between the client and the server, enabling bidirectional data transfer.

## Installation

To get started, we need to install the `ws` library. Open your terminal and navigate to the root directory of your React project. Run the following command:

```bash
npm install ws
```

## Setting up the WebSocket connection

In your React component, import the `WebSocket` class from the `ws` library:

```javascript
import WebSocket from 'ws';
```

Next, create a new instance of the WebSocket class and establish a connection to the server:

```javascript
const socket = new WebSocket('ws://localhost:8080');
```

Replace `'ws://localhost:8080'` with the URL of your WebSocket server.

## Handling WebSocket events

The WebSocket class provides several event listeners that allow you to handle different events. Here are some commonly used ones:

- `open`: Triggered when the WebSocket connection is successfully established.
- `message`: Triggered when a message is received from the server.
- `close`: Triggered when the WebSocket connection is closed.

You can add event listeners to the WebSocket instance like this:

```javascript
socket.addEventListener('open', () => {
  console.log('WebSocket connection established');
});

socket.addEventListener('message', (event) => {
  console.log('Received message:', event.data);
});

socket.addEventListener('close', () => {
  console.log('WebSocket connection closed');
});
```

## Sending messages to the server

To send messages to the server, you can use the `send` method of the WebSocket instance:

```javascript
socket.send('Hello server!');
```

## Closing the WebSocket connection

To close the WebSocket connection, you can use the `close` method:

```javascript
socket.close();
```

## Putting things together
```javascript
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

```

## Conclusion

In this guide, we learned how to implement websockets in a React client using the `ws` library. We covered setting up the WebSocket connection, handling events, sending messages, and closing the connection. With websockets, you can create real-time applications that provide a seamless user experience.
