<template>
    <div>
        <!-- HLS.JS -->
        <!-- <video ref="video" width="100%" height="640" controls></video> -->

        <!-- VIDEO.JS -->
        <video-player
            :options="videoOptions"
            class="vjs-big-play-button vjs-big-play-centered"
        />
        {{ this.videoOptions.sources[0].src }}
    </div>
</template>

<script>
import Hls from 'hls.js';

export default {
    data() {
        return {
            videoOptions: {
                autoplay: true,
                controls: true,
                sources: [
                    {
                        // 확장자 : m3u8 , 확장자에 따라 type 바뀐다.
                        src: 'https://d155rgiwvxmktz.cloudfront.net/test2_save/main_1080p30.m3u8',
                        type: 'application/x-mpegURL',
                    },
                ],
                width: 500,
                heigth: 300,
                playbackRates: [0.5, 1, 1.5, 2],
            },
        };
    },
    mounted() {
        // let hls = new Hls();
        // let stream = "/api/video/streaming/test2/main_1080p30.m3u8";
        // let video = this.$refs['video'];
        // hls.loadSource(stream);
        // hls.attachMedia(video);
        // hls.on(Hls.Events.MANIFEST_PARSED, function () {
        //     video.play();
        // });
    },
    methods: {},
};
</script>