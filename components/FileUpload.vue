<template>
    <div>
        <v-dialog v-model="show_modal" persistent max-width="350">
            <div class="file_upload_modal">
                <input
                    type="file"
                    ref="uploader"
                    style="display: none"
                    @change="file_upload($refs.uploader.files)"
                />
                <button class="x_btn mrl" @click="$emit('close')">X</button>

                <!-- <h1>첨부하실 파일을 <br />마우스로 끌어서 넣어주세요</h1> -->

                <div class="img_boxA"></div>

                <div
                    class="fileupbox"
                    style="white-space: break-spaces; overflow: scroll"
                    v-if="files.length > 0"
                >
                    {{ files[0] }}
                </div>

                <div class="btnBox">
                    <button class="mainBtn2" @click="on_click_upload()">
                        파일 선택
                    </button>
                    <button class="mainBtn1">업로드 하기</button>
                </div>
            </div>
        </v-dialog>
    </div>
</template>

<script>
export default {
    props: {
        show_modal: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            files: [],
        };
    },

    mounted() {},

    methods: {
        emit_method() {
            this.$emit('close');
        },
        on_click_upload() {
            this.$refs.uploader.click();
            console.log(this.$refs.uploader.files);
        },
        file_upload(file) {
            this.files.push(file);
            console.log(this.$refs.uploader.files);
            console.log(this.files[0].file);
        },
    },
};
</script>

<style lang="scss" scoped>
</style>