<template>
    <div>
        <video-player :options="videoOptions" />
        {{ this.videoOptions.sources[0].src}}
    </div>
</template>

<script>

export default {
    data() {
        return {
            videoOptions: {
                autoplay: true,
                controls: true,
                sources: [
                    {
                        // 확장자 : m3u8 , 확장자에 따라 type 바뀐다.
                        src: "/api/video/streaming/CLASS101_save/main_1080p30.m3u8",
                        type: "application/x-mpegURL",
                    },
                ],
                width : 500,
                heigth : 300,
            },
        };
    },
    mounted() {
        
    },
    methods: {
        
    },
};
</script>