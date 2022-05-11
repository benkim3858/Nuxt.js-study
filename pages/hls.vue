<template>
    <div>
        <hls-player :videoSrc='hlsOptions.sources[0].src' />
    </div>
</template>

<script>
import Hls from 'hls.js'

export default {
    data() {
        return {
            hlsOptions: {
                sources : [
                    {
                        // 확장자 : m3u8 , 확장자에 따라 type 바뀐다.
                        // src: "/api/video/streaming/test2/main_1080p30.m3u8",
                        src : 'https://d155rgiwvxmktz.cloudfront.net/test2_save/main_1080p30.m3u8',
                        type: "application/x-mpegURL",
                    },
                ],
            }
        }
    },
};
</script>

<style>
</style>