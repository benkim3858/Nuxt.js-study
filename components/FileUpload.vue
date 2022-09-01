<template>
    <div>
        <v-dialog v-model="show_modal" persistent max-width="350">
            <div class="file_upload_modal">
                <input
                    type="file"
                    ref="uploader"
                    style="display: none"
                    @change="file_upload($refs.uploader.files[0])"
                />
                <button class="x_btn mrl" @click="$emit('close')">X</button>

                <!-- <h1>첨부하실 파일을 <br />마우스로 끌어서 넣어주세요</h1> -->

                <div class="img_boxA"></div>

                <div class="btnBox">
                    <button class="mainBtn2" @click="on_click_upload()">
                        파일 선택
                    </button>
                </div>
            </div>
        </v-dialog>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
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

    mounted() {
        console.log(this.$store);
    },

    methods: {
        ...mapActions(['file/append_file']),

        on_click_upload() {
            this.$refs.uploader.click();
        },

        file_upload(file) {
            // this.$store.dispatch('file/append_file', file);
            this.$store.commit('file/upload', file);
            this.$emit('close');
        },
    },
};
</script>

<style lang="scss" scoped>
</style>