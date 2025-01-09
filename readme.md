# Setup

## Server

### Install Node.js

Install Node.js on the server machine. You can download the installer from the [official website](https://nodejs.org/).

### Install Dependencies

Navigate to the server directory and install the required dependencies using npm:

```sh
cd server
npm install
```

### Start the WebSocket Server

Start the WebSocket server by running the following command:

```sh
node server.js
```

The server should now be running and listening for WebSocket connections on port 8080.

## Client

### Open the Video Player

Open the `index.html` file in a browser on each client machine. You can use a local server or simply open the file directly in the browser. Use the query parameter `video` to specify the video ID:

```html

http://localhost:8080/video.html?video=1
```

If x-amount of clients are connected, the video will start playing.



## Steps for Full Automation

### Ensure WebSocket Server Starts Automatically

Set up the WebSocket server to start automatically on boot or when the network is ready.

#### Linux Example (Systemd Service)

Create a systemd service for the WebSocket server:

```ini
[Unit]
Description=Video Sync WebSocket Server
After=network.target

[Service]
ExecStart=/usr/bin/node /path/to/server.js
Restart=always
User=yourusername
WorkingDirectory=/path/to

[Install]
WantedBy=multi-user.target
```

Save this file as `/etc/systemd/system/video-sync.service` and then enable it with:

```sh
sudo systemctl enable video-sync.service
sudo systemctl start video-sync.service
```

### Automatically Open Browser on Client Machines

Use startup scripts to open the browser with the correct video URL and ensure the client connects to the WebSocket server.

#### Startup Script Example (start_video.sh)

```sh
#!/bin/bash
VIDEO_ID=$1
BROWSER="firefox"  # Replace with your preferred browser

# Delay to ensure network is up
sleep 5

# Open the video URL in the browser
$BROWSER "http://your-local-server-ip/video.html?video=$VIDEO_ID" &
```

Place this script in each machine’s autostart routine.

#### For Linux (Autostart)

Add the script to `~/.bashrc`, or create a `.desktop` file in `~/.config/autostart/`.

##### Example .desktop File

```ini
[Desktop Entry]
Type=Application
Exec=/path/to/start_video.sh 1  # Change the number for each machine
Hidden=false
NoDisplay=false
X-GNOME-Autostart-enabled=true
Name[en_US]=Start Video Sync
Name=Start Video Sync
Comment[en_US]=Start video synchronization on boot
Comment=Start video synchronization on boot
```

### WebSocket Command on Connection

Modify the WebSocket server to automatically send a "play" command once all clients are connected.

#### WebSocket Server Code Snippet

```js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    // Check if all clients are connected (assuming you know the number)
    if (wss.clients.size === 9) {
        broadcastCommand({ action: 'play' });
    }

    ws.on('message', (message) => {
        console.log('Received:', message);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

function broadcastCommand(command) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(command));
        }
    });
}
```

### Optional: Synchronize Video Start Time

Add a delay to ensure all videos start at the exact same time by synchronizing the start command.

#### Server-Side Synchronization Example

```js
const startTime = Date.now() + 5000;  // Start after 5 seconds

broadcastCommand({ action: 'syncStart', startTime });

// On the client side, wait for the exact start time
ws.onmessage = (event) => {
    const command = JSON.parse(event.data);
    if (command.action === 'syncStart') {
        const delay = command.startTime - Date.now();
        setTimeout(() => {
            videoPlayer.play();
        }, delay);
    }
};
```

## Summary

- WebSocket Server starts automatically on the host machine.
- Client Machines automatically launch the browser with the correct video URL upon boot.
- WebSocket Commands ensure all clients receive and execute the same play/pause commands.
- Synchronization is achieved by broadcasting a timed "play" command, ensuring all videos start simultaneously.