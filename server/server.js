const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
let connectedPC = 0 ;
const numerOfPCs = 2;
wss.on('connection', (ws) => {
    console.log('Client connected');
    connectedPC+=1;
    console.log(connectedPC);

    if(connectedPC >= numberOfPCs){
        console.log(`All ${numberOfPCs} clients connected`);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({action: 'play'}));
            }
        }
    )
    }

    // Broadcast messages to all clients
    ws.on('message', (message) => {
        console.log('Received:', message);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        connectedPC-=1;
    });
});

console.log('WebSocket server started on ws://localhost:8080');
