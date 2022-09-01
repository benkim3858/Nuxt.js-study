<template>
    <div>
        <div>
            <button @click="show_upload_modal = true">Excel Upload</button>
        </div>
        <br />
        <div>
            File name :
            {{ file_name }}
        </div>
        <br />
        <div>
            <button @click="file_upload">확인</button>
        </div>
        <FileUpload
            :show_modal="show_upload_modal"
            @close="show_upload_modal = false"
            @upload="get_file(f)"
        ></FileUpload>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show_upload_modal: false,
            file: null,
        };
    },

    computed: {
        file_name() {
            return this.$store.state.file.file.name;
        },
    },

    mounted() {},

    methods: {
        async file_upload() {
            try {
                this.file = this.$store.state.file.file;
                console.log(this.file);
                const form_data = new FormData();
                const axois_option = {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
                form_data.append('file', this.file);
                console.log(form_data);

                await this.$axios.post('/user/file_upload', form_data, {
                    axois_option,
                });
            } catch (e) {

            }
        },
    },
};
</script>

<style lang="scss" scoped>
</style>