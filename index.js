"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importStar(require("ws")); // import WebSocket module
const http_1 = __importDefault(require("http")); // import http module --> whenever you're creating a websocket server, you need to create an http server first
//The first request the client makes is to the http server, and then the server upgrades the connection to a websocket connection
//So, the http server is the entry point for the websocket server
// browser --> http server --> websocket server --> browser
// you can do the same thing with express
const server = http_1.default.createServer((req, res) => {
    console.log(new Date() + ' Received request for ' + req.url);
    res.end('Hello World'); //res.end will send response to client
}); // create http server
const wss = new ws_1.WebSocketServer({ server }); // create WebSocket server
wss.on('connection', (ws) => {
    let userCount = wss.clients.size; // get the number of users connected
    ws.on('error', (err) => console.error(err)); // if there is an error
    ws.on('message', (data, isBinary) => {
        wss.clients.forEach((client) => {
            if (client.readyState === ws_1.default.OPEN) { // if the client is connected
                client.send(data, { binary: isBinary }); // send the message
            }
        });
        // console.log("Response: ", data);
    });
    console.log('Client connected ', userCount); // log the number of users connected
    ws.send('Hello! Message from the server!!'); // send a message to the client as soon as it connects  
});
server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
