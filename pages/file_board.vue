<template>
    <div>
        <div class="table">
            테이블
        </div>
        <div v-for="(item, index) in excel_data" :key="index">
            <div>
                우편번호 : {{item.res_data.name}}
            </div>
            <div>
                주소 : {{item.res_data.content}}
            </div>
            <div>
                배송비 : {{item.res_data.test_id}}
            </div>
            <br/>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            excel_data: [],
        };
    },

    mounted() {
        this.get_excel_file();
    },

    methods: {
        async get_excel_file() {
            try {
                const res = await this.$axios.get('/user/get_file');
                console.log(res);
                this.excel_data = res.data;
                console.log(this.excel_data);
            } catch (e) {
                console.error(e);
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.table {
}
</style>
