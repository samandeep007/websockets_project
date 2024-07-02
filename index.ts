import WebSocket, { WebSocketServer } from 'ws'; // import WebSocket module
import http from 'http'; // import http module --> whenever you're creating a websocket server, you need to create an http server first

//The first request the client makes is to the http server, and then the server upgrades the connection to a websocket connection
//So, the http server is the entry point for the websocket server

// browser --> http server --> websocket server --> browser

// you can do the same thing with express

const server = http.createServer((req, res) => {
    console.log(new Date() + ' Received request for ' + req.url);
    res.end('Hello World'); //res.end will send response to client
}); // create http server


const wss = new WebSocketServer({ server }); // create WebSocket server


wss.on('connection', (ws) => { // when a client connects --> .on is an event listener 

    let userCount = wss.clients.size; // get the number of users connected

    ws.on('error', (err) => console.error(err)); // if there is an error
    ws.on('message', (data, isBinary) => { // when a message is received 
        wss.clients.forEach((client) => { // send the message to all clients
            if (client.readyState === WebSocket.OPEN) { // if the client is connected
                client.send(data, { binary: isBinary }); // send the message
            }
        });

        // console.log("Response: ", data);
        
    });

    console.log('Client connected ', userCount); // log the number of users connected
    ws.send('Hello! Message from the server!!'); // send a message to the client as soon as it connects  
})


server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080')
})
