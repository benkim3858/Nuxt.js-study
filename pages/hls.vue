<template>
    <div>
        <hls-player :videoSrc="hlsOptions.sources[0].src" />
        <MessageBox :currentUser="testUser"></MessageBox>
    </div>
</template>

<script>
import Hls from 'hls.js';
import Talk from 'talkjs';

export default {
    data() {
        return {
            hlsOptions: {
                sources: [
                    {
                        // 확장자 : m3u8 , 확장자에 따라 type 바뀐다.
                        // src: "/api/video/streaming/test2/main_1080p30.m3u8",
                        src: 'https://d36lhh60lqa56n.cloudfront.net/20220608_save/main_1080p30.m3u8',
                        // src : 'https://d36lhh60lqa56n.cloudfront.net/test/main_1080p30.m3u8',
                        type: 'application/x-mpegURL',
                    },
                ],
            },

            testUser: {
                id: "test",
                name: "test",
                email: "test@test.com",
            },
        };
    },

    mounted() {
        
    },
};
</script>

<style>
</style>