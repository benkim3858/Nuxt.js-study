<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
            <v-card class="logo py-4 d-flex justify-center">
                <NuxtLogo />
            </v-card>
            <v-card>
                <v-card-title class="headline">
                    Welcome! This is Board practice!
                </v-card-title>
                <v-card-text v-for="(board, index) in board_list" :key="index">
                    {{ board.content }}
                    <v-btn fab small dark @click="delete_board(board.id, index)">
                        <v-icon>mdi-close-circle</v-icon>
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "BoardPage",
    data() {
        return {
            show1: false,
            board: {
                content: "",
            },
            board_list: [],
        };
    },

    mounted() {
        // this.test()
        // this.sign_up()
        this.get_board();
    },

    methods: {
        async get_board() {
            let user_id = this.$store.state.user_id;
            try {
                let res = await this.$axios.get(`/user/board/${user_id}`);
                console.log(res);
                this.board_list = res.data.result;
                //    this.board = res.res.data;
            } catch (e) {}
        },

        async delete_board(board_id, index) {
            console.log(board_id);
            
            try {
                await this.$axios.delete(`/user/board/${board_id}`);
                this.board_list.splice(index, 1);
            } catch (e) {
                
            }
            
        }
    },
};
</script>
