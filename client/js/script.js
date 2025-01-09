import VideoPlayer from './VideoPlayer.js';
import WebSocketClient from './WebSocketClient.js';
let videoPlayer;
document.addEventListener("DOMContentLoaded", () => {
    document.body.click();
    videoPlayer = new VideoPlayer("video-container");
    const wsClient = new WebSocketClient('ws://localhost:8080', videoPlayer);
});
