# Web Sockets

WebSockets is a communication protocol that provides full-duplex communication channels over a single TCP connection. It enables real-time, bi-directional communication between a client and a server, allowing them to send messages to each other without the need for constant polling. With WebSockets, developers can build interactive web applications, chat applications, real-time dashboards, collaborative editing tools, and much more. It offers a more efficient and scalable alternative to traditional HTTP-based communication methods. WebSockets are supported by most modern web browsers and can be implemented using various programming languages and frameworks.


## Use Cases of Web Sockets

Web Sockets can be used in various scenarios where real-time, bi-directional communication is required. Some common use cases include:

1. **Chat Applications**: Web Sockets enable instant messaging and real-time chat applications, allowing users to send and receive messages without refreshing the page.

2. **Real-time Dashboards**: Web Sockets can be used to create dynamic dashboards that display real-time data updates, such as stock prices, analytics, or monitoring systems.

3. **Collaborative Editing Tools**: Web Sockets facilitate real-time collaboration in editing tools, allowing multiple users to work on the same document simultaneously.

4. **Multiplayer Games**: Web Sockets enable real-time communication between players in multiplayer games, providing a seamless gaming experience.

5. **Live Notifications**: Web Sockets can be used to deliver instant notifications to users, such as social media updates, email notifications, or system alerts.

6. **IoT Applications**: Web Sockets can be utilized in Internet of Things (IoT) applications to enable real-time communication between devices and servers.

7. **Live Streaming**: Web Sockets can be used to stream audio, video, or other media content in real-time, providing a smooth and uninterrupted streaming experience.

These are just a few examples of how Web Sockets can be applied. The flexibility and efficiency of Web Sockets make them a powerful tool for building interactive and real-time web applications.

## Implementing WebSockets in Express

To implement WebSockets in an Express application, you can use the `ws` library, which provides a WebSocket server implementation. Here's an example of how you can get started:

1. Install the `ws` library by running the following command in your project directory:

```bash
npm install ws
```

2. In your Express application, require the `ws` library and create an HTTP server instance:

```javascript
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
// const server = app.listen(8080) --> another way
const wss = new WebSocket.Server({ server });

// Your Express routes and middleware

// WebSocket server logic
wss.on('connection', (ws) => {
    // Handle WebSocket connection
    ws.on('message', (message) => {
         // Handle incoming WebSocket messages
    });

    ws.on('close', () => {
         // Handle WebSocket disconnection
    });
});

// Start the server
const port = 3000;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
```

3. You can now handle WebSocket connections, messages, and disconnections inside the `wss.on('connection', ...)` event listener. You can perform any necessary logic based on the received messages and send responses back to the clients.

```javascript
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
         // Handle incoming WebSocket messages
         console.log(`Received message: ${message}`);

         // Send a response back to the client
         ws.send('Hello from the server!');
    });

    ws.on('close', () => {
         // Handle WebSocket disconnection
         console.log('WebSocket disconnected');
    });
});
```

4. To establish a WebSocket connection from the client-side, you can use the `WebSocket` object provided by the browser's JavaScript API:

```javascript
const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', () => {
    // WebSocket connection is open
    console.log('WebSocket connected');
});

socket.addEventListener('message', (event) => {
    // Handle incoming WebSocket messages
    console.log(`Received message from server: ${event.data}`);
});

socket.addEventListener('close', () => {
    // WebSocket connection is closed
    console.log('WebSocket disconnected');
});
```

This is a basic example of how you can implement WebSockets in an Express application using the `ws` library. You can further customize and extend the functionality based on your specific requirements.




## Checking if Message is Binary in `.on('message')`

To check if a WebSocket message is binary in the `.on('message')` event listener, you can use the `isBinary` property of the message event object. Here's an example:

```javascript
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        if (ws.isBinary) {
            // Handle binary message
            console.log('Received binary message');
        } else {
            // Handle text message
            console.log('Received text message');
        }
    });

    ws.on('close', () => {
        // Handle WebSocket disconnection
        console.log('WebSocket disconnected');
    });
});
```

In the above example, we check the `isBinary` property of the `ws` object to determine if the received message is binary or text. If `isBinary` is `true`, it means the message is binary, and if it's `false`, it means the message is text.

You can then perform the necessary logic based on the type of message received.

Remember to customize the logic inside the `if` and `else` blocks according to your specific requirements.

I hope this helps! Let me know if you have any further questions.


## Broadcasting Messages to All Clients

To broadcast a message to all connected clients in a WebSocket server, you can iterate over each client and send the message using the `send` method. Here's an example:

```javascript
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        // Handle incoming WebSocket messages
        console.log(`Received message: ${message}`);

        // Broadcast the message to all clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        // Handle WebSocket disconnection
        console.log('WebSocket disconnected');
    });
});
```

In the above example, the `wss.clients` property returns a `Set` object containing all connected clients. You can use the `forEach` method to iterate over each client and check if its `readyState` is `WebSocket.OPEN` before sending the message. This ensures that the message is only sent to clients that are still connected.

Remember to customize the logic inside the `forEach` loop according to your specific requirements.



## Real-Life Use Case of `forEach` with `client`

One real-life use case of using `forEach` with `client` in a WebSocket server is when you want to send a specific message to a subset of connected clients based on certain criteria.

For example, let's say you have a chat application where users can join different chat rooms. When a user sends a message in a specific chat room, you want to broadcast that message only to the clients connected to that particular chat room.



## Additional Resources

If you want to learn more about implementing WebSockets in an Express application, you can refer to the official documentation of the `ws` library on GitHub. The documentation provides detailed information on how to use the library and includes examples and code snippets to help you get started.

Here is the link to the `ws` library documentation on GitHub: [ws GitHub Documentation](https://github.com/websockets/ws)

Make sure to explore the documentation to gain a deeper understanding of the library and its features. It will provide you with valuable insights and guidance for implementing WebSockets effectively in your Express application.

