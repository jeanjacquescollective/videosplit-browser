export default class WebSocketClient {
    constructor(url, videoPlayer) {
        this.ws = new WebSocket(url);
        this.videoPlayer = videoPlayer;
        this.ws.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        this.ws.onmessage = (event) => {
            this.handleMessage(event);
        };

        this.ws.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };
    }

    handleMessage(event) {
        const command = JSON.parse(event.data);
        if (command.action === 'play') {
            this.videoPlayer.playVideo();
        } else if (command.action === 'pause') {
            this.videoPlayer.pauseVideo();
        } else if (command.action === 'seek') {
            this.videoPlayer.currentTime = command.time;
        }
    }
}

