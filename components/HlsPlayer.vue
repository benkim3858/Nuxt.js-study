<template>
    <div>
        <video
            ref="HlsPlayer"
            class="hls-js"
            width="1000px"
            controls
            autoplay
            muted
            playisline
        ></video>
    </div>
</template>

<script>
import Hls from "hls.js";

function convertToStreamingAPI(value) {
    if (!/localhost/g.test(value) && !/^\//g.test(value)) {
        const uri = value.split("/");
        uri[0] = "http:";
        uri[2] = "localhost:3000/api/video/streaming";
        value = uri.join("/");
    }
    return value;
}

// 확장자 세그먼트 파일 불러올때 씀
class fLoader extends Hls.DefaultConfig.loader {
    constructor(config) {
        super(config);
        var load = this.load.bind(this);
        this.load = function (context, config, callbacks) {
            if (context.type !== "manifest") {
                var onSuccess = callbacks.onSuccess;
                callbacks.onSuccess = function (response, stats, context) {
                    onSuccess(response, stats, context);
                };
                context.url = convertToStreamingAPI(context.url);
            }
            load(context, config, callbacks);
        };
    }
}

class pLoader extends Hls.DefaultConfig.loader {
	constructor(config) {
		super(config);
		const load = this.load.bind(this);
		this.load = function (context, config, callbacks) {
			if (context.type === 'manifest') {
				const onSuccess = callbacks.onSuccess;
				callbacks.onSuccess = function (response, stats, context) {
					onSuccess(response, stats, context);
				};
				context.url = convertToStreamingAPI(context.url);
			}
			load(context, config, callbacks);
		};
	}
}

export default {
    name: "HLS Player",
    props: {
        videoSrc: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            refVideo: null,
			hlsPlayer: null,
			showPlayer: false
        };
    },
    mounted() {
        this.refVideo = this.$refs['HlsPlayer'];
        this.load_video();
    },
    beforeDestroy() {
        // this.hls.off("hlsError", this.error_lisener);
        this.hlsPlayer && this.hlsPlayer.destroy();
    },
    methods: {
        error_lisener(event, data) {
            this.is_ready = false;
            this.hls.detachMedia(this.video);
        },
        load_video() {
            try {
                const $this = this;
                const playerOptions = {
                    enableWorker: true,
                    maxBufferLength: 2,
                    liveBackBufferLength: 0,
                    liveSyncDuration: 1,
                    liveMaxLatencyDuration: 3,
                    liveDurationInfinity: true,
                    highBufferWatchdogPeriod: 1,
                    lowLatencyMode: true,
                    // fLoader,
                    // pLoader,
                };
                const videoEventHandlers = {
                    // hls api 문서에 명시 되어있는 이벤트
                    ERROR : function() {
                        $this.showPlayer = false;
                        $this.hlsPlayer.destroy();
                    },
                    MANIFEST_PARSED : function() {
                        $this.showPlayer = true;
                    }
                };
                this.hlsPlayer = new Hls(playerOptions);

                for(let item in videoEventHandlers) {
                    this.hlsPlayer.on(Hls.Events[item], videoEventHandlers[item]);
                }

                if(Hls.isSupported() && this.videoSrc) {
                    this.hlsPlayer.loadSource(this.videoSrc);
                    this.hlsPlayer.attachMedia(this.refVideo);
                    this.showPlayer = true;
                } else {
                    throw new Error('Video Road Fail');
                }

                
            } catch (e) {
                console.log(e);
            }
        },
    },
};
</script>