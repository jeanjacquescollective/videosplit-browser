export default class VideoPlayer {
    constructor(containerId) {
        this.videoContainer = document.getElementById(containerId);
        this.urlParams = new URLSearchParams(window.location.search);
        this.videoParam = this.urlParams.get("video");
        this.videos = {
            1: "./videos/sampleVideo.mp4",
            2: "./videos/sampleVideo.mp4",
            3: "./videos/sampleVideo.mp4",
            4: "./videos/sampleVideo.mp4",
            5: "./videos/sampleVideo.mp4",
            6: "./videos/sampleVideo.mp4",
            7: "./videos/sampleVideo.mp4",
            8: "./videos/sampleVideo.mp4",
            9: "./videos/sampleVideo.mp4",
        };
        this.init();
    }

    init() {
        if (this.videoParam && this.videos[this.videoParam]) {
            this.videoElement = document.querySelector("#video-player");
            this.videoElement.src = this.videos[this.videoParam];
            this.videoElement.controls = false;
            this.videoContainer.appendChild(this.videoElement);
        } else {
            this.videoContainer.innerHTML =
                "<p>No valid video parameter provided in the URL.</p>";
        }
    }

    async playVideo() {
        if (this.videoElement) {
            // const response = await fetch("/server-time");
            // const data = await response.json();
            // const serverTime = data.serverTime;
            // const videoStartTime = new Date(serverTime).getTime() / 1000;
            // const currentTime = new Date().getTime() / 1000;
            // const timeDifference = currentTime - videoStartTime;
            // this.videoElement.currentTime = timeDifference;
            this.videoElement.play();
        }
    }
}


