<template>
    <div>
        <div>
            <button @click="show_upload_modal = true">Excel Upload</button>
        </div>
        <FileUpload
            :show_modal="show_upload_modal"
            @close="show_upload_modal = false"
        ></FileUpload>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show_upload_modal: false,
        };
    },

    mounted() {},

    methods: {},
};
</script>

<style lang="scss" scoped>
</style>