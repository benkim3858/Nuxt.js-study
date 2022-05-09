<template>
    <div>
        <video ref="videoPlayer" class="video-js"></video>
    </div>
</template>

<script>
import videojs from "video.js";

export default {
    name: "VideoPlayer",
    props: {
        options: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            player: null,
        };
    },
    mounted() {
        // 비디오 플레이어가 인증 정보 없이 클라우드 프론트로 바로 요청을 보내기 때문에 강제로 요청 주소를 바꿔주는 로직
        videojs.Vhs.xhr.beforeRequest = (options) => {
            console.log(options);
            if(!/localhost/g.test(options.uri) && !/^\//g.test(options.uri) ) {
                const uri = options.uri.split('/');
                console.log(uri);
                uri[0] = 'http:';
                uri[2] = 'localhost:3000/api/video/streaming';
                options.uri = uri.join('/');
            }

            if (!options.headers){
                options.headers = {}
            }
            return options;
        };

        this.player = videojs(this.$refs.videoPlayer, this.options, () => {
            this.player.log("onPlayerReady", this);
        });
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose();
        }
    },
};
</script>