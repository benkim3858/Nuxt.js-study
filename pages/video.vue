<template>
    <div>
        <video-player :options="videoOptions" class="vjs-big-play-button vjs-big-play-centered" />
        {{ this.videoOptions.sources[0].src}}
    </div>
</template>

<script>

export default {
    data() {
        return {
            videoOptions: {
                autoplay : true,
                controls : true,
                sources : [
                    {
                        // 확장자 : m3u8 , 확장자에 따라 type 바뀐다.
                        src: "/api/video/streaming/test2/main_1080p30.m3u8",
                        type: "application/x-mpegURL",
                    },
                ],
                width : 500,
                heigth : 300,
                playbackRates : [0.5, 1, 1.5, 2],
            },
        };
    },
    mounted() {
        
    },
    methods: {
        
    },
};
</script>